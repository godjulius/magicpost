import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DesktopHeader = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout", {},{
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex shadow-lg">
      <div className="w-1/2"></div>
      <div className="relative w-1/2 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <img
            src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"
            alt="Profile"
          />
        </button>
        {isOpen && (
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
              {/* <a
                href="#"
                className="block px-4 py-2 account-link hover:bg-gray-300"
              >
                Account
              </a>
              <a
                href="#"
                className="block px-4 py-2 account-link hover:bg-gray-300"
              >
                Support
              </a> */}
              <div
                onClick={handleClick}
                className="block px-4 py-2 account-link hover:bg-gray-300"
              >
                Sign Out
              </div>

              {/* <a href="#" onClick={handleClick} className="block px-4 py-2 account-link hover:bg-gray-300"> */}
              {/* <Link to="/"> */}
              {/* </Link> */}
              {/* </a> */}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default DesktopHeader;
