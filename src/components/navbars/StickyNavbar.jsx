/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

import {
  Navbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Collapse,
  MenuHandler,
  ListItem,
  Menu,
} from "@material-tailwind/react";
// import { FaUser  } from 'react-icons/fa'; // Import the icon you want to use
import PersonOutline from '@mui/icons-material/PersonOutline';


import { Link, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

import Profile from "../Profile/Profile";
import logo from "../../assets/logo1.png";
import logo2 from "../../assets/ui/ucdap.png"
import logo3 from "../../assets/ui/UCDAP_white.png"
import underline from "../../assets/Home_undrline.png";
import { jwtDecode } from "jwt-decode";
import { ChevronDownIcon } from "@heroicons/react/24/solid";  
import cartechlogo2 from "/cars/cartechlogo2.png";

///////////////
export function StickyNavbar() {
  const location = useLocation();

// New code for the home page start here 
  const [showNavbar, setShowNavbar] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
const [activeTab, setActiveTab] = useState("Home");
const [scrolled, setScrolled] = useState(false); // <-- add this line

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);

    // Set scrolled state for home page background
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

// Set active tab based on current route
useEffect(() => {
  const path = location.pathname;
  if (path === "/") {
    setActiveTab("Home");
  } else if (path === "/PremiumCarList") {
    setActiveTab("Premium Cars");
  } else if (path === "/carlist") {
    setActiveTab("Buy Car");
  } else if (path.includes("/admin") || path.includes("/dealer") || path.includes("/inspector") || path.includes("/sales") || path.includes("/user")) {
    setActiveTab("Dashboard");
  } else {
    // Clear active tab for other pages like login/register
    setActiveTab("");
  }
}, [location.pathname]);

// New code for the home page end here 

  const [openNav, setOpenNav] = useState(false);

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  // eslint-disable-next-line no-unused-vars

  const DealerId = token ? jwtDecodes?.dealerId : null;
  // const userid = token ? jwtDecodes?.userId : null;
  const InspectorProfileId = token ? jwtDecodes?.inspectorProfileId : null;

  const salesPersonId = token ? jwtDecodes?.salesPersonId : null;

  const UserId = token ? jwtDecodes?.userId : null;
  const userProfileId = token ? jwtDecodes?.userProfileId : null;

  const handleMenuItemClick = () => {
    setOpenNav(false);
  };

  // Function to get dashboard path based on user role
  const getDashboardPath = () => {
    if (!userRole) return "/";
    
    switch (userRole) {
      case "ADMIN":
        return "/admin";
      case "DEALER":
        return `/dealer/${jwtDecodes?.dealerId}`;
      case "USER":
        return `/user/${jwtDecodes?.userId}`;
      case "INSPECTOR":
        return "/inspector/car";
      case "SALESPERSON":
        return "/sales/salesDealers";
      default:
        return "/";
    }
  };

  const active = location.pathname === `/dealer/${jwtDecodes?.dealerId}`;
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navListMenuItems = [];

    // ADMIN Role Dashboard Items
    if (userRole === "ADMIN") {
      navListMenuItems.push(
        { title: "Dashboard", link: `/` },
        { title: "Dealers", link: "/admin" },
        { title: "Inspectors", link: "/inspector" },
        { title: "Seller", link: "/admin/salesuser" },
        { title: "Car Models", link: "/carlistmodel" },
        { title: "Car Colors", link: "/admin/addcolor" },
        { title: "Premium Car List", link: "/carlistadmin" },
        { title: "B2B Cars", link: "/adminB2B" },
        { title: "Bidding Car", link: "/admin/biddingcar" }
      );
    }

    // DEALER Role Dashboard Items
    if (userRole === "DEALER") {
      navListMenuItems.push(
        { title: "Car", link: `/dealer/${jwtDecodes?.dealerId}` },
        { title: "Premium Cars", link: `/dealer/premium/${jwtDecodes?.dealerId}` },
        { title: "B2B", link: `/dealer/B2B` },
        { title: "Live Cars", link: "/dealer/live/cars" },
        { title: "Winner Section", link: `/dealer/winnersection` },
        { title: "Bidding Car", link: "/dealer/biddingcar" },
        { title: "Pending Request", link: `/dealer/${jwtDecodes?.dealerId}/allpending` },
        { title: "B2B Pending Booking", link: `/dealer/${jwtDecodes?.dealerId}/b2bpending` },
        { title: "Confirm Booking", link: `/dealer/${jwtDecodes?.dealerId}/booking/confirm` },
        { title: "B2B Confirm Booking", link: `/dealer/${jwtDecodes?.dealerId}/b2b/confirm` }
      );
    }

    // USER Role Dashboard Items
    if (userRole === "USER") {
      navListMenuItems.push(
        { title: "Car", link: `/user/${jwtDecodes?.userId}` },
        { title: "Sell Car", link: `/sellcarlist` },
        { title: "All Request", link: `/pendinrequest/${jwtDecodes?.userId}` },
        { title: "Favourite", link: `/user/${jwtDecodes?.userId}/favorite` }
      );
    }

    // INSPECTOR Role Dashboard Items
    if (userRole === "INSPECTOR") {
      navListMenuItems.push(
        { title: "Car", link: `/inspector/car` },
        { title: "User Cars", link: `/inspector/user/cars` }
      );
    }

    // SALESPERSON Role Dashboard Items
    if (userRole === "SALESPERSON") {
      navListMenuItems.push(
        { title: "Car", link: "/sales/salesDealers" },
        { title: "User Cars", link: `/seller/request/active` },
        { title: "B2B", link: `/Seller/b2b/pending` },
        { title: "Bidding Car", link: "/sales/biddingcar" }
      );
    }
    const renderItems = navListMenuItems.map(({ title, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-normal text-white"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-[#50d71e]`}
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                Dashboard
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform sm:block ${isMenuOpen ? "rotate-180" : ""
                    }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform sm:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl sm:block bg-[#000] border-none">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 outline-none outline-0 min-w-[350px]">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <div className="block sm:hidden">
          <Collapse open={isMobileMenuOpen}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 outline-none outline-0 min-w-[250px]">
              {renderItems}
            </ul>
          </Collapse>
        </div>
      </React.Fragment>
    );
  }
  // Removed PendingListMenu and ConfermListMenu functions - consolidated into NavListMenu

  // Consolidated Dashboard Dropdown - All role-specific items are now in NavListMenu

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 640 && setOpenNav(false)
    );
    // if(location.pathname !== priv.location.pathname){
    //   window.scrollTo(0, 0);
    // }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 p-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/" ? "bg-[#5e67c7] text-white" : ""
            } hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Home
        </Typography>
      </Link>

      <Link to={"/PremiumCarList"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/PremiumCarList"
              ? "bg-[#5e67c7] text-white"
              : ""
            } hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Premium Cars
        </Typography>
      </Link>

      <Link to={"/carlist"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${window.location.pathname === "/carlist"
              ? "bg-[#5e67c7] text-white"
              : ""
            }hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Buy Car
        </Typography>
      </Link>

      {/* Consolidated Dashboard Dropdown for Logged In Users */}
      {token && <NavListMenu />}
    </ul>
  );

  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`w-full lg:h-[14vh] fixed top-0 left-0 z-50 transition-transform duration-300 ${
        isHomePage
          ? scrolled
            ? "bg-black/90 backdrop-blur-md"
            : "bg-white/10 backdrop-blur-md"
          : "bg-black/90 backdrop-blur-md"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex items-center justify-between px-1 sm:px-3 lg:px-8 py-2 sm:py-4 md:py-4 lg:py-3">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center justify-start pl-0 ml-0 gap-0 ">
          <div className="flex items-center gap-">
            <img src={logo} alt="Logo 1" className="w-20 h-18 object-contain" />
            <img 
              src={isHomePage ? logo3 : logo3} 
              alt={isHomePage ? "Logo 2" : "Logo 3"} 
              className="w-16 h-14 object-contain" 
            />
          </div>
          {/* <div className="text-white font-semibold  text-xs  md:hidden sm:text-sm text-center leading-tight">
            CARYANAM INDIA
          </div> */}
        </div>

        {/* Desktop and Tablet Navigation */}
        <div className="hidden sm:flex items-center gap-6 lg:gap-10 text-white">
          {[
            { label: "Home", path: "/" }, 
            { label: "Premium Cars", path: "/PremiumCarList" }, 
            { label: "Buy Car", path: "/carlist" }
          ].map(({ label, path }) => {  
            const isActive = activeTab === label;
            return (
              <div
                key={label}
                className="relative text-base md:text-lg lg:text-xl font-light font-['Roboto'] cursor-pointer flex flex-col items-center"
              >
                <Link 
                  to={path} 
                  onClick={() => setActiveTab(label)}
                  className="hover:text-gray-300 transition-colors"
                >
                  {label}
                </Link>
                {/* Underline only on md and up */}
                {isActive && (
                  <img
                    src={underline}
                    alt="underline"
                    className="hidden md:block absolute top-[30px] left-1/2 -translate-x-1/2 w-10 sm:w-14 lg:w-16 h-2 transition-all duration-300"
                  />
                )}
              </div>
            );
          })}
          
          {/* Dashboard Dropdown for Logged In Users */}
          {token && (
            <div className="relative text-base md:text-lg lg:text-xl font-light font-['Roboto'] cursor-pointer flex flex-col items-center">
              <NavListMenu />
            </div>
          )}
        </div>

        {/* Login/Register/Profile for sm and above */}
        <div className="hidden sm:flex items-center justify-center bg-white rounded-full px-4 py-1 shadow hover:scale-105 transition">
          {token ? (
            <Profile
              userId={UserId}
              dealer_id={DealerId}
              userrole={userRole}
              inspectorProfileId={InspectorProfileId}
              salesPersonId={salesPersonId}
              userProfileId={userProfileId}
            />
          ) : (
            <>
            <Link
              to="/signin"
              className="text-[#131C24] text-xs sm:text-sm md:text-base lg:text-lg font-medium font-['Roboto'] text-center hover:underline mr-1"
              onClick={() => setOpenNav && setOpenNav(false)}
            >
              Login
            </Link>
            /
            <Link
              to="/signup"
              className="text-[#131C24] text-xs sm:text-sm md:text-base lg:text-lg font-medium font-['Roboto'] text-center hover:underline ml-1"
              onClick={() => setOpenNav && setOpenNav(false)}
            >
              Register
            </Link>
          </>
          
          )}
        </div>

        {/* Hamburger for Mobile */}
        <div
          className="sm:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-50"
          onClick={() => setOpenNav(!openNav)}
        >
          {!openNav ? (
            <>
              <span className="h-0.5 w-full bg-white rounded"></span>
              <span className="h-0.5 w-full bg-white rounded"></span>
              <span className="h-0.5 w-full bg-white rounded"></span>
            </>
          ) : (
            <HiX className="text-white text-3xl" />
          )}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[75%] bg-[#131C24] text-white p-6 z-40 transition-transform duration-500 ease-in-out ${openNav ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col space-y-6 mt-24 text-lg">
          <Link to="/" onClick={() => setOpenNav(false)} className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/PremiumCarList" onClick={() => setOpenNav(false)} className="hover:text-gray-300">
            Premium Cars
          </Link>
          <Link to="/carlist" onClick={() => setOpenNav(false)} className="hover:text-gray-300">
            Buy Car
          </Link>
          {token && (
            <div className="space-y-2">
              <NavListMenu />
            </div>
          )}
          <div
            onClick={() => setOpenNav(false)}
            className="mt-6 inline-block bg-white text-[#131C24] text-center py-2 px-4 rounded-full shadow hover:scale-105 transition duration-300"
          >
            <span className="text-sm font-medium">
              {token ? (
                <Profile
                  userId={UserId}
                  dealer_id={DealerId}
                  userrole={userRole}
                  inspectorProfileId={InspectorProfileId}
                  salesPersonId={salesPersonId}
                  userProfileId={userProfileId}
                />
              ) : (
                <>
                  <Link to="/signin" className="hover:underline mr-1" onClick={() => setOpenNav(false)}>
                    Login
                  </Link>
                  /
                  <Link to="/signup" className="hover:underline ml-1" onClick={() => setOpenNav(false)}>
                    Register
                  </Link>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
