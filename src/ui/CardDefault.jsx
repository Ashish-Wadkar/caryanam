/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useFavoriteCarMutation,
  useCarremoveFavoriteMutation,
  useCarFavoriteAddRemoveQuery,
} from "../services/carAPI";
// removed dealer info from card
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCar, removeFavoriteCar } from "../pages/favoritesSlice";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TransmissionIcon from "@mui/icons-material/Settings";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { useGetCarImageByIdQuery } from "../services/carAPI";

function RatedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="red"
      className="h-6 w-6"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

function UnratedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

export function CardDefault({ data, Carid, refetch, isLoading }) {
  const dispatch = useDispatch();
  const favoriteCars = useSelector((state) => state.favorites.favoriteCars);
  const [isHovered, setIsHovered] = useState(false);
// console.log("this is images ",data,data.images,data.carImage);
  const [favoriteCar] = useFavoriteCarMutation();
  const token = Cookies.get("token");
  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const userRole = token ? jwtDecodes?.authorities[0] : null;
  const data2 = { carId: Carid, userId: UserId };
  const carid = data2.carId;
  const useid = data2.userId;

  const {
    data: favData,
    error,
    refetch: refetchFavCarData,
  } = useCarFavoriteAddRemoveQuery({ carid, useid });


  const [CarremoveFavorite] = useCarremoveFavoriteMutation();

  const handleFavoriteToggle = async () => {
    const data2 = { carId: Carid, userId: UserId };
    if (favoriteCars?.find((favCar) => favCar.carId === data.carId)) {
      dispatch(removeFavoriteCar(data));
      await CarremoveFavorite({ saveCarId: favData?.object?.saveCarId });
      refetchFavCarData();
    } else {
      await favoriteCar(data2);
      dispatch(addFavoriteCar(data2));
    }
  };


  const combinedText = `${data.year || ""} ${data.brand || ""} ${
    data.model || ""
  }`;
  const truncatedText =
    combinedText.length > 25
      ? combinedText.substring(0, 22) + "..."
      : combinedText;

  const formatPrice = (price) => {
    if (!price) return "Price not available";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatKm = (km) => {
    if (!km) return "KM not available";
    return `${km.toLocaleString()} Kms`;
  };

  // 🔥 Prefer coverImage from service if available, else fallback to provided fields
  const [carImg, setCarImg] = useState(
    data.images?.[0] || data.carImage || "/wrong-path/no-car.png"
  );
  // seller info removed from the card UI

  const { data: imagesData } = useGetCarImageByIdQuery({ carId: data.carId }, { skip: !data?.carId });

  useEffect(() => {
    if (imagesData && Array.isArray(imagesData.object)) {
      const cover = imagesData.object.find((img) => img.documentType === "coverImage" && img.documentLink);
      const first = imagesData.object.find((img) => img.documentLink);
      if (cover?.documentLink) {
        setCarImg(cover.documentLink);
      } else if (first?.documentLink) {
        setCarImg(first.documentLink);
      }
    }
  }, [imagesData]);

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 
      flex flex-col md:flex-row items-center justify-center p-6 mb-6 max-w-4xl mx-auto"
    >
      {/* Car Image */}
      <div className="w-full h-48 md:w-64 md:h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <Link to={`/carlist/cardetails/${data.carId}`}>
          <img
            src={carImg}
            alt={combinedText}
            className="object-cover w-full h-full"
            onError={() => setCarImg("/cars/no-image-available.png")}
          />
        </Link>
      </div>

      {/* Car Info */}
      <div className="flex-1 px-0 md:px-6 flex flex-col items-center text-center justify-between h-full min-w-0 mt-3 md:mt-0">
        <div className="flex items-center mb-1">
          <span className="text-xs text-orange-500 font-semibold mr-2">
            {data.bodyType || "Sedan"}
          </span>
        </div>
        <div className="font-semibold text-lg text-gray-900 truncate">
          {combinedText}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-500 text-sm mt-1 mb-2">
          <span className="flex items-center">
            <DriveEtaIcon
              className="text-green-600 mr-1"
              style={{ fontSize: "1rem" }}
            />
            {formatKm(data.kmDriven)}
          </span>
          <span className="flex items-center">
            <LocalGasStationIcon
              className="text-green-600 mr-1"
              style={{ fontSize: "1rem" }}
            />
            {data.fuelType || "N/A"}
          </span>
          <span className="flex items-center">
            <TransmissionIcon
              className="text-green-600 mr-1"
              style={{ fontSize: "1rem" }}
            />
            {data.transmission || "N/A"}
          </span>
          <span className="flex items-center">
            <FaLocationDot
              className="text-green-600 mr-1"
              style={{ fontSize: "1rem" }}
            />
            {data.area || data.location || "N/A"}
          </span>
        </div>
        <div className="text-orange-600 font-bold text-xl mb-2">
          {formatPrice(data.price)}
        </div>
        <Link to={`/carlist/cardetails/${data.carId}`}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center text-sm font-semibold w-full sm:w-auto justify-center">
            View Details <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}
