import React from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

// Import existing components for different roles
import DealerDashboard from "./dealer/DealerDashboard";
import Admin from "./adminpages/Admin";
import Inspector from "./Inspector";
import SalesPerson from "./sales/SalesPerson";

export default function Dashboard() {
  const location = useLocation();
  const token = Cookies.get("token");
  const jwtDecodes = token ? jwtDecode(token) : null;
  const userRole = token ? jwtDecodes?.authorities[0] : null;

  // Function to get dashboard data based on user role
  const getDashboardData = () => {
    if (!userRole) return [];

    switch (userRole) {
      case "ADMIN":
        return [
          {
            label: "Dealers",
            value: "dealers",
            desc: <Admin />
          },
          {
            label: "Inspectors",
            value: "inspectors",
            desc: <div>Inspector Management</div>
          },
          {
            label: "Sales Person",
            value: "salesperson",
            desc: <div>Sales Person Management</div>
          },
          {
            label: "Car Models",
            value: "carmodels",
            desc: <div>Car Models Management</div>
          },
          {
            label: "Car Colors",
            value: "carcolors",
            desc: <div>Car Colors Management</div>
          },
          {
            label: "Premium Cars",
            value: "premiumcars",
            desc: <div>Premium Cars Management</div>
          },
          {
            label: "B2B Cars",
            value: "b2bcars",
            desc: <div>B2B Cars Management</div>
          },
          {
            label: "Bidding Cars",
            value: "biddingcars",
            desc: <div>Bidding Cars Management</div>
          }
        ];

      case "DEALER":
        return [
          {
            label: "My Cars",
            value: "mycars",
            desc: <div>My Cars Management</div>
          },
          {
            label: "Premium Cars",
            value: "premiumcars",
            desc: <div>Premium Cars Management</div>
          },
          {
            label: "B2B",
            value: "b2b",
            desc: <div>B2B Management</div>
          },
          {
            label: "Live Cars",
            value: "livecars",
            desc: <div>Live Cars Management</div>
          },
          {
            label: "Bidding Cars",
            value: "biddingcars",
            desc: <div>Bidding Cars Management</div>
          },
          {
            label: "Winner Section",
            value: "winnersection",
            desc: <div>Winner Section</div>
          },
          {
            label: "Pending Bookings",
            value: "pendingbookings",
            desc: <div>Pending Bookings Management</div>
          },
          {
            label: "Confirm Bookings",
            value: "confirmbookings",
            desc: <div>Confirm Bookings Management</div>
          }
        ];

      case "USER":
        return [
          {
            label: "Sell Car",
            value: "sellcar",
            desc: <div>Sell Car Management</div>
          },
          {
            label: "All Requests",
            value: "allrequests",
            desc: <div>All Requests Management</div>
          },
          {
            label: "Favourites",
            value: "favourites",
            desc: <div>Favourites Management</div>
          }
        ];

      case "INSPECTOR":
        return [
          {
            label: "Cars",
            value: "cars",
            desc: <Inspector />
          },
          {
            label: "User Cars",
            value: "usercars",
            desc: <div>User Cars Management</div>
          }
        ];

      case "SALESPERSON":
        return [
          {
            label: "Dealers",
            value: "dealers",
            desc: <SalesPerson />
          },
          {
            label: "User Cars",
            value: "usercars",
            desc: <div>User Cars Management</div>
          },
          {
            label: "B2B",
            value: "b2b",
            desc: <div>B2B Management</div>
          },
          {
            label: "Bidding Cars",
            value: "biddingcars",
            desc: <div>Bidding Cars Management</div>
          }
        ];

      default:
        return [];
    }
  };

  const dashboardData = getDashboardData();

  // If no token or no role, redirect to home
  if (!token || !userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please login to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userRole} Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Manage your account and activities here.
          </p>
        </div>

        {dashboardData.length > 0 ? (
          <Tabs value={dashboardData[0]?.value || "dashboard"}>
            <TabsHeader className="bg-white shadow-sm rounded-lg p-2 mb-6">
              {dashboardData.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-sm font-medium">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {dashboardData.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="bg-white rounded-lg shadow-sm p-6">
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Dashboard Available
            </h2>
            <p className="text-gray-600">
              Dashboard features are not available for your role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 