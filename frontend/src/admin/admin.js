import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AccountManagement from "./AccountManagement";
import Dashboard from "./Dashboard";
import CreateAccount from "../CreateAccount/createAccount.js";
import "./admin.css";
import DesktopHeader from "./DesktopHeader.js";
import MobileHeader from "./MobileHeader.js";
const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar onTabChange={handleTabChange} />
      <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
        <DesktopHeader />
        <MobileHeader />
        
        <Routes >
          <Route path="/admin/Dashboard" element={<Dashboard/>}/>
          <Route path="/admin/AccountManagement" element={<AccountManagement/>}/>
          <Route path="/admin/CreateAccount" element={<CreateAccount />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
