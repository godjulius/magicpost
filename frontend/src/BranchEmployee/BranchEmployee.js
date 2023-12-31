import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import BranchENavbar from "./BranchENavbar.js";
import axios from "axios";

import "../admin/admin.css";
import DesktopHeader from "../admin/DesktopHeader.js";
import MobileHeader from "../admin/MobileHeader.js";

const featuresName = [
  "Payment Form",
  "Order Management",
  "Current Order",
  "Order Statistics",
];
const featuresPath = [
  "/BranchEmployee/BranchPaymentForm",
  "/BranchEmployee/BranchOrderManagement",
  "/BranchEmployee/BranchCurrentOrder",
  "/BranchEmployee/BranchOrderStatistics",
];

const BranchEmployee = () => {
  var UserRole = "null";

  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getData", {
          withCredentials: true,
        });

        if (response.data === "No data" || response.data.roleId !== 6) {
          navigate("/SignIn");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // useEffect sẽ chạy sau khi component được render

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <BranchENavbar onTabChange={handleTabChange} />
      <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
        <DesktopHeader />
        <MobileHeader featuresPath={featuresPath} featuresName={featuresName} />

        <Outlet />
      </div>
    </div>
  );
};

export default BranchEmployee;
