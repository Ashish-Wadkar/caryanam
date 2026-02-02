// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { CardDefault2 } from "../ui/UploadImageComponents/CardDefault2";

// const FeaturedCars = ({ data, error }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (data?.list && Array.isArray(data.list)) {
//       setPosts(data.list);
//     } else if (error) {
//       // console.error("Data not Found");
//     }
//   }, [data, error]);
//   return (
//     <>
//     <div className="text-3xl font-bold p-10 font-[sourceSans]">Recently Added Cars</div>
//         <div className="w-full lg:pl-0 ">
//           <div className="md:grid md:grid-cols-4 mx-2">

//             {posts?.slice(0,4).map((items, index) => {
//               return (
//                 <div key={index}>
//                   <div className="flex mb-5 mx-3 md:mb-0">
//                     <CardDefault2 data={items} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>

//     </>
//   );
// };

// export default FeaturedCars;

// import React from "react";
import fastapiIcon from "../assets/feature_img/devicon_fastapi@2x.png";
import searchIcon from "../assets/feature_img/search.png";
import groupIcon from "../assets/feature_img/Group.png";
import group1Icon from "../assets/feature_img/Group1.png";

const FeatureSection = () => {
  const carFeatures = [
    {
      icon: fastapiIcon,
      title: "Search With Ease",
      description: "Choose from 1000+ verified cars",
      exploreLink: "/search",
    },
    {
      icon: searchIcon,
      title: "Fast Results",
      description: "Find your perfect car in minutes",
      exploreLink: "/results",
    },
    {
      icon: groupIcon,
      title: "Personalized Experience",
      description: "Guaranteed competitive pricing",
      exploreLink: "/pricing",
    },
    {
      icon: group1Icon,
      title: "Expert Support",
      description: "All cars undergo thorough inspection",
      exploreLink: "/support",
    },
  ];

  return (
    <div className="w-full bg-[rgba(243,243,243,0.23)] mt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2A2A2A] mb-3 text-center sm:text-left">
          Finding your dream Car Easily and Quickly
        </h1>

        {/* Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-[#6C6C6C] mb-6 sm:mb-8 text-center sm:text-left max-w-8xl">
          From trusted sellers to verified listings, our platform makes it
          simple to browse, compare, and drive away with confidence. Whether
          you&apos;re buying your first car or upgrading, we make the journey fast,
          secure, and hassle-free.
        </p>

        {/* Cards Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {carFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-opacity-20 bg-white p-3 sm:p-5 flex flex-col h-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-2 hover:shadow-xl"
              style={{
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Card Icon - smaller on mobile */}
              <div className="transition-transform duration-300 group-hover:scale-105">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 object-contain mx-auto"
                />
              </div>

              {/* Card Title - smaller text on mobile */}
              <h3 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 text-[#2A2A2A] text-center group-hover:text-[#FF7101] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Card Description - smaller text on mobile */}
              <p
                className="text-xs sm:text-lg text-[#6C6C6C] mb-2 sm:mb-4 text-center 
             group-hover:text-[#2A2A2A] 
             group-hover:scale-105 
             transform 
             transition-all duration-300 ease-in-out"
              >
                {feature.description}
              </p>

              {/* Button - smaller on mobile */}
              <div className="mt-auto flex justify-center">
                <a href={feature.exploreLink} className="w-full">
                  <button className="w-full h-10 sm:h-14 border-2 border-[#FF7101] rounded-md flex items-center justify-center gap-1 sm:gap-2 hover:bg-[#FF7101] hover:text-white transition-all duration-300 text-xs sm:text-base font-medium group-hover:border-[#ff8a3d] group-hover:scale-[1.02]">
                    <span>Explore Now</span>
                    <svg
                      className="w-3 h-3 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
