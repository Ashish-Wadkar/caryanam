/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import TableComponent from "../../components/table/TableComponent";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link} from "react-router-dom";
import EditColorForm  from "../adminpages/EditColorForm";
import {AddColorForm} from "./AddColorForm";
import { useDeleteColorMutation, useGetAllColorQuery } from "../../services/colorAPI";
import { ToastContainer } from "react-toastify";

const AddColor = () => {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const { data, refetch, error } = useGetAllColorQuery({ pageNo,pageSize });
  const [deleteColor] = useDeleteColorMutation();
  const [colorList, setColorList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);

  useEffect(() => {
    if (data) {
      fetchNextColors();
    }
  }, [data]);
  const fetchNextColors = () => {
    const itemsPerPage = 10;
    const startIdx = (pageNo - 1) * itemsPerPage;
    const nextColors =  data?.list?.slice(startIdx, startIdx + itemsPerPage);
    setColorList(nextColors);
  };
 

  const handleOpen = (colorId) => {
    setSelectedColorId(colorId);
    setOpen(!open);
  };

  const deleteCar = async () => {
    try {
      await deleteColor(selectedColorId).unwrap();
      const updatedColorList = colorList.filter(
        (car) => car.colorId !== selectedColorId
      );
      setColorList(updatedColorList);
      refetch();
      setOpen(false);
    } catch (error) {
      // console.error("Failed to delete the car brand:", error);
    }
  };
  const nextHandler = () => {
    if (!error) {
      // setPageNo((prevPageNo) => prevPageNo + 1);
      setPageNo((prevPageNo) => {
        const newPageNo = prevPageNo + 1;
        fetchNextColors(newPageNo); // Fetch next set of 10 colors
        return newPageNo;
      });
    }
  };

  const prevHandler = () => {
    if (pageNo > 0) {
      setPageNo((prevPageNo) => {
        const newPageNo = prevPageNo - 1;
        fetchNextColors(newPageNo); // Fetch next set of 10 colors
        return newPageNo;
      });
    }
  };

  const columns = [
     {
      Header: "Sr. No",
      accessor: "serialNumber",
      Cell: (cell) => {
        const { pageSize } = cell.state; // Assuming you're using React Table's useTable hook
        const serialNumber = (pageNo - 1) * pageSize + cell.row.index + 1;
        return serialNumber;
      },
    },
    {
      Header: "ID",
      accessor: "colorId",
    },
    {
      Header: "Color Name",
      accessor: "name",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => {
        const colors = cell.row.original;
        return (
          <div className="flex gap-2 justify-center items-center">
            <EditColorForm
              initialData={colors}
              colorId={cell.row.values.colorId}
              refetch={refetch}
            />
            {/* <Button
              color="red"
              onClick={() => handleOpen(cell.row.values.colorId)}
            >
              Delete
            </Button> */}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card className="h-full w-full">
      <ToastContainer />
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Colors List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See Information About All Colors
              </Typography>
              <Typography className="hidden xl:block ">
        <div className="flex">
      <Link to={"/"}>
              <p className="hover:text-blue-900"> Home </p> 
              </Link>
               /
              <p>Add Color</p>
              
              </div>
      </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <AddColorForm refetch={refetch} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="md:overflow-auto overflow-scroll px-1">
          <TableComponent columns={columns} data={colorList} className="" />
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="medium"
            color="blue-gray"
            className="font-normal"
          >
            Page {pageNo + 1}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={pageNo <= 0}
              onClick={prevHandler}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={nextHandler}
              disabled={data?.list?.length < pageSize}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex justify-center">
          <p className="font-semibold text-xl">
            Are you sure you want to delete?
          </p>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={deleteCar}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddColor;
