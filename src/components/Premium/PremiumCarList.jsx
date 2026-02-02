/* eslint-disable no-unused-vars */

// import { Link } from "react-router-dom";
// import lexus from "../../assets/lexus.jpg";
import { useEffect, useState } from "react";
import { useFilterCarPremiumQuery } from "../../services/carAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCars } from "../../pages/favoritesSlice";

import { FiLoader } from "react-icons/fi";
import GridPremiumCarList1 from "../buyCar/GridPremiumCarList1";
import FilterPremiumCars1 from "../buyCar/FilterPremiumCars1";
import CarBanner from "../PremiumCar/CarBanner";

const PremiumCarList = () => {
  const [searchClicked, setSearchClicked]=useState(false);   
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [urlState, setUrllState] = useState(null);


  const emptyImage = "..\\..\\cars\\emptyfolder.png";

  const { data, isLoading, error, refetch } =
    useFilterCarPremiumQuery(urlState ,{skip:!urlState});
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    if (UserId) {
      dispatch(fetchFavoriteCars(UserId)); // dispatch the thunk function itself
    }
  }, [dispatch, UserId]);

  if (error?.status === 401) {
    Cookies.remove("token");
    navigate("/signin");
  }
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
  <>
  {!searchClicked && <CarBanner/>}
    {/* <CarBanner /> */}
    <div className="bg-black min-h-screen">
        
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
            Lorem ipsum dolor sit amet consectetur. Malesuada erat leo senectus
            non. Donec nunc sed mauris faucibus ut.
          </p>
        </div>
        </div>
      <div className="container mx-auto px-0"> {/* removed padding here */}
        <div className="w-full"></div>
        <div className="">
          <div className="mb-1">
            <div className="md:col-span-2 lg:col-span-1 top-0">
              <FilterPremiumCars1
                setUrlState={setUrllState}
                onFilterChange={refetch}
                setSearchClicked={setSearchClicked}
                 
              />
            </div>
            <div className="lg:col-span-3 no-scrollbar mt-6">
              {error?.status === 404 ? (
                <div>
                  <div className="flex justify-center mt-14">
                    <img className="w-40" src={emptyImage} alt="no data" />
                  </div>
                  <p className="flex justify-center text-2xl md:text-3xl font-semibold text-white">
                    No Data Available
                  </p>
                </div>
              ) : (
                <GridPremiumCarList1
                  data={data}
                  error={error}
                  refetch={refetch}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default PremiumCarList;
