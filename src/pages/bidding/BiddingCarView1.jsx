/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { useGetbeadingCarImageQuery } from "../../services/biddingAPI";
import { FiLoader } from "react-icons/fi"; 

const BiddingCarView1 = ({ beadingCarId }) => {
  const [exterior, setExterior] = useState(true);
  const [imageURLs, setImageURLs] = useState([]);
 
  const { data, isLoading, error } = useGetbeadingCarImageQuery({beadingCarId});


  const fallbackImage = "..\\..\\cars\\no-image-available-update.png";

  const checkIfImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url); // Return the original URL if the image loads
      img.onerror = () => resolve(fallbackImage); // Return the fallback image if the image fails to load
      img.src = url;
    });
  };

  useEffect(() => {
    if (data?.object && Array.isArray(data.object)) {
      const reorderedData = [
        ...data.object.filter(
          (item) => item.doctype === "coverImage" && item.documentLink !== null
        ),
        ...data.object.filter(
          (item) => item.doctype !== "coverImage" && item.documentLink !== null
        ),
      ];

      const urls = reorderedData.map((item) => item.documentLink);
      Promise.all(urls.map(checkIfImage)).then((validatedURLs) => {
        setImageURLs(validatedURLs);
      });
    } else {
      setImageURLs([fallbackImage]); // Handle case when data.object is not valid
    }
  }, [data?.object]); // Depend on data.object, not just data

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (error)
    return (
      <div className="font-[Merriweather] md:text-center text-center">
        Image not available{" "}
        <div className="flex justify-center">
          <img
            className=" md:w-[15rem] w-[10rem] opacity-50 "
            src="..\..\cars\no-image-available-update.png"
            alt="no image"
          />
        </div>
      </div>
    );

  const ChooseCarColor = () => {
    return (
      <div className=" h-[16rem] w-full md:h-[30rem] ">
        {exterior && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            autoplay={true} // Enables automatic sliding
            loop={true}     // Enables looping through images
            // navigation={true} // Keeps built-in navigation functionality
          >
            {imageURLs.length > 0 ? (
              imageURLs.map((url, index) => (
                <div key={index} className="relative overscroll-y-none">
                  <img
                    src={url}
                    alt={`Car Image ${index}`}
                    className="w-full h-[16rem] md:h-[29rem] md:bg-cover carousel-height relative blur-md bg-cover"
                  />
                  <img
                    src={url}
                    alt={`Car Image ${index}`}
                    className="object-contain w-full h-full absolute top-0 md:top-3 px-3"
                  />
                </div>
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}
      </div>
    );
  };

  return (
    <div className="w-5/5 md:w-full container md:px-4 lg:px-8">
      <div className="flex flex-col justify-between">
      <div className=" h-[16rem] w-full md:h-[30rem] ">
        {exterior && (
          <Carousel
            className="bg-white rounded-lg shadow-md"
            autoplay={true} // Enables automatic sliding
            loop={true}     // Enables looping through images
            // navigation={true} // Keeps built-in navigation functionality
          >
            {imageURLs.length > 0 ? (
              imageURLs.map((url, index) => (
                <div key={index} className="relative overscroll-y-none">
                  <img
                    src={url}
                    alt={`Car Image ${index}`}
                    className="w-full h-[16rem] md:h-[29rem] md:bg-cover carousel-height relative blur-md bg-cover"
                  />
                  <img
                    src={url}
                    alt={`Car Image ${index}`}
                    className="object-contain w-full h-full absolute top-0 md:top-3 px-3"
                  />
                </div>
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}
      </div>
        <div className="w-11/12 max-w-xl mx-auto m-5 mb-10 overflow-x-auto scrollbar">
          <div className="flex space-x-4 justify-between"></div>
        </div>
      </div>
    </div>
  );
};

export default BiddingCarView1;
