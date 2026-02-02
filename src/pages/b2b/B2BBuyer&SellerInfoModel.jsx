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
  Typography,
} from "@material-tailwind/react";
import {useB2bAssingMesectionMutation} from "../../services/salesAPI"
import { useGetDealerQuery } from "../../services/dealerAPI";

export default function B2BBuyerSellerInfoModel({beadingCarId,buyerDealerId,sellerDealerId,salesPersonId,b2BId ,status ,refetch , tostifyMsg ,messageParam}) {
    const [open, setOpen] = useState(false);
    const [b2bAssingMesection] = useB2bAssingMesectionMutation();
    const {data : buyerData ,error : buyerError ,isLoading : buyerIsLoading} = useGetDealerQuery({id :buyerDealerId});
    const {data : sellerData ,error : sellerError ,isLoading : sellerIsLoading} = useGetDealerQuery({id : sellerDealerId});
    console.log(buyerData)
    
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
        <Button size="sm" color="gray" onClick={handleOpen}>Info</Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader >Seller Information</DialogHeader>
          <DialogBody >
            <Typography variant="h6" color="blue-gray">
                Name: <span style={{ fontWeight: 'normal', color: 'inherit' }}>
                {sellerData?.dealerDto?.firstName} {sellerData?.dealerDto?.lastName}
                </span>
            </Typography>
            <Typography variant="h6" color="blue-gray">
                Mobile Number: <span style={{ fontWeight: 'normal', color: 'inherit' }}>
                {sellerData?.dealerDto?.mobileNo}
                </span>
            </Typography>
            <Typography variant="h6" color="blue-gray">
                Email: <span style={{ fontWeight: 'normal', color: 'inherit' }}>
                {sellerData?.dealerDto?.email}
                </span>
            </Typography>
            </DialogBody>


          <DialogHeader >Buyer Information</DialogHeader>
          <DialogBody>
            <Typography variant="h6" color="blue-gray">
                Name: <span style={{ fontWeight: 'normal', color: 'inherit' }}>
                {buyerData?.dealerDto?.firstName} {buyerData?.dealerDto?.lastName}
                </span>
            </Typography>
            <Typography variant="h6" color="blue-gray">
                Mobile Number: <span style={{ fontWeight: 'normal', color: 'inherit' }}>
                {buyerData?.dealerDto?.mobileNo}
                </span>
            </Typography>
            <Typography variant="h6" color="blue-gray">
                Email: <span style={{ fontWeight: 'normal', color: 'inherit' }}>
                {buyerData?.dealerDto?.email}
                </span>
            </Typography>
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
          </DialogFooter>
        </Dialog>
      </>
    );
}
