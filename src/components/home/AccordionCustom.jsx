// import React from "react";
// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
 
// const CUSTOM_ANIMATION = {
//   mount: { scale: 1 },
//   unmount: { scale: 0.9 },
// };
 
// export function AccordionCustom() {
//   const [open, setOpen] = React.useState(1);
 
//   const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
//   return (
//     <div className="container px-4 mt-[5rem]">
//       <div className="text-2xl md:text-4xl md:text-center mb-6">
//         Frequently Asked Questions
//       </div>
//       <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(1)}
//         >
//           <span>When and Where I can take test drive?</span>
//           <span className={`ml-auto transform transition-transform ${open === 1 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//         You can schedule a home test drive for this Autocar assured car at any date and
//         time you find convenient using our test drive booking form.Your assigned Autocar
//          Relationship Manager will then reach out to you and make sure all the details of
//          your preferred car are made available to you before arriving at your home on the
//           selected date & time for the test drive.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 2} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(2)}
//         >
//           <span>What benefits caryanamindia give us?</span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//           Accessing helpful tips and advice on maintaining a second hand car.
//           hassle-free-trade-in program for your current vehicle.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 3} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(3)}
//         >
//           <span>How do I book a car of my choice?</span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//           You can book a car. If you complete the purchase of the vehicle within
//           the holding period, the deposit will be applied towards the purchase
//           otherwise the booking amount will be refunded back to you and the
//           booking cancelled.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 4} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(4)}
//         >
//           <span>Is replacement option available?</span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//           Absolutely yes, replacement option is available and
//           hassle-free-trade-in program for your current vehicle.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 5} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(5)}
//         >
//           <span>Will caryanamindia give us history of vehicle?</span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//           Yes, We verify important details such as ownership history, accident
//           records, and maintenance records.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 6} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(6)}
//         >
//           <span>Will caryanamindia help me with car finance?</span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//           Absolutely, buyers can choose to avail financing through Autocar
//           wherein we would get the loan processed through our finance partners.
//           Our established partnerships help us process loans faster and get our
//           customers better interest rates. Depending on your credit worthiness,
//           you can avail used car loans through Autocar at interest rates as low
//           as 12.99% compared to the market rates of 14-16%.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 7} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer"
//           onClick={() => handleOpen(7)}
//         >
//           <span>Will caryanamindia give us extended warranty?</span>
//         </AccordionHeader>
//         <AccordionBody className="text-sm md:text-xl">
//           Protect your investment with our extended warranty options. Get peace
//           of mind knowing that your second-hand car is covered against
//           unexpected repairs.
//         </AccordionBody>
//       </Accordion>
//     </div>
//   );
// }






// import React from "react";
// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// const CUSTOM_ANIMATION = {
//   mount: { opacity: 1, height: 'auto', transition: 'all 0.5s ease-in-out' },
//   unmount: { opacity: 0, height: '0', transition: 'all 0.5s ease-in-out' },
// };

// export function AccordionCustom() {
//   const [open, setOpen] = React.useState(1);

//   const handleOpen = (value) => setOpen(open === value ? 0 : value);

