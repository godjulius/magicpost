import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AccountManagement from "./AccountManagement";
import Dashboard from "./Dashboard";
import CreateAccount from "../CreateAccount/createAccount.js";
import "./admin.css";
import DesktopHeader from "./DesktopHeader.js";
import MobileHeader from "./MobileHeader.js";
import PaymentForm from "./paymentForm.js";

const Admin = () => {
  const navigate = useNavigate();
  var UserRole = "null";

  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Lấy thông tin từ localStorage
    const tempUserRole = localStorage.getItem("userRole");
    const branchId = localStorage.getItem("branchId");

    UserRole = tempUserRole;

    // Sử dụng thông tin ở đây, ví dụ:
    console.log("UserRole:", UserRole);
    console.log("TempUserRole:", tempUserRole);
    console.log("BranchId:", branchId);

    if (UserRole === "null") {
      navigate("/SignIn");
    }

    // Ghi chú: Kiểm tra xem giá trị có tồn tại hay không trước khi sử dụng để tránh lỗi
  }, []); // useEffect sẽ chạy sau khi component được render

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar onTabChange={handleTabChange} />
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

export default Admin;
