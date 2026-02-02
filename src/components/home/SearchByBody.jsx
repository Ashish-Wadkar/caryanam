// import { useState, useRef, useEffect } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import PropTypes from "prop-types";
// import Sedan from "../../assets/body/Sedan.png";
// import Suv from "../../assets/body/Suv.png";

// import Hatchback from "../../assets/body/Hatchback.png";
// import Minivan from "../../assets/body/Minivan.png";

// const bodyTypes = [
//   { id: 1, name: "Sedan", image: Sedan },
//   { id: 2, name: "SUV", image: Suv },
//   { id: 3, name: "Hatchback", image: Hatchback },
//   { id: 4, name: "Minivan", image: Minivan },
//   { id: 5, name: "Sedan", image: Sedan },
//   { id: 6, name: "Hatchback", image: Hatchback },
//   { id: 7, name: "Minivan", image: Minivan },
//   { id: 8, name: "SUV", image: Suv },
// ];

// const SearchByBody = ({ onCardClick }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollRef = useRef(null);
//   const containerRef = useRef(null);
//   const [cardsPerPage, setCardsPerPage] = useState(2); // Start with mobile default
//   const totalPages = Math.ceil(bodyTypes.length / cardsPerPage);
//   const [cardWidth, setCardWidth] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCardsPerPage(2);
//       } else if (window.innerWidth < 768) {
//         setCardsPerPage(3);
//       } else {
//         setCardsPerPage(5);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const calculateCardWidth = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const gap = 12;
//         const calculatedCardWidth =
//           (containerWidth - gap * (cardsPerPage - 1)) / cardsPerPage;
//         setCardWidth(calculatedCardWidth);
//       }
//     };

//     calculateCardWidth();
//     window.addEventListener("resize", calculateCardWidth);
//     return () => window.removeEventListener("resize", calculateCardWidth);
//   }, [cardsPerPage]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!scrollRef.current || isScrolling) return;

//       const scrollLeft = scrollRef.current.scrollLeft;
//       const gap = 12;
//       const pageWidth = cardsPerPage * (cardWidth + gap);
//       const newIndex = Math.round(scrollLeft / pageWidth);

//       if (newIndex !== currentIndex) {
//         setCurrentIndex(newIndex);
//       }
//     };

//     const scrollContainer = scrollRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener("scroll", handleScroll);
//       return () => scrollContainer.removeEventListener("scroll", handleScroll);
//     }
//   }, [cardWidth, currentIndex, isScrolling, cardsPerPage]);

//   const scrollToIndex = (index) => {
//     if (scrollRef.current) {
//       setIsScrolling(true);
//       const gap = 12;
//       const scrollAmount = index * cardsPerPage * (cardWidth + gap);
//       scrollRef.current.scrollTo({
//         left: scrollAmount,
//         behavior: "smooth",
//       });

//       setTimeout(() => {
//         setIsScrolling(false);
//       }, 500);

//       setCurrentIndex(index);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       scrollToIndex(currentIndex - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < totalPages - 1) {
//       scrollToIndex(currentIndex + 1);
//     }
//   };

//   const handleCardClick = (bodyType) => {
//     if (onCardClick) {
//       onCardClick(bodyType);
//     }
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 py-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Title Section */}
//         <div className="w-full mb-6">
//           <h2 className="text-2xl md:text-3xl font-semibold text-[#2A2A2A] text-center md:text-left">
//             Search By Body
//           </h2>
//         </div>

//         {/* Cards Container with Navigation */}
//         <div className="relative" ref={containerRef}>
//           {/* Navigation Arrows (Desktop only) */}
//           <button
//             onClick={handlePrev}
//             disabled={currentIndex === 0}
//             className={`hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${currentIndex === 0
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//               }`}
//             style={{ transform: "translateY(-50%) translateX(-50%)" }}
//           >
//             <FiChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>

//           <button
//             onClick={handleNext}
//             disabled={currentIndex === totalPages - 1}
//             className={`hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${currentIndex === totalPages - 1
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//               }`}
//             style={{ transform: "translateY(-50%) translateX(50%)" }}
//           >
//             <FiChevronRight className="w-5 h-5 text-gray-700" />
//           </button>

