/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import CardUi from "../../ui/CardUi";
import { jwtDecode } from "jwt-decode";
import { Button, Chip } from "@material-tailwind/react";
import { IoHome } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import BiddingDailogeBox from "../../ui/BiddingDialogeBox"
import PlaceBid from "../../pages/dealer/PlaceBid";
import {useGetbeadingGetByIdQuery} from "../../services/biddingAPI"
import { Link, useParams } from "react-router-dom";
import { useWebSocket } from "../../Utiles/WebSocketConnection";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
// import DialogBox from "../../ui/DialogBox";
import ShowIntrestDailog from "./ShowIntrestDailog";
dayjs.extend(duration);

const BiddingPriceCard = ({
  beadingCarId,
  bidCarId,
  handleMessage,
  closeTime,
  refeachData,
  biddingTimerStatus,
  price
}) => {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const userRole = jwtDecodes?.authorities[0];
  const UserId = token ? jwtDecodes?.userId : null;
  const {page , timerId ,status} = useParams()
  const {data} = useGetbeadingGetByIdQuery(beadingCarId);
  const { isConnected, topThreeBidsAmount } = useWebSocket();
  const [timeLeft, setTimeLeft] = useState('');
  const { client ,getLiveCars} = useWebSocket();
  const [highestBid , setHighestBid] = useState(0);
  


  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs();
      const closingTime = dayjs(closeTime);

      if (closingTime.isBefore(now)) {
          setTimeLeft('00:00:00');
          return;
      }

      const diff = closingTime.diff(now);
      const remainingDuration = dayjs.duration(diff);

      // const hours = String(remainingDuration.hours()).padStart(2, '0');
      const minutes = String(remainingDuration.minutes()).padStart(2, '0');
      const seconds = String(remainingDuration.seconds()).padStart(2, '0');

      setTimeLeft(`${minutes} m:${seconds} s`);
  };

  updateTimer(); // Update the timer immediately
  const timerId = setInterval(updateTimer, 1000);

  return () => clearInterval(timerId);
  },[closeTime]);
  
  useEffect(() => {
    const remainingMinutes = parseInt(timeLeft.split('m:')[0]);

    if (remainingMinutes < 2) {
      const intervalId = setInterval(refeachData, 1000); // Call refeachData every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on cleanup
    }
  }, [timeLeft]);

  useEffect(() => {
    if(bidCarId && isConnected){
      getTopThreeBids(bidCarId);
    }
},[bidCarId,isConnected])



