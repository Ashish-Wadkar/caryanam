// // import { useState } from "react";
// // import Inputs from "../../forms/Inputs";
// import carGroup from "/cars/car7.jpg";
// // import Mask2 from "/cars/Mask2.png";
// import Mask from "/cars/bmw1.jpg";
// // import Mask_group1 from "/cars/Mask_group1.png";
// // import Mask_group2 from "/cars/Mask_group2.png";
// import audi1 from "/cars/audi2.jpg";
// // import audi2 from "/cars/audi2.jpg";

// // import { Button } from "@material-tailwind/react";
// import { Carousel, Typography } from "@material-tailwind/react";
// // import { useNavigate } from "react-router";
// import { Link } from 'react-router-dom';
// // import { ArrowForward } from 'react-icons/md'; // Adjust the import path based on your icon library
// import { FaArrowRight } from 'react-icons/fa';


// const HeroSection = () => {
//   // const [locationState, setLocation] = useState("");
//   // const navigate = useNavigate();
//   // const [carBrandState, setCarBrand] = useState("");
//   // const submitHandler = (e) => {
//   //   e.target.value;
//   //   navigate("/carlist");
//   //   // console.log(locationState, carBrandState);
//   // };
//   return (
//     <Carousel className=" overflow-hidden" autoplay autoplayDelay={5000} loop>
//       <div className="relative lg:h-[42rem] ">
//         <img
//           src={carGroup}
//           alt="Image 1"
//           className="object-cover w-full md:h-full h-[200px] lg:mt-0 md:mt-5 mt-10"
//         />
//         <div className="absolute grid inset-0 bg-black/30">
//           <div className="mt-2 md:mt-4 xl:mt-8 ml-10">
//             <div className="text-white  text-md md:text-xl lg:text-4xl mb-2  font-bold  rounded xl:mt-[70px] lg:mt-[80px] mt-4 md:mt-[30px]">
//               <p className="flex mb-1 justify-center text-white  items-center md:justify-start font-[sourceSans] font-semibold text-2xl md:mt-1 md:text-4xl lg:text-4xl opacity-0 animate-slidein [--slidein-delay:300ms]">
//                 Welcomes to caryanamindia
//               </p>
//               <p className="flex justify-center mb-1 text-white  items-center md:justify-start text-xl md:mb-3 md:text-2xl lg:text-2xl font-[sourceSans] animate-slidein [--slidein-delay:600ms] opacity-0 ">
//                 Your Journey to Exceptional
//               </p>
//               <p className="flex justify-center items-center text-white  md:justify-start text-xl md:text-2xl lg:text-2xl font-[sourceSans] animate-slidein [--slidein-delay:900ms] opacity-0 ">
//                 Cars Begins Here!
//               </p>
//             </div>

//             <Link to="/carlist">
//               <button
//                 className="p-2 md:p-5 rounded-md ml-2 gap-2 bg-yellow-500"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "black",
//                 }}
//               >
//                 <h1 className="text-center text-xs md:text-sm font-semibold">
//                   Get Started{" "}
//                   {/* <ArrowForward className="w-6 h-6 inline" /> */}
//                 </h1>
//                 <FaArrowRight style={{ color: "black", fontSize: "15px" }} />
//               </button>
//             </Link>

//             {/* <p className="text-white font-bold mb-5 rounded">
//                Car Is Where Early Adopters And Innovation Seekers Lively Imaginative Tech Before It Hits The Mainstream
//                </p> */}
//           </div>
//         </div>
//       </div>

//       {/* **22 */}

//       <div className="relative lg:h-[42rem] ">
//         <img
//           src={audi1}
//           alt="Image 1"
//           className="object-cover w-full md:h-full h-[200px] lg:mt-0 md:mt-5 mt-10"
//         />
//         <div className="absolute grid inset-0 bg-black/30">
//           <div className="mt-2 md:mt-4 xl:mt-8 ml-10">
//             <div className="text-white  text-md md:text-xl lg:text-4xl mb-2  font-bold  rounded xl:mt-[70px] lg:mt-[80px] mt-4 md:mt-[30px]">
//               <Typography
//                 variant="h1"
//                 color="white"
//                 className="mb-4 lg:w-3/4 text-white font-[sourceSans] px-7 md:px-2 text-2xl md:text-4xl lg:text-4xl"
//               >
//                 The Best Cars For The Best Journey
//               </Typography>
//             </div>
//             <Link to="/carlist">
//               <button
//                 className="p-2 md:p-5 rounded-md ml-2 gap-2 bg-yellow-500"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "black",
//                 }}
//               >
//                 <h1 className="text-center text-xs md:text-sm font-semibold">
//                   Get Started{" "}
//                   {/* <ArrowForward className="w-6 h-6 inline" /> */}
//                 </h1>
//                 <FaArrowRight style={{ color: "black", fontSize: "15px" }} />
//               </button>
//             </Link>
//             {/* <p className="text-white font-bold mb-5 rounded">
//                Car Is Where Early Adopters And Innovation Seekers Lively Imaginative Tech Before It Hits The Mainstream
//                </p> */}
//           </div>
//         </div>
//       </div>

//       {/* **** * 333333333 */}

//       <div className="relative lg:h-[42rem] ">
//         <img
//           src={Mask}
//           alt="Image 1"
//           className="object-cover w-full md:h-full h-[200px] lg:mt-0 md:mt-5 mt-10"
//         />
//         <div className="absolute grid inset-0 bg-black/30">
//           <div className="mt-2 md:mt-4 xl:mt-8 ml-10">
//             <div className="text-white  text-md md:text-xl lg:text-4xl mb-2  font-bold  rounded xl:mt-[70px] lg:mt-[80px] mt-4 md:mt-[30px]">
//               <Typography
//                 variant="h1"
//                 color="white"
//                 className="mb-4 lg:w-3/4 text-white font-[sourceSans] px-7 md:px-2 text-lg md:text-4xl lg:text-4xl"
//               >
//                 The Best Cars For The Best Journey
//               </Typography>
//               <Typography
//                 variant="lead"
//                 color="white"
//                 className="mb-4 w-3/4 lg:w-[40%] font-[sourceSans] text-white text-xs md:text-sm lg:text-lg"
//               >
//                 We provide best cars with the best prices. We are expert in car
//                 rental. Enjoy your holiday with us. We make your drive
//                 memorable.
//               </Typography>
//             </div>
//             <Link to="/carlist">
//               <button
//                 className="p-2 md:p-5 rounded-md ml-2 gap-2 bg-yellow-500"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "black",
//                 }}
//               >
//                 <h1 className="text-center text-xs md:text-sm font-semibold">
//                   Get Started{" "}
//                   {/* <ArrowForward className="w-6 h-6 inline" /> */}
//                 </h1>
//                 <FaArrowRight style={{ color: "black", fontSize: "15px" }} />
//               </button>
//             </Link>
//             {/* <p className="text-white font-bold mb-5 rounded">
//                Car Is Where Early Adopters And Innovation Seekers Lively Imaginative Tech Before It Hits The Mainstream
//                </p> */}
//           </div>
//         </div>
//       </div>

//       {/* ************************************************************************************************************* */}
      
//     </Carousel>
//   );
// };

// export default HeroSection;
