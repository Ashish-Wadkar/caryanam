/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Chip,
  CardHeader,
} from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { Link, useParams } from "react-router-dom";
import { useConfirmBookingMutation } from "../../services/carAPI";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";
import { useGetbeadingCarByIdQuery } from "../../services/biddingAPI";
import B2Bimage from "../../pages/b2b/B2Bimage";

const DealerCarPendingB2B = ({ beadingCarId, status }) => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const navigate = useNavigate();

  const { data, error, isLoading, isFetching } =
    useGetbeadingCarByIdQuery(beadingCarId);
  console.log(beadingCarId);
  console.log(status);
  const car = data;
  console.log(data);

  return (
    <div className="w-full flex justify-center">
      <ToastContainer />
      <form>
        <div className="shadow-xl rounded-lg">
          <CardUi>
            <div className="md:p-3 md:min-w-[38rem] md:w-[20rem] md:my-2 md:flex md:gap-2">
              <div className="md:w-1/2">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <Link to={`/biddinglist/cardetails/${beadingCarId}/success`}>
                    <B2Bimage beadingCarId={beadingCarId} />
                  </Link>
                </CardHeader>
              </div>
              <div className="w-full">
                <div className="flex justify-between m-3 md:m-0 p-2">
                  <Chip
                    variant="outlined"
                    value={`${car?.date}`}
                    className="rounded-full font-[sourceSans] text-sm"
                  />
                  <Chip
                    color="amber"
                    value={`${status}`}
                    className="font-[sourceSans] text-sm"
                  />
                </div>
                <div className="w-full flex flex-col justify-center">
                  <div className="pl-4 mt-2 flex flex-col justify-center">
                    <div>
                      {/* <div className="text-lg mt-1 font-[sourceSans] font-medium text-black">
                        <span className="font-bold font-[sourceSans]">
                          Car Price:
                        </span>{" "}
                        ₹{car?.price}
                      </div> */}
                      <p className="mt-4 mb-2 text-lg">
                        <span className="font-[sourceSans] text-black font-bold">
                          Car Name:
                        </span>
                        <span className="font-[sourceSans]">
                          {" "}
                          {car?.brand} {car?.model}
                        </span>
                      </p>
                      <p className="mt-4 mb-2 text-lg">
                        <span className="font-[sourceSans] text-black font-bold">
                          Varient:
                        </span>
                        <span className="font-[sourceSans]"> {car?.variant}</span>
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-2 p-2 md:p-0 md:pt-2 ">
                        <div>
                          <Link
                            to={`/biddinglist/cardetails/${beadingCarId}/success`}
                          >
                            <Button
                              color="blue"
                              className="flex items-center text-xs font-[sourceSans]"
                            >
                              <span>Car Details</span>
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
                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                              </svg>
                            </Button>
                          </Link>
                        </div>
                        {/* <div>
                          <Button
                            color="green"
                            className="flex items-center font-[sourceSans]"
                            onClick={handleOpen}
                          >
                            <span>Confirm Request</span>
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
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </Button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardUi>
        </div>
      </form>
    </div>
  );
};

export default DealerCarPendingB2B;
