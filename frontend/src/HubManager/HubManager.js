import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import HubNavbar from "./HubNavbar.js";
import axios from "axios";

import "../admin/admin.css";
import DesktopHeader from "../admin/DesktopHeader.js";
import MobileHeader from "../admin/MobileHeader.js";

const HubManager = () => {
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

        if (response.data === "No data"|| response.data.roleId !== 3) {
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
      <HubNavbar onTabChange={handleTabChange} />
      <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
        <DesktopHeader />
        <MobileHeader />

        <Routes>
          {/* comment đống dưới này thì bỏ comment cái <Outlet /> là được */}
          {/* <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="AccountManagement" element={<AccountManagement/>}/>
          <Route path="CreateAccount" element={<CreateAccount />} />
          <Route path="PaymentForm" element={<PaymentForm />}/> */}
        </Routes>

        <Outlet />
      </div>
    </div>
  );
};

export default HubManager;
