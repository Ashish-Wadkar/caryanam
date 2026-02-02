/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Inputs from "../../forms/Inputs"; // Assuming this is a custom input component
//import { useEditBrandDataMutation } from "../../services/brandAPI";
import { useEditColorDataMutation } from "../../services/colorAPI";

const EditColorForm = ({ initialData, colorId ,refetch }) => {
  const [open, setOpen] = useState(false);
  const [inputField, setInputField] = useState(
    initialData || { name: "", }
  );
  const [editColorData] = useEditColorDataMutation();
  
  useEffect(() => {
    if (initialData) {
      setInputField(initialData);
    }
  }, [initialData]);

  const handleOpen = () => setOpen(!open);

  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputField);

    try {
      const res = await editColorData({
        id: colorId,
        inputField: inputField,
      }).unwrap();
      refetch();
    } catch (error) {
      // console.log(error);
    }
    handleOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} color="green">
        Edit
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Color Details</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Inputs
            label="color"
            onChange={onChangeFormhandler}
            value={inputField.name}
            name="name"
            type="text"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EditColorForm;
