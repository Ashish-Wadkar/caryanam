/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import B2Bimage from './B2Bimage';


export default function B2BCard({item}) {
  const beadingCarId = item.beadingCarId
    console.log("item",item)
  return (
    <div>
        <Link to={`/biddinglist/cardetails/${item.beadingCarId}/success`}>
         <Card className="mt-10 ml-5 max-w-[19rem]  mb-5 border border-blue-400 shadow-md shadow-black">
          <CardHeader color="" className="h-full">
            <B2Bimage  beadingCarId={beadingCarId}/>
          </CardHeader>
          <CardBody className='mt-5 '>
          <Typography>{item.year}</Typography>
            <Typography variant="h5" color="blue-gray" className="">
             {item.brand} 
            </Typography>
            <Typography variant="" color="blue-gray" className="">
              {item.variant}
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {item.title}
            </Typography>
            <p className="text-sm uppercase mb-3 flex-wrap gap-2">
              <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black text-xs">
                {item.kmDriven}KM
              </span>
              <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black text-xs">
                {item.fuelType}
              </span>
              <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black text-xs">
                {item.transmission}
              </span>
            </p>
            <Typography variant="h6" className="font-bold text-black text-xl">
              ₹ {item.price}
            </Typography>
          </CardBody>
        </Card>
        </Link>
    </div>
  )
}
