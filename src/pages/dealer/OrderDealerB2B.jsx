/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useCancelStatusSetMutation,
  useGetAllDealerCompleteBookingQuery,
  useGetAllB2BCompleteBookingQuery,
  useGetAllPendingB2BRequestQuery,
} from "../../services/dealerAPI";
import CardUi from "../../ui/CardUi";
import emptyfolder from "/cars/emptyfolder.png";

import {
  Button,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  useGetbeadingCarById1Query,
  useLazyBiddingCarByIdQuery,
} from "../../services/biddingAPI";
import B2Bimage from "../b2b/B2Bimage";

const OrderDealerB2B = () => {
  const [pageNo, setPageNo] = useState(0);
  const [revertId, setRevertId] = useState("");

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const id = jwtDecodes?.dealerId;
  // console.log(id);

  const { data, isLoading, error, refetch } = useGetAllB2BCompleteBookingQuery({
    id,
  });
  // console.log(data);

  // const carId = data?.list?.[0]?.[0]?.beadingCarId;
  // console.log("carId:", carId);

  // const {
  //   data: data1,
  //   isLoading: isLoadingCar,
  //   isError: isErrorCar,
  // } = useGetbeadingCarById1Query(carId);
  // console.log(data1);
const [biddingdata, setbiddingdata] = useState([]);

  let [trigger] = useLazyBiddingCarByIdQuery();

  useEffect(() => {
    const fetchServiceProducts = async () => {
      if (data) {
        const liveCarsData = [];
        console.log(data.list.length);
        for (let i = 0; i < data?.list?.length; i++) {
          const carId = data.list[i]?.beadingCarId;
          console.log(carId);
          if (carId) {
            const { data: carData, error: carError } = await trigger(carId);
            if (carError) {
              console.error("Error fetching car data:", carError);
              continue;
            }

            const combinedData = {
              ...carData,
              // ...dealerName,
            };

            liveCarsData.push(combinedData);
          }
        }

        setbiddingdata(liveCarsData);
        
        // setLoading(true);
      } else {
        // setLoading(true);
      }
    };

    fetchServiceProducts();
  }, [data, trigger]);

  // useEffect(() => {
  //   if (isLoadingCar) {
  //     console.log("Fetching car data...");
  //   } else if (isErrorCar) {
  //     console.log("Error fetching car data");
  //   } else if (data1) {
  //     console.log("Fetched car data: ", data1);
  //   }
  // }, [data1, isLoadingCar, isErrorCar]);
console.log(biddingdata)
  const car = [];

  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        console.log("You are on the last page.");
      } else {
        return prePageNo + 1;
      }
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = (revertID) => {
    setOpen(!open);
    setRevertId(revertID);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }
  if (!data) {
    return (
      <div>
        <div className="flex justify-center">
          <img className="w-40" src={emptyfolder} alt="no data" />
        </div>
        <p className="flex justify-center text-2xl md:text-3xl font-semibold">
          No Data Available
        </p>
      </div>
    );
  }

  const renderData = biddingdata?.map((item, index) => {
    const carId = item.beadingCarId;
    
    return (
      <div className="md:mx-10 mx-5 mt-3 mb-3" key={index}>
        <CardUi>
          <div className="p-2 md:w-full md:px-5 md:py-3 md:flex md:gap-8">
            <div className="md:w-1/3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <Link to={`/biddinglist/cardetails/${carId}/success`}>
                  <B2Bimage beadingCarId={carId} />
                </Link>
              </CardHeader>
            </div>
            <div>
              <p className="mt-4 mb-2 text-lg">
                <span className="font-[sourceSans] text-black font-bold">
                  Car Name:
                </span>
                <span className="font-[sourceSans]">
                  {" "}
                  {item?.brand} {item?.model}
                </span>
              </p>
              <p className="mt-4 mb-2 text-lg">
                <span className="font-[sourceSans] text-black font-bold">
                  Varient:
                </span>
                <span className="font-[sourceSans]"> {item?.variant}</span>
              </p>
              <p className="mt-4 md:mt-0 text-lg">
                <span className="font-[sourceSans] text-black font-bold">Date:</span>{" "}
                <span className="font-[sourceSans]"> {item?.date}</span>
              </p>
              <p className="mt-2 text-lg">
                <span className="font-[sourceSans] text-black font-bold">
                  Price:{" "}
                </span>
                <span className="font-[sourceSans]">{item?.price}</span>
              </p>

              <div className="flex gap-2 align-middle items-center">
                <Link to={`/biddinglist/cardetails/${carId}/success`}>
                  <Button
                    fullWidth
                    className="flex items-center text-xs mt-5 bg-blue-400 w-full"
                  >
                    Car details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
                {/* {item?.status === "cancel" ? (
                  <Button className="flex items-center text-xs gap-2 mt-5 bg-red-300">
                    Canceled Booking
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="flex items-center text-xs gap-2 mt-5 bg-red-700"
                    onClick={() => handleOpen(item?.id)}
                  >
                    Cancel Booking
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        </CardUi>
      </div>
    );
  });

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-y-4 lg:grid lg:grid-cols-2 lg:gap-y-4">
        {renderData}
      </div>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          Page {pageNo + 1}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={pageNo <= 0}
            onClick={() => setPageNo((a) => a - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={nextHandler}
            disabled={data?.bookings?.length < 10}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default OrderDealerB2B;
