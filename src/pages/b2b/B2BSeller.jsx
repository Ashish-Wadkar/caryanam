/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { motion } from "framer-motion"
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import {
  useGetUserRequestDataQuery,
} from "../../services/userAPI";
import TableComponent from "../../components/table/TableComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useB2bstatuCheckQuery, useGetB2BconfirmSalePersonQuery, useGetB2BSalesPersonIdQuery} from "../../services/salesAPI"
import B2bSellerDialogBox from './B2bSellerDialogBox';
import { useLazyBiddingCarByIdQuery, useLazyGetbeadingCarByIdQuery } from '../../services/biddingAPI';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import B2BsellerConfirmationModel from './B2BsellerConfirmationModel';
import { FiLoader } from "react-icons/fi";
import B2BBuyerSellerInfoModel from './B2BBuyer&SellerInfoModel';
import B2BCancelRequest from './B2BCancelRequest';
const emptyImage = "..\\..\\cars\\emptyfolder.png";


export default function B2BSeller() {
    const { status } = useParams();
    const token = Cookies.get("token");
    let jwtDecodes;
    if (token) {
      jwtDecodes = jwtDecode(token);
    }
    const salesPersonId = token ? jwtDecodes?.salesPersonId : null;
    const [filteredData, setFilteredData] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [carData , setCarData] = useState([]);
    const [loading ,setLoading] = useState(true);
    let queryHook;

    if(status === "pending") {
      queryHook = useB2bstatuCheckQuery({ status: "pending" });
    } else if(status === "active") {
      queryHook = useGetB2BSalesPersonIdQuery(salesPersonId);
    } else if(status === "sold") {
      queryHook = useGetB2BconfirmSalePersonQuery(salesPersonId);
    }
    
    const { data, isLoading, error , refetch} = queryHook || [];
    
      const [trigger, { error : carDeatilsError, data: carDetails }] = useLazyBiddingCarByIdQuery();

    const { data: userdata, isLoading: isUserDataLoading, error: userError } = useGetUserRequestDataQuery({
      page: pageNo,
      size: pageSize,
    });
  
    const navigate = useNavigate();
    if (error?.status === 401) {
      Cookies.remove("token");
      navigate("/signin");
    }
  
    useEffect(() => {
      setLoading(true)
      const fetchBeadingCarData = async () => {
        if (data ) {
          const carDataArray = []; 
          let list ;
            list = data?.list;
          for (let i = 0; i < list?.length; i++) {
            const carId = list[i]?.beadingCarId;
            if (carId) {
              const { data: fetchedCarData, error: carError } = await trigger(carId);
              
              if (carError) {
                continue;
              }
              const combinedData = {
                ...fetchedCarData,
                ...list[i],
              };
              carDataArray.push(combinedData); // Push into the renamed array
            }
          }
          setCarData(carDataArray); // Set the correct data
          setLoading(false);
        }
      };
      fetchBeadingCarData();
    }, [data, trigger ,status]);
    
    const tostifyMsg = (msg,status) => {
      status === "error" ? toast.error(msg) : toast.success(msg)
    }
    let tableData ;
    if(status === "pending" || status === "active" || status === "sold" ) {
      tableData = carData
    }         
    
    const columns = [
    {
      Header: "Sr. No",
      accessor: "serialNumber",
      Cell: (cell) => {
        const serialNumber = pageNo * pageSize + cell.row.index + 1;
        return serialNumber;
      },
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Variant",
      accessor: "variant",
    },
    {
      Header: "Fual type",
      accessor: "fuelType",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header : "Seller & Buyer Info",
      Cell : (cell) => {
        const beadingCarId = cell.row.original.beadingCarId;
        const buyerDealerId = cell.row.original.buyerDealerId;
        const sellerDealerId = cell.row.original.sellerDealerId;
        const b2BId = cell.row.original.b2BId;
        return(
          <>
          <B2BBuyerSellerInfoModel
              beadingCarId={beadingCarId} 
              buyerDealerId={buyerDealerId} 
              sellerDealerId={sellerDealerId} 
              salesPersonId={salesPersonId} 
          />
          </>
        )
      }
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   Cell: (cell) => {
    //     const Status = cell.row.values.status;
    //     return (
    //       <div>
    //         {Status === "pending" ? (
    //           <div className="relative cursor-pointer group">
    //             <motion.p
    //               whileHover={{ scale: 1.3, originX: 0.5 }}
    //               className="text-yellow-800 uppercase "
    //             >
    //               {Status}
    //             </motion.p>
    //             <div className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-yellow-800 transition-all duration-300 group-hover:w-[50%] group-hover:-translate-x-1/2"></div>
    //           </div>
    //         ) : (
    //           <div>
    //             <motion.p whileHover={{ scale: 1.3, originX: 0.5 }}>
    //               <p className="text-green-500 uppercase cursor-pointer group">
    //                 {Status}
    //               </p>
    //             </motion.p>
    //             <div className="absolute left-1/2 bottom-0 w-0 h-0.5 text-green-500 transition-all duration-300 group-hover:w-[50%] group-hover:-translate-x-1/2"></div>
    //           </div>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   Header: "Contact No",
    //   accessor: "mobileNo",
    // },
    // {
    //   Header: "Pincode",
    //   accessor: "pinCode",
    // },
    {
      Header: "Action",
      Cell: (cell) => {
        const beadingCarId = cell.row.original.beadingCarId;
        const buyerDealerId = cell.row.original.buyerDealerId;
        const sellerDealerId = cell.row.original.sellerDealerId;
        const b2BId = cell.row.original.b2BId;
        const message = cell.row.original.message;
        const requestStatus = cell.row.original.requestStatus;
        return (
          <div className="cursor-pointer flex gap-1 justify-center items-center">
          {status !== "sold" && (
            <>
              <B2bSellerDialogBox 
                beadingCarId={beadingCarId} 
                buyerDealerId={buyerDealerId} 
                sellerDealerId={sellerDealerId} 
                salesPersonId={salesPersonId} 
                b2BId={b2BId} 
                status={status}
                refetch={refetch} 
                tostifyMsg={tostifyMsg}
                messageParam={message}
              />
              {status === "active" && (
                <>
                <B2BsellerConfirmationModel b2BId={b2BId} refetch={refetch} tostifyMsg={tostifyMsg}  requestStatus={requestStatus} />
                <B2BCancelRequest beadingCarId={beadingCarId} 
                buyerDealerId={buyerDealerId} 
                sellerDealerId={sellerDealerId} 
                salesPersonId={salesPersonId} 
                b2BId={b2BId} 
                status={status}
                refetch={refetch} 
                tostifyMsg={tostifyMsg}
                messageParam={message} />
                </>
              )}
            </>
          )}
          <Link
                to={`/Seller/b2b/car/info/${beadingCarId}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  color="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </Link>
        </div>
        
        );
      },
    },
  
  ];


  return (
    <Card className="h-full w-full">

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <Typography variant="h5" color="blue-gray" className="text-center lg:text-start">
              User Request List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-center lg:text-start">
              See Information About All User Requests
            </Typography>
            <span className="mt-1 hidden xl:block">
              <div className="flex">
                <Link to="/"> <p className="hover:text-blue-900"> Home </p> </Link> / <p> User Request </p>
              </div>
            </span>
          </div>
        </div>
      </CardHeader>
      <div className="flex justify-center space-x-4">
      <Card className="w-96">
      <Link to="/Seller/b2b/pending">
        <CardBody>
            <Typography variant="h5" color={status === "pending" ? 'green' : 'blue-gray'} className="mb-2">
              Pending Request
            </Typography>
        </CardBody>
        </Link>
      </Card>
      <Card className="w-96">
        <Link to="/Seller/b2b/active" >
        <CardBody>
            <Typography variant="h5" color={status === "active" ? 'green' : 'blue-gray'} className="mb-2">
              Assigned  Request
            </Typography>
        </CardBody>
        </Link>
      </Card>
      <Card className="w-96">
        <Link to="/Seller/b2b/sold" >
        <CardBody>
            <Typography variant="h5" color={status === "sold" ? 'green' : 'blue-gray'} className="mb-2">
             Sold Car
            </Typography>
        </CardBody>
        </Link>
      </Card>
    </div>
    {
  error ? (
    <div>
      <div className="flex justify-center mt-14">
        <img className="w-40" src={emptyImage} alt="no data" />
      </div>
      <p className="flex justify-center text-2xl md:text-3xl font-semibold">
        No Data Available
      </p>
    </div>
  ) : loading ? (
    <div className="w-screen h-screen flex justify-center mt-5">
      <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
    </div>
  ) : (
    <>
      <CardBody className="md:overflow-auto overflow-scroll px-1">
        <TableComponent columns={columns} data={tableData || []} />
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          Page {pageNo + 1}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" disabled={pageNo <= 0}>
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={userdata?.list?.length < pageSize}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  )
}

      
      <ToastContainer />
    </Card>
  );
}
