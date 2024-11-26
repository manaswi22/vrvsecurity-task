import React, { useState } from "react";
import UserTable from "../components/Usermanagement/UserTable";
import RoleTable from "../components/RoleManagement/RoleTable";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Import XIcon for close button

function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state for mobile view

  // Handle Tab Change and close sidebar on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // On mobile, close the sidebar after tab change
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false); // Close the sidebar after tab change on mobile
    }
  };

  // Toggle Sidebar for Mobile View
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar on mobile
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Overlay */}
      <div
        className={`fixed z-30 inset-0 bg-gray-800 bg-opacity-50 sm:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside on mobile
      ></div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 sm:block fixed top-0 left-0 h-full p-6 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`} // Sidebar open/close animation
      >
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          {/* Button for User Management */}
          <button
            className={`text-xl font-semibold py-2 px-4 rounded ${
              activeTab === "users" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabChange("users")} // Change to User Management tab
          >
            User Management
          </button>
          {/* Button for Role Management */}
          <button
            className={`text-xl font-semibold py-2 px-4 rounded ${
              activeTab === "roles" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabChange("roles")} // Change to Role Management tab
          >
            Role Management
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-100 p-6 ml-0 sm:ml-64 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : ""
        } overflow-y-auto`} // Main content adjusts based on sidebar state
      >
        <div className="flex justify-between items-center mb-6">
          {/* Mobile Hamburger Button */}
          <button
            className="sm:hidden text-2xl text-gray-800"
            onClick={toggleSidebar} // Toggle sidebar open/close on mobile
          >
            {isSidebarOpen ? (
              <XIcon className="h-6 w-6" /> // Show Close icon when sidebar is open
            ) : (
              <MenuIcon className="h-6 w-6" /> // Show Menu icon when sidebar is closed
            )}
          </button>
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {activeTab === "users" ? <UserTable /> : <RoleTable />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
