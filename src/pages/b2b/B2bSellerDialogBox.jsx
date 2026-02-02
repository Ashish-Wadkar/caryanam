/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import  { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Textarea,
} from "@material-tailwind/react";
import {useB2bAssingMesectionMutation} from "../../services/salesAPI"

export default function B2bSellerDialogBox({beadingCarId,buyerDealerId,sellerDealerId,salesPersonId,b2BId ,status ,refetch , tostifyMsg ,messageParam}) {
    const [open, setOpen] = useState(false);
    const [b2bAssingMesection] = useB2bAssingMesectionMutation();
    
    const handleOpen = () => setOpen(!open);
    const [message , setMessage] = useState(messageParam);

    const handleChange = (e) => {
      
      setMessage(e.target.value)
    }

   const handlesubmit = async() => {
   
    let assingData ;
    if(status == "pending"){
      assingData = {
        beadingCarId: beadingCarId,
        buyerDealerId: buyerDealerId,
        sellerDealerId: sellerDealerId,
        salesPersonId: Number(salesPersonId),
        requestStatus:"active",
        b2BId: b2BId
      }
    }else if(status === "active"){
      assingData = {
      message: message,
    }
  }

    try {
      const res = await b2bAssingMesection({assingData,b2BId});
      tostifyMsg(res?.data?.message)
      refetch();
    } catch (error) {
      tostifyMsg("error" , error);
    }
    setOpen(!open);
   }
    return (
      <>
        {/* <Button onClick={handleOpen} variant="gradient">
      Click Here
        </Button> */}
        <Button size="sm" color={status === "pending" ? "blue" : "green"} onClick={handleOpen}>{ status === "pending" ? "Accept Request" : "Comment" }</Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Modal</DialogHeader>
          <DialogBody>
          {status == "active" ? (
            <Textarea label="Comment" value={message} onChange={handleChange}></Textarea>
          ) : <div>Are you sure you want to accept request?</div>}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={()=>{ setOpen(!open)}}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handlesubmit}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
}