const getTopThreeBids = (bidCarId) => {
  if (client) {
    const bidRequest = {
      bidCarId: bidCarId,
    };

    client.publish({
      destination: '/app/topThreeBids',
      body: JSON.stringify(bidRequest),
    });

       client.subscribe(`/topic/topThreeBids`, (message) => {
         const topBids = JSON.parse(message.body);
        setHighestBid(topBids[0]?.amount);
      }, { ack: 'client' });
  } else {
    // console.log('Stomp client is not initialized.');
  }
};


  const remainingMinutes = parseInt(timeLeft.split('m:')[0]);

    // Determine the color based on the time left
    const textColorClass = remainingMinutes < 2 ? 'text-red-600' : 'text-green-800';
    const text = remainingMinutes < 2 ? 'Last Call' :'Timer' ;
 
  return (
    <div className="w-full px-4 md:px-0 md:mt-4">
    <CardUi>
      <div className="w-full md:w-full p-4">
        <p className="font-extrabold text-2xl text-black uppercase font-[sourceSans] ml-2 md:ml-0">
          {data?.year} {data?.brand} {data?.model}
        </p>
        <p className="uppercase font-[Merriweather] ml-2 md:ml-0">
          {data?.color} {data?.bodyType} & {data?.transmission}
        </p>
        <div className="my-4 flex gap-2 flex-wrap ml-2">
          <Chip
            variant="outlined"
            value={`${data?.kmDriven} KM`}
            className="text-sm text-black font-[sourceSans]"
          />
          <Chip
            variant="outlined"
            value={`${
              data?.ownerSerial === 1
                ? "1ST"
                : data?.ownerSerial === 2
                ? "2ND"
                : data?.ownerSerial === 3
                ? "3RD"
                : data?.ownerSerial === 4
                ? "4TH"
                : data?.ownerSerial === 5
                ? "5TH"
                : ""
            } Owner`}
            className="text-base text-black font-[sourceSans]"
          />
          <Chip
            variant="outlined"
            value={`${data?.fuelType}`}
            className="text-base text-black font-[sourceSans]"
          />
          <Chip
            variant="outlined"
            value={`${data?.registration}`}
            className="text-base text-black font-[sourceSans]"
          />
        </div>
        <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <IoHome style={{ color: '#6EC207' }} />
          <div className="mt-4 text-base font-[sourceSans]">
            Home Test Drive Available
          </div>
        </div>
        <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <FaLocationDot style={{ color: '#6EC207' }} />
          <div className="mt-4 text-base text-gray-700 font-[sourceSans]">
            Parked at: {data?.area}, {data?.city}
          </div>
        </div>
        <Link to={userRole === "SALESPERSON" ? `/sale/inspection/report/${data?.beadingCarId}` : userRole ==="ADMIN" ? `/admin/inspection/report/${data?.beadingCarId}` : `/dealer/finalreport/${data?.beadingCarId}`}>
            <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0 mb-5">
              <FaFileAlt style={{ color: '#6EC207' }}  />
              <div className="mt-4 text-base text-gray-700 font-[sourceSans]">
                View Inspection Report
              </div>
            </div>
        </Link>
        {/* <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0">
          <IoLogoWhatsapp />
          <div className="mt-4 mb-6 text-base text-gray-700 font-[sourceSans]">
            Get Service History Report
          </div>
        </div> */}
        <hr className="border-gray-400" />
        <div className="flex justify-center align-middle items-center my-3">
          <div className="text-center">
            <div className="text-xl font-bold text-black font-[sourceSans]">
             Amount: {highestBid || null}  ₹
            </div>
            <div className="uppercase text-xs font-[sourceSans]  text-deep-purple-500">
              Fixed Road Price
            </div>
            {userRole === "DEALER" && timerId !== "success" ? (
              <div>
              <div className="fixed bottom-16 left-4 right-4 z-50 bg-white p-2 md:hidden">
               <div className={`text-xl uppercase font-bold font-[sourceSans] ${textColorClass}`}>
               {timeLeft}
             </div>
             </div>
             <div className={`text-xl uppercase font-bold font-[sourceSans] hidden md:block ${textColorClass}`}>
               {timeLeft}
             </div>
             </div>
            ) : null}
           
          </div>
        </div>
        {status != "info" ? (
          <div className="flex justify-center items-center align-middle mb-3">
          {((userRole === "SALESPERSON" || userRole === "ADMIN") && biddingTimerStatus !== "CLOSED"  ) ? (
            <div>
              <div className="flex">
                <div>
                  {/* <BiddingSetTime
                    userid={UserId}
                    biddingcarid={data?.beadingCarId}
                  /> */}
                </div>
                <div className="ml-5">
                  <BiddingDailogeBox
                    userid={UserId}
                    biddingcarid={data?.beadingCarId}
                    handleMessage={handleMessage}
                    timerId={timerId}
                    biddingTimerStatus={biddingTimerStatus}
                  />
                </div>
                <div className="ml-5">
                  {/* <PlaceBid /> */}
                </div>
              </div>
            </div>
          ) :
          (userRole === "DEALER" && page !== "winnigPage" && timerId !== "success") ?
          
          (<div>
          <div className="flex ">
            {/* <div>
              <BiddingSetTime
                userid={UserID}
                biddingcarid={data?.beadingCarId}
              />
            </div> */}
            {/* <div className="ml-5">
              <BiddingDailogeBox
                userid={UserID}
                biddingcarid={data?.beadingCarId}
              />
            </div> */}
            <div className="ml-5">
              <PlaceBid beadingCarId={beadingCarId} UserID={UserId} 
              bidCarId={bidCarId}
              biddingAmount={topThreeBidsAmount[0]?.amount || 0}
              refeachData={refeachData}
              // getTopThreeBids={getTopThreeBids} 
              // topThreeBids={topThreeBids}
              handleMessage={handleMessage}
              highestBid={highestBid}
              //  placeBid={placeBid}
                />
            </div>
          </div>
        </div>) : null}

        {userRole === "DEALER" ? (<div className="cursor-pointer">
          <ShowIntrestDailog/>
        </div>):null}
        </div>
        ) : null}
          
      </div>
    </CardUi>
    </div>
  );
};

export default BiddingPriceCard;
