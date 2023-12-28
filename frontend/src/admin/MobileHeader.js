import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const MobileHeader = ({ featuresPath, featuresName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };
  return (
    <header className={`w-full bg-gray-100 py-5 px-6 sm:hidden`}>
      <div className="flex items-center justify-between h-8">
        <Link
          to="/"
          className="text-gray-500 text-3xl font-semibold uppercase hover:text-gray-700"
        >
          <img
            src="../asset/Logo.png"
            alt="LOGO"
            className="h-12 py-0 px-0"
          ></img>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 text-3xl focus:outline-none"
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
        {featuresPath.map((feature, index) => {
          return (
            <Link
              key={index}
              to={`${feature}`}
              className="flex items-center text-gray-600 opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-th-list mr-2"></i>
              {featuresName[index]}
            </Link>
          );
        })}
        <div
          onClick={handleClick}
          className="block px-4 py-2 account-link hover:bg-gray-300"
        >
          <i className="fas fa-sign-out mr-2"></i>
          Sign Out
        </div>
      </nav>
    </header>
  );
};

export default MobileHeader;
