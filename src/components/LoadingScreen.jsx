// // // LoadingScreen.js

import { useEffect, useState } from "react";
import loadingscreenimg from "../assets/loadingscreenimg/loading_car2.png";
import bgImage2 from "../assets/cars/bmw/bmw.png";
 
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bgImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      {/* Foreground Content */}
      <div className="relfixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center text-white">
        {/* Track with Car */}
        <div className="relative w-3/4 h-5 mb-6">
          {/* Background Track */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Car Icon */}
          <img
            src={loadingscreenimg}
          
           alt="car"
            className="absolute top-1/2 -translate-y-[85%] transition-all duration-200"
            style={{
              left: `calc(${progress}% - 100px)`,
              width: "280px",
              height: "150px",
            }}
          />
        </div>

        {/* Text */}
        <p className="text-[40px] text-center font-bold mb-2">
          Welcome to Caryanamindia
        </p>
        {/* <p className="text-[15px]">{pr}%</p> */}
      </div>
    </div>
  );
};

export default LoadingScreen;