//   return (
//     <div className="container px-4 mt-[5rem] flex flex-col items-center">
//       <div className="text-2xl md:text-4xl md:text-center mb-6 font-oswald ">
//         Frequently Asked Questions
//       </div>
//       <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(1)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q.When and Where I can take test drive?</span>
//           <span className={`ml-auto transform transition-transform ${open === 1 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           You can schedule a home test drive for this Autocar assured car at any date and
//           time you find convenient using our test drive booking form. Your assigned Autocar
//           Relationship Manager will then reach out to you and make sure all the details of
//           your preferred car are made available to you before arriving at your home on the
//           selected date & time for the test drive.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 2} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(2)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q. What benefits caryanamindia give us?</span>
//           <span className={`ml-auto transform transition-transform ${open === 2 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           Accessing helpful tips and advice on maintaining a second-hand car. 
//           Hassle-free trade-in program for your current vehicle.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 3} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(3)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q. How do I book a car of my choice?</span>
//           <span className={`ml-auto transform transition-transform ${open === 3 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           You can book a car. If you complete the purchase of the vehicle within
//           the holding period, the deposit will be applied towards the purchase
//           otherwise the booking amount will be refunded back to you and the
//           booking cancelled.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 4} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(4)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q. Is replacement option available?</span>
//           <span className={`ml-auto transform transition-transform ${open === 4 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           Absolutely yes, replacement option is available and
//           hassle-free trade-in program for your current vehicle.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 5} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(5)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q. Will caryanamindia give us history of vehicle?</span>
//           <span className={`ml-auto transform transition-transform ${open === 5 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           Yes, we verify important details such as ownership history, accident
//           records, and maintenance records.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 6} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(6)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q. Will caryanamindia help me with car finance?</span>
//           <span className={`ml-auto transform transition-transform ${open === 6 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           Absolutely, buyers can choose to avail financing through Autocar
//           wherein we would get the loan processed through our finance partners.
//           Our established partnerships help us process loans faster and get our
//           customers better interest rates. Depending on your credit worthiness,
//           you can avail used car loans through Autocar at interest rates as low
//           as 12.99% compared to the market rates of 14-16%.
//         </AccordionBody>
//       </Accordion>
//       <Accordion open={open === 7} animate={CUSTOM_ANIMATION}>
//         <AccordionHeader
//           className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato transition-colors"
//           onClick={() => handleOpen(7)}
//         >
//           <span className="text-[#19376D] text-sm md:text-base">Q. Will caryanamindia give us extended warranty?</span>
//           <span className={`ml-auto transform transition-transform ${open === 7 ? 'rotate-180' : 'rotate-0'}`}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </span>
//         </AccordionHeader>
//         <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
//           Protect your investment with our extended warranty options. Get peace
//           of mind knowing that your second-hand car is covered against
//           unexpected repairs.
//         </AccordionBody>
//       </Accordion>
//     </div>
//   );
// }

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const CUSTOM_ANIMATION = {
  mount: { opacity: 1, height: 'auto', transition: 'all 0.5s ease-in-out' },
  unmount: { opacity: 0, height: '0', transition: 'all 0.5s ease-in-out' },
};

export function AccordionCustom() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl"> {/* Set a max-width for better layout on larger screens */}
        <div className="text-2xl md:text-4xl text-center mb-6 font-oswald">
          Frequently Asked Questions
        </div>
        <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(1)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. When and Where can I take a test drive?</span>
            <span className={`ml-auto transform transition-transform ${open === 1 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            You can schedule a home test drive for this Autocar assured car at any date and
            time you find convenient using our test drive booking form. Your assigned Autocar
            Relationship Manager will then reach out to you and make sure all the details of
            your preferred car are made available to you before arriving at your home on the
            selected date & time for the test drive.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(2)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. What benefits does caryanamindia offer?</span>
            <span className={`ml-auto transform transition-transform ${open === 2 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            Access helpful tips and advice on maintaining a second-hand car. 
            Hassle-free trade-in program for your current vehicle.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(3)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. How do I book a car of my choice?</span>
            <span className={`ml-auto transform transition-transform ${open === 3 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            You can book a car. If you complete the purchase of the vehicle within
            the holding period, the deposit will be applied towards the purchase
            otherwise the booking amount will be refunded back to you and the
            booking cancelled.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(4)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. Is replacement option available?</span>
            <span className={`ml-auto transform transition-transform ${open === 4 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            Absolutely yes, replacement option is available and
            hassle-free trade-in program for your current vehicle.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(5)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. Will caryanamindia give us history of vehicle?</span>
            <span className={`ml-auto transform transition-transform ${open === 5 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            Yes, we verify important details such as ownership history, accident
            records, and maintenance records.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 6} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(6)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. Will caryanamindia help me with car finance?</span>
            <span className={`ml-auto transform transition-transform ${open === 6 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org .org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            Absolutely, buyers can choose to avail financing through Autocar
            wherein we would get the loan processed through our finance partners. Our established partnerships help us process loans faster and get our customers better interest rates. Depending on your credit worthiness, you can avail used car loans through Autocar at interest rates as low as 12.99% compared to the market rates of 14-16%.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 7} animate={CUSTOM_ANIMATION}>
          <AccordionHeader
            className="text-lg md:text-xl flex justify-between items-center cursor-pointer hover:text-indigo-600 font-lato border-0 transition-colors"
            onClick={() => handleOpen(7)}
          >
            <span className="text-[#19376D] text-sm md:text-base">Q. Will caryanamindia give us extended warranty?</span>
            <span className={`ml-auto transform transition-transform ${open === 7 ? 'rotate-180' : 'rotate-0'}`}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </AccordionHeader>
          <AccordionBody className="text-xs md:text-sm font-roboto text-[#777d89]">
            Protect your investment with our extended warranty options. Get peace
            of mind knowing that your second-hand car is covered against
            unexpected repairs.
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}