import bmw from "../../assets/cars/bmw/bmw.png";
// import LoadingScreen from "../LoadingScreen";
import SplashScreen from "../LoadingScreen";
import { useState, useEffect } from "react";

const HomeSection = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div
          className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[722px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bmw})` }}
        >
          {/* Overlay with light blur */}
          <div
            className="absolute inset-0 bg-black/30 flex flex-col items-center justify-start text-center px-4 pt-24 sm:pt-40 md:pt-24 lg:pt-28"
            style={{
              backdropFilter: "blur(4px)",
              marginTop: "64px", // 16 * 4 = 64px, matches pt-16
            }}
          >
            {/* Title */}
            <h1 className="mt-22 lg:mt-4 font-semibold text-white font-semibold max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] leading-snug text-2xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
              Welcome to Caryanamindia — Explore{" "}
              <br className="hidden sm:block" /> Our Latest Deals!
            </h1>

            {/* Paragraph */}
            <p className="font-inter text-white font-light text-center leading-relaxed max-w-[95%] sm:max-w-[60%] md:max-w-[70%] lg:max-w-[57%] text-base sm:text-lg md:text-lg lg:text-1xl">
              We provide best cars with the best prices. We are expert in car
              rental. Enjoy your holiday with us. We make your drive memorable.
            </p>
          </div>
          <style>
            {`
          @media (min-width: 640px) {
            .home-section-mobile-margin {
              margin-top: 0 !important;
              padding-top: 10rem !important;
            }
          }
        `}
          </style>
        </div>
      )}
    </>
  );
};

export default HomeSection;