//           {/* Scrollable Cards Section */}
//           <div className="overflow-x-hidden px-4 sm:px-8">
//             <div
//               ref={scrollRef}
//               className="flex gap-3 transition-transform duration-300 overflow-x-auto hide-scrollbar"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {bodyTypes.map((bodyType) => (
//                 <div
//                   key={bodyType.id}
//                   className="flex-shrink-0 rounded-lg border border-[#B5B5B5] bg-white p-3 cursor-pointer hover:shadow-md transition-shadow"
//                   style={{
//                     width: `${cardWidth}px`,
//                     minWidth: `${cardWidth}px`,
//                     height: "160px",
//                   }}
//                   onClick={() => handleCardClick(bodyType)}
//                 >
//                   <div className="h-full flex flex-col items-center justify-center">
//                     <img
//                       src={bodyType.image}
//                       alt={bodyType.name}
//                       className="h-16 w-auto object-contain mb-2"
//                     />
//                     <h3 className="text-base font-medium text-[#2A2A2A]">
//                       {bodyType.name}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Pagination Dots */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-4 space-x-2">
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => scrollToIndex(index)}
//                   className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-[#FF7101] w-4" : "bg-gray-300"
//                     }`}
//                   aria-label={`Go to page ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile navigation buttons - REMOVED */}
//     </div>
//   );
// };

// SearchByBody.propTypes = {
//   onCardClick: PropTypes.func,
// };

// SearchByBody.defaultProps = {
//   onCardClick: null,
// };

// export default SearchByBody;
 


import   { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PropTypes from "prop-types";
import Sedan from "../../assets/body/Sedan.png";
import Suv from "../../assets/body/Suv.png";
import Hatchback from "../../assets/body/HatchBack.png";
import Minivan from "../../assets/body/Minivan.png";

const bodyTypes = [
  { id: 1, name: "Sedan", image: Sedan },
  { id: 2, name: "SUV", image: Suv },
  { id: 3, name: "Hatchback", image: Hatchback },
  { id: 4, name: "Minivan", image: Minivan },
  { id: 5, name: "Sedan", image: Sedan },
  { id: 6, name: "Hatchback", image: Hatchback },
  { id: 7, name: "Minivan", image: Minivan },
  { id: 8, name: "SUV", image: Suv },
];

const SearchByBody = ({ onCardClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const totalPages = Math.ceil(bodyTypes.length / cardsPerPage);
  const [cardWidth, setCardWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 768) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const calculateCardWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gap = 12;
        const calculatedCardWidth =
          (containerWidth - gap * (cardsPerPage - 1)) / cardsPerPage;
        setCardWidth(calculatedCardWidth);
      }
    };

    calculateCardWidth();
    window.addEventListener("resize", calculateCardWidth);
    return () => window.removeEventListener("resize", calculateCardWidth);
  }, [cardsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || isScrolling) return;

      const scrollLeft = scrollRef.current.scrollLeft;
      const gap = 12;
      const pageWidth = cardsPerPage * (cardWidth + gap);
      const newIndex = Math.round(scrollLeft / pageWidth);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [cardWidth, currentIndex, isScrolling, cardsPerPage]);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      setIsScrolling(true);
      const gap = 12;
      const scrollAmount = index * cardsPerPage * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 500);

      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    } else {
      scrollToIndex(totalPages - 1); // Loop to end
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      scrollToIndex(0); // Loop to start
    }
  };

  const handleCardClick = (bodyType) => {
    if (onCardClick) {
      onCardClick(bodyType);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="w-full mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2A2A2A] text-center md:text-left">
            Search By Body
          </h2>
        </div>

        {/* Cards Container with Navigation */}
        <div className="relative" ref={containerRef}>
          {/* Navigation Arrows (Desktop only) */}
          <button
            onClick={handlePrev}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            style={{ transform: "translateY(-50%) translateX(-50%)" }}
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            style={{ transform: "translateY(-50%) translateX(50%)" }}
          >
            <FiChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable Cards Section */}
          <div className="overflow-x-hidden px-4 sm:px-8">
            <div
              ref={scrollRef}
              className="flex gap-3 transition-transform duration-300 overflow-x-auto hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {bodyTypes.map((bodyType) => (
                <div
                  key={bodyType.id}
                  className="flex-shrink-0 rounded-lg border border-[#B5B5B5] bg-white p-3 cursor-pointer hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                  style={{
                    width: `${cardWidth}px`,
                    minWidth: `${cardWidth}px`,
                    height: "160px",
                  }}
                  onClick={() => handleCardClick(bodyType)}
                >
                  <div className="absolute inset-0 bg-[#FF7101] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-full flex flex-col items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                    <img
                      src={bodyType.image}
                      alt={bodyType.name}
                      className="h-16 w-auto object-contain mb-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition-filter duration-300"
                    />
                    <h3 className="text-base font-medium text-[#2A2A2A] group-hover:text-white transition-colors duration-300">
                      {bodyType.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-[#FF7101] w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
SearchByBody.propTypes = {
  onCardClick: PropTypes.func,
};

export default SearchByBody;

