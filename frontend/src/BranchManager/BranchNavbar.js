// BranchNav.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BranchNav = ({ onTabChange }) => {
  const [currentTab, setCurrentTab] = useState("");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  return (
    <aside className="relative bg-gray-100 h-screen w-64 hidden sm:block shadow-xl">
      <div className="">
        <Link
          to="/"
          className="text-gray-600 text-3xl font-semibold uppercase hover:text-gray-300"
        >
          <img
            src="../asset/Logo.png"
            alt="LOGO"
            className="h-16 mx-auto"
          ></img>
        </Link>
      </div>
      <nav className="text-gray-600 text-base font-semibold pt-3">
        <Link
          to="/BranchManager/Dashboard"
          onClick={() => handleTabClick("Dashboard")}
          className={`flex items-center ${
            currentTab === "Dashboard" ? "active-nav-item" : "nav-item"
          } text-gray-600 py-4 pl-4 nav-item w-full ${
            currentTab === "Dashboard" ? "bg-gray-300" : "hover:bg-gray-300"
          }`}
        >
          <i className="fas fa-table mr-2"></i>
          Dash Board
        </Link>
        <Link
          to="/BranchManager/BranchEmployeeManagement"
          onClick={() => handleTabClick("employeeManagement")}
          className={`flex items-center ${
            currentTab === "employeeManagement" ? "active-nav-item" : "nav-item"
          } text-gray-600 py-4 pl-4 nav-item w-full ${
            currentTab === "employeeManagement"
              ? "bg-gray-300"
              : "hover:bg-gray-300"
          }`}
        >
          <i className="fas fa-table mr-2"></i>
          Employee Management
        </Link>
      </nav>
    </aside>
  );
};

export default BranchNav;
