// // import React from 'react';
// import logoleft from "/carslogo/logoleft.png";
// import logotop from "/carslogo/logotop.png";
// import logoright from "/carslogo/logoright.png";
// import { useEffect } from "react";


// const AboutUs = () => {
    
// useEffect(()=>{
//     window.scrollTo(0,0);
// },[]);
//   return (
//     <div className="flex flex-col bg-light-blue-50 h-auto md:h-auto">
//             <div className="flex justify-center items-center">
//                 <img src={logotop} alt="img1" className="h-auto" />
//             </div>
//             <div className="flex">
//                 <div>
//                     <img src={logoleft} alt="img1" className="ml-1" />
//                 </div>
//                 <div className="flex items-center flex-col">
//                     {/* <img src={PreferableIcon} alt="BM" className="h-20" /> */}
//                     <p className="mt-8 text-black text-4xl md:text-6xl lg:text-6xl font-serif text-center">About caryanamindia</p>

//                     <p className="mt-12 text-black text-3xl font-serif text-center">World-class Cars | Our Mission</p>
//                     <p className="mt-12 text-black text-xl font-serif text-center">At caryanamindia, our mission is to provide a seamless and trustworthy <br/> platform for buying and selling second-hand cars. <br/> We strive to make the car buying experience convenient, transparent, and enjoyable for every customer.</p>

//                     <p className="mt-16 text-black text-4xl font-serif text-center">Your world-class SecondHand Cars here</p>
//                     <p className="mt-12 text-black text-xl font-serif text-center">At SecondHandCars, we are passionate about providing high-quality, reliable second-hand cars to our customers. With years of experience in the automotive industry, we understand the importance of trust, transparency, and customer satisfaction.</p>

//                     <p className="mt-16 text-black text-4xl font-serif text-center">Who We Are</p>
//                     <p className="mt-12 text-black text-xl font-serif text-center">caryanamindia is a team of passionate car enthusiasts dedicated to revolutionizing the way people buy and sell used cars. With years of experience in the automotive industry, our team brings expertise, integrity, and innovation to every aspect of our business.</p>

//                     <p className="mt-16 text-black text-4xl font-serif text-center">What We Offer</p>
//                     <p className="mt-12 text-black text-xl font-serif text-center"><span className="font-bold text-xl">Wide Selection:</span> We offer a diverse range of second-hand cars, including sedans, SUVs, trucks, and more, to suit every budget and preference. <br/>
//                     <span className="font-bold text-xl">Quality Assurance:</span> Every car listed on our platform undergoes a thorough inspection process to ensure its quality and reliability. <br/>
// <span className="font-bold text-xl">Transparent Transactions:</span> We believe in transparency and honesty. Our listings provide detailed information about each car, including its history, condition, and pricing. <br/>
// <span className="font-bold text-xl">Exceptional Customer Service:</span> Our dedicated team of customer service representatives is here to assist you at every step of the car buying process. Whether you have questions about a listing or need guidance, we are here to help.</p>
                    
// <p className="mt-16 text-black text-4xl font-serif text-center">Why Choose Us</p>
//                     <p className="mt-12 text-black text-xl font-serif text-center"><span className="font-bold text-xl">Trustworthiness:</span> We prioritize integrity and trust in all our interactions. You can rely on us for fair pricing, accurate listings, and honest advice. <br/>
// <span className="font-bold text-xl">Convenience:</span> Our user-friendly platform makes it easy to browse, compare, and purchase cars from the comfort of your home. <br/>
// <span className="font-bold text-xl">Peace of Mind:</span> With our quality assurance process and customer support, you can buy with confidence, knowing that you are getting a dependable vehicle backed by exceptional service.</p>

//                     <p className="mt-12 text-black text-xl font-serif text-center">Thank you for choosing SecondHandCars for all your automotive needs. We look forward to serving you!</p>

//                     <p className="mt-12 text-black text-xl font-serif text-center font-semibold">It’s a whole big world in here. <br /> Come on in.</p>
//                 </div>
//                 <div className="ml-auto">
//                     <img src={logoright} alt="img1" />
//                 </div>
//             </div>
//         </div>
//   );
// };

// export default AboutUs;

// import React from "react";
import carImage from "../assets/ui/AboutCar.png";

