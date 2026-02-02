/* eslint-disable react/prop-types */
import {  Card, CardBody, Typography, CardHeader } from "@material-tailwind/react";
import { CarouselCustomArrows } from "../CarouselCustomArrows";
import { Link } from "react-router-dom";
import { useState } from "react";
import DriveEtaIcon from '@mui/icons-material/DriveEta'; 
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'; 
import TransmissionIcon from '@mui/icons-material/Settings'; 
import { FaArrowRight } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";

export function CardDefault2({ data }) {
  const [isHovered, setIsHovered] = useState(false);
 
  const carid = data?.carId;

  const combinedText = `${data.year} ${data.brand} ${data.model}`;
  const truncatedText = combinedText.length > 25 ? combinedText.substring(0, 22 ) + '...' : combinedText;

  
  return (
    <Card className=" max-w-[15rem] md:max-w-[15rem] lg:max-w-[20rem]   overflow-hidden hover:border hover:border-5 hover:shadow-2xl  hover:border-indigo-700 border">
      <CardHeader className="h-full mt-1">
        <Link to={`/carlist/cardetails/${carid}`}>
          <CarouselCustomArrows carId={data.carId} />
        </Link>
      </CardHeader>
      <CardBody className="mb-5">
        <Link to={`/carlist/cardetails/${data.carId}`}>
          {/* <Typography>{data.year}</Typography> */}
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered
              ? data.year + " " + data.brand + " " + data.model
              : truncatedText}
          </Typography>
          

          <p className=" sm:text-[0.400rem] md:text-[0.580rem] lg:text-[0.666rem] font-medium uppercase flex space-x-0 flex-wrap">
          {" "}
            {/* Use space-x-2 for horizontal spacing */}
            <span className="flex items-center p-[5px] rounded-sm text-black font-[sourceSans]">
              <DriveEtaIcon className="text-[0.9rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] transform scale-[0.6] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.9]" style={{ color: "#6EC207" }} />{" "}
              {/* KM Driven Icon */}
              {data.kmDriven} KM
            </span>
            <span className="flex items-center p-[5px] rounded-sm text-black font-[sourceSans]">
              <LocalGasStationIcon
                className="text-[0.9rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] transform scale-[0.6] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.9]"
                style={{ color: "#6EC207" }}
              />{" "}
              {/* Fuel Type Icon */}
              {data.fuelType}
            </span>
            <span className="flex items-center p-[5px] rounded-sm text-black font-[sourceSans]">
              <TransmissionIcon className="text-[0.9rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.8rem] transform scale-[0.6] sm:scale-[0.9] md:scale-[0.7] lg:scale-[0.9]" style={{ color: "#6EC207" }} />{" "}
              {/* Transmission Icon */}
              {data.transmission}
            </span>
          </p>

          <Typography
            variant="h6"
            className="mt-2 font-bold text-blue-gray-900 text-2xl font-[roboto]"
          >
            ₹ {data.price}
          </Typography>

  <Link to={`/carlist/cardetails/${data.carId}`}>
          {" "}
          <Typography  variant="h6"  className="mb-2 mt-2  text-sm md:text-base"  style={{ display: 'flex', alignItems: 'center', color: "green" }}>
            View Car Details  <FaArrowRight style={{ color: 'green', fontSize: '15px' }} />
          </Typography>
          </Link>

          {/* <Link to={`/carlist/cardetails/${data.carId}`}>
          {" "}
          <Button className="mt-2 mb-4 p-[8px] bg-indigo-500 rounded-lg text-white">View Car</Button>
        </Link> */}
          <hr />
          <div className="flex align-bottom items-baseline gap-3 ">
            <FaLocationDot  style={{ color: '#000' }} />
            <div className="  text-base text-gray-700 font-[sourceSans]">
             {data.area},{data.city}
            </div>
          </div>
          {/* <p className="text-sm  text-purple-500 font-[sourceSans]">
            Free Test Drive Today at {data.area}
          </p> */}
        </Link>
      </CardBody>
    </Card>
  );
}
