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

export default function B2BCancelRequest({beadingCarId,buyerDealerId,sellerDealerId,salesPersonId,b2BId ,status ,refetch , tostifyMsg ,messageParam}) {
    const [open, setOpen] = useState(false);
    const [b2bAssingMesection] = useB2bAssingMesectionMutation();
    
    const handleOpen = () => setOpen(!open);
    const [message , setMessage] = useState(messageParam);

    const handleChange = (e) => {
      
      setMessage(e.target.value)
    }

   const handlesubmit = async() => {
   
    let assingData ;
   
      assingData = {
        beadingCarId: beadingCarId,
        buyerDealerId: buyerDealerId,
        sellerDealerId: sellerDealerId,
        salesPersonId: Number(salesPersonId),
        requestStatus:"Cancel",
        b2BId: b2BId
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
        <Button size="sm" color="red" onClick={handleOpen}>Cancel</Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Modal</DialogHeader>
          <DialogBody>
            <>
            <div>Are you sure you want to cancel request?</div>
            <br/>
            <Textarea label="Comment" value={message} onChange={handleChange}></Textarea>
            </>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={()=>{ setOpen(!open)}}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
            <Button variant="gradient" color="red" onClick={handlesubmit}>
              <span>Cancel Request</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
}
