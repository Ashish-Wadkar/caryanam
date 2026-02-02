import bannerCarImg from "../../assets/premiumCar/bannerCar.png";

const CarBanner = () => (
  <div className="bg-black text-white w-full overflow-hidden">
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[500px] max-w-screen-2xl mx-auto">
      {/* Left Section - Text Content */}
      <div className="w-full md:w-1/2 px-6 sm:px-10 md:px-14 py-6 flex flex-col justify-center">
        <div className="max-w-[550px]">
          <h1 className="font-inter text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            Redefining <span className="text-white">Luxury</span>
            <br />
            <span className="text-white">on Every Mile</span>
          </h1>

          <div className="flex gap-2 mb-6 mt-2">
            <div className="h-[2px] bg-yellow-500 w-[160px] sm:w-[240px] md:w-[260px]" />
            <div className="h-[2px] bg-yellow-500 w-4 sm:w-8" />
            <div className="h-[2px] bg-yellow-500 w-2" />
          </div>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          </p>
        </div>
      </div>

      {/* Right Section - Car Image */}
      <div className="w-full md:w-1/2 flex justify-end bg-black">
        <img
          src={bannerCarImg}
          alt="Premium Car"
          className="max-h-[600px] sm:max-h-[700px]"
          style={{ marginRight: "-1px" }}
        />
      </div>
    </div>
    
  </div>
  
  
);

export default CarBanner;
