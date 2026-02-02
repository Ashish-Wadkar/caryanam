/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
// import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FaCarAlt } from "react-icons/fa";
import {
  Button,
  Dialog,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
//import { useAddCarBrandsMutation } from "../../services/brandAPI";
//import { useGetOnlyBrandsQuery } from "../../services/brandAPI";
import {
  useAddColorMutation,
  useGetColorNameQuery,
} from "../../services/colorAPI";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router";

export function AddColorForm({ refetch }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [addColor] = useAddColorMutation();
  const { data } = useGetColorNameQuery();
  
  const colors = data?.list.map((car) => car.name);

  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    // model: "",
    // variant: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const carColor = {
      name: formData.name,
      // variant: formData.model,
      // subVariant: formData.variant,
    };

    try {
      const res = await addColor(carColor).unwrap();
      refetch();
      if (res?.status === "Color created successfully") {
        toast.success(res?.status);
      } else {
        // Handle unexpected status
        toast.error("An unexpected status was returned");
      }
    } catch (error) {
      //console.error('Failed to add the car color:', error);
      toast.error("Failed to add color");
    }

    setFormData({
      name: "",
      // model: "",
      // variant: "",
    });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} color="indigo" className="flex gap-2">
        <FaCarAlt strokeWidth={2} className="h-4 w-4" /> Add Color
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CardUi>
          {/* <ToastContainer/> */}
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Color
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col">
                {/* <Typography className="w-32 text-black font-medium">
                  Color Name :{" "}
                </Typography> */}
                <Input
                  label="Color Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="flex flex-col">
                <Typography className="w-32 text-black font-medium">Model Name :</Typography>
                <Input
                  label="Model Name"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <Typography className="w-32 text-black font-medium">Variant :</Typography>
                <Input
                  label="Variant"
                  name="variant"
                  value={formData.variant}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <Button color="indigo" type="submit">
                Add
              </Button>
            </form>
          </CardBody>
        </CardUi>
      </Dialog>
    </>
  );
}

export default AddColorForm;
