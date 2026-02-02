/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRoad, FaGasPump, FaCogs } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  useFavoriteCarMutation,
  useCarremoveFavoriteMutation,
  useCarFavoriteAddRemoveQuery,
} from "../services/carAPI";
import { addFavoriteCar, removeFavoriteCar } from "../pages/favoritesSlice";
import { CarouselCustomArrows } from "./CarouselCustomArrows";

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

export function PremiumCardDefault1({ data, Carid, refetch }) {
  const dispatch = useDispatch();
  const favoriteCars = useSelector((state) => state.favorites.favoriteCars);
  const [favoriteCar] = useFavoriteCarMutation();
  const [CarremoveFavorite] = useCarremoveFavoriteMutation();

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const carid = Carid;
  const useid = UserId;

  const { data: favData, refetch: refetchFavCarData } =
    useCarFavoriteAddRemoveQuery({ carid, useid });

  const handleFavoriteToggle = async () => {
    const data2 = { carId: Carid, userId: UserId };
    if (favoriteCars?.find((favCar) => favCar.carId === data.carId)) {
      dispatch(removeFavoriteCar(data));
      await CarremoveFavorite({
        saveCarId: favData?.object?.saveCarId,
      });
      refetchFavCarData();
    } else {
      await favoriteCar(data2);
      dispatch(addFavoriteCar(data2));
    }
  };

  const combinedText = `${data.brand} ${data.model}`;
  const truncatedText =
    combinedText.length > 25
      ? combinedText.substring(0, 22) + "..."
      : combinedText;

  return (
    <div className="max-w-xs bg-white rounded-2xl overflow-hidden shadow-md">
      {/* Car Image */}
      <Link to={`/carlist/cardetails/premium/${data.carId}`}>
        <div className="relative">
          <CarouselCustomArrows carId={data.carId} />
          {userRole === "USER" && (
            <div
              onClick={handleFavoriteToggle}
              className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow"
            >
              {favoriteCars?.some(
                (favCar) => favCar.carId === data.carId
              ) ? (
                <RatedIcon />
              ) : (
                <UnratedIcon />
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Car Type */}
        <span className="text-yellow-600 text-sm font-semibold">
          {data.bodyType || "Sedan"}
        </span>

        {/* Car Title */}
        <h3 className="text-lg font-bold mt-1">
          {truncatedText}
        </h3>

        {/* Car Details */}
        <div className="flex items-center text-gray-500 text-sm mt-2 gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <FaRoad className="text-gray-400" /> {data.kmDriven} Kms
          </div>
          <div className="flex items-center gap-1">
            <FaGasPump className="text-gray-400" /> {data.fuelType}
          </div>
          <div className="flex items-center gap-1">
            <FaCogs className="text-gray-400" /> {data.transmission}
          </div>
        </div>

        {/* Price */}
        <p className="text-yellow-600 font-semibold text-lg mt-3">
          ₹ {data.price}
        </p>

        {/* Seller Info & Button */}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <img
              src={data.sellerImage || "https://via.placeholder.com/40"}
              alt="Seller"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">
              {data.sellerName || "Unknown Seller"}
            </span>
          </div>
          <Link to={`/carlist/cardetails/premium/${data.carId}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-brown-500 px-4 py-1 rounded-lg text-sm font-medium">
              View Car
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
