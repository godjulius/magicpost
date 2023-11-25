import React, { useState } from "react";
import { Link } from "react-router-dom"
const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`w-full bg-gray-100 py-5 px-6 sm:hidden`}>
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-gray-500 text-3xl font-semibold uppercase hover:text-gray-700"
        >
          <img src="./asset/Logo.png" alt="LOGO" className="h-8"></img>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-3xl focus:outline-none"
        >
          <i
            style={{ display: !isOpen ? "block" : "none" }}
            className="fas fa-bars"
          ></i>
          <i
            style={{ display: isOpen ? "block" : "none" }}
            className="fas fa-times"
          ></i>
        </button>
      </div>

      {/* Dropdown Nav */}
      <nav className={`flex flex-col pt-4 ${isOpen ? "flex" : "hidden"}`}>
        <Link
          to="/admin/Dashboard"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </Link>
        <Link
          to="/admin/AccountManagement"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
        >
          <i className="fas fa-table mr-3"></i>
          Tables
        </Link>
        <Link
          to="/admin/PaymentForm"
          className="flex items-center text-white py-2 pl-4 nav-item"
        >
          <i className="fas fa-align-left mr-3"></i>
          Blank Page
        </Link>
        {/* Thêm các mục nav khác tương tự ở đây */}
        {/* <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
        </button> */}
      </nav>
    </header>
  );
};

export default MobileHeader;