const AboutUs = () => {
  return (
    <section className="w-full font-inter bg-white py-16 px-4 sm:px-6 md:px-10 lg:px-0">

      <div className="max-w-screen-xl mx-auto lg:px-0">
        {/* --- Mobile & Tablet Layout (lg:hidden) --- */}
        <div className="flex flex-col items-center text-center lg:hidden gap-6">
          {/* About Title */}
          <p className="text-sm font-semibold text-gray-700 tracking-widest uppercase">
            About Us
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Your Next&nbsp;
            <span className="text-[#FF7101]">
              Car
              <br /> Journey
            </span>{" "}
            Starts Here
          </h2>  

          {/* Circle & Car */}
          <div className="relative flex justify-center items-center w-full min-h-[300px]">
            {/* Circle */}
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] rounded-full bg-[#FF7101] z-10" />
            {/* Car */}
            <img
              src={carImage}
              alt="Car"
              className="absolute w-[250px] sm:w-[320px] md:w-[380px] z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    style={{
    filter: "drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.84))"
  }}/>
          </div>

          {/* Paragraph */}
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-[95%] mx-auto">
            2 Free Vehicle Servicings Every customer receives two complimentary services with their used car purchase - ensuring peace of mind after purchase.
          </p>

          {/* Checklist in 2 columns on tablets */}
          <div className="hidden md:flex md:flex-wrap md:gap-y-4 md:gap-x-6 md:max-w-[95%] md:mx-auto">
            {[
              "LCertified Dealer Network All our listings come from USCAR Dealer Association members - trusted, authorized dealers only.",
              "LWide Dealer Network With a large number of dealers across regions, we bring you unmatched variety and availability.",
              "Budget-Friendly Options Looking for premium or pocket-friendly? We offer multiple vehicle choices to suit every budget.",
              "Assured Quality & Trust Buy with confidence - all vehicles are verified for authenticity, documents, and performance.",
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-3 w-full md:w-[48%] transition-all"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#FF7101] flex items-center justify-center bg-white text-[#FF7101] group-hover:bg-[#FF7101] group-hover:text-white transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-400 text-base group-hover:text-[#FF7101] transition-all">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Checklist for mobile - single column */}
          <ul className="space-y-4 text-left max-w-[95%] mx-auto md:hidden">
            {[
           
              "LCertified Dealer Network All our listings come from USCAR Dealer Association members - trusted, authorized dealers only.",
              "LWide Dealer Network With a large number of dealers across regions, we bring you unmatched variety and availability.",
              "Budget-Friendly Options Looking for premium or pocket-friendly? We offer multiple vehicle choices to suit every budget.",
              "Assured Quality & Trust Buy with confidence - all vehicles are verified for authenticity, documents, and performance.",
             ].map((item, idx) => (
              <li
                key={idx}
                className="group flex items-start gap-3 cursor-pointer transition-all"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#FF7101] flex items-center justify-center bg-white text-[#FF7101] group-hover:bg-[#FF7101] group-hover:text-white transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-400 text-base group-hover:text-[#FF7101] transition-all">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Large Screen Layout (lg:flex) --- */}
        <div className="hidden lg:flex items-start gap-12 mt-2 ">
          {/* Left - Car Section */}
          {/* Left - Car Section (fixed alignment for large screens) */}
          <div className="relative w-1/2 min-h-[400px] flex justify-center items-center">
            {/* Circle Wrapper */}
            <div className="relative w-[320px] h-[320px] z-10 flex items-center justify-center">
              {/* Circle */}
              <div className="w-full h-full rounded-full bg-[#FF7101]" />

              {/* Car Image (perfectly centered over circle) */}
              <img
                src={carImage}
                alt="Car"
                className="absolute w-[440px] max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
             style={{
    filter: "drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.84))"
  }}/>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="w-1/2 text-left">
            <p className="text-sm font-semibold text-gray-700 tracking-widest uppercase mb-2">
              About Us
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Your Next <br />
              <span className="text-[#FF7101]">Car Journey</span> Starts Here
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-2 max-w-[100%]">
            2 Free Vehicle Servicings Every customer receives two complimentary services with their used car purchase - ensuring peace of mind after purchase.
         </p>

            <ul className="space-y-4 text-left">
              {[
             
              "Certified Dealer Network  all our listings come from USCAR Dealer Association members - trusted, authorized dealers only.",
              "Wide Dealer Network with a large number of dealers across regions, we bring you unmatched variety and availability.",
              "Budget-Friendly Options looking for premium or pocket-friendly? We offer multiple vehicle choices to suit every budget.",
              "Assured Quality & Trust buy with confidence - all vehicles are verified for authenticity, documents, and performance.",
             ].map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-3 cursor-pointer transition-all"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#FF7101] flex items-center justify-center bg-white text-[#FF7101] group-hover:bg-[#FF7101] group-hover:text-white transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-500 text-base group-hover:text-[#FF7101] transition-all">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default AboutUs;
