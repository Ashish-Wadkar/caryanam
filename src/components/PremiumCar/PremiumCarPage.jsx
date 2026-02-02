import  { useState, useEffect } from "react";
import PremiumCarCard from "./PremiumCarCard";
import premiumCar1 from "../../assets/premiumCar/premiumCar1.png";
import profile from "../../assets/premiumCar/profile.png";
import CarBanner from "./CarBanner";

const PremiumCarPage = () => {
  // Sample data
  const allCars = Array(32).fill({
    carPhoto: premiumCar1,
    profilePic: profile,
    carType: "Sedan",
    carModel: "2017 BMW X1 xDrive 20d xline",
    price: "45,000",
    ownerName: "Rohit Sharma",
    mileage: "25,000 km",
    fuelType: "Diesel",
    transmission: "Automatic",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default to mobile

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(8); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(12); // Tablet
      } else {
        setItemsPerPage(16); // Desktop
      }
    };

    // Set initial value
    updateItemsPerPage();

    // Add event listener for window resize
    window.addEventListener("resize", updateItemsPerPage);

    // Cleanup
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(allCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = allCars.slice(startIndex, endIndex);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (page) => {
    // Only update page if it's different and within valid range
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    // Always scroll to top
    scrollToTop();
  };

  return (<>
    <CarBanner/>
    <div>
      <div
        className=" p-4 sm:p-8 flex flex-col items-center"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #2A2929 34.62%, #000000 92.79%)",
        }}
      >
        {/* Centered heading section */}
        <div className="w-full max-w-[788px] flex flex-col items-center justify-center mb-12">
          {/* Main heading with colored spans */}
          <h1 className="text-center font-['Inter'] font-semibold text-[30px] leading-[38px] md:text-[43px] md:leading-[54px] tracking-normal capitalize mb-4">
            <span className="text-white">Low Mileage, </span>
            <span className="text-yellow-500">HIGH PERFORMANCE</span>
            <br />
            <span className="text-yellow-500">PRE-</span>
            <span className="text-white">Owned </span>
            <span className="text-white">Luxury</span>
          </h1>

          {/* Subheading paragraph */}
          <p className="text-white text-center text-lg leading-6 max-w-[600px]">
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
          {currentCars.map((car, index) => (
            <PremiumCarCard key={`car-${startIndex + index}`} {...car} />
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => {
                if (currentPage > 1) goToPage(currentPage - 1);
                scrollToTop();
              }}
              className={`px-4 py-2 rounded bg-white text-black hover:bg-gray-100 transition-colors font-bold ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show limited page numbers with ellipsis
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-gray-200 text-black font-bold"
                      : "bg-white text-black hover:bg-gray-100"
                  } transition-colors`}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 py-2 text-black">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => goToPage(totalPages)}
                className="px-4 py-2 rounded bg-white text-black hover:bg-gray-100 transition-colors"
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => {
                if (currentPage < totalPages) goToPage(currentPage + 1);
                scrollToTop();
              }}
              className={`px-4 py-2 rounded bg-white text-black hover:bg-gray-100 transition-colors font-bold ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default PremiumCarPage;
