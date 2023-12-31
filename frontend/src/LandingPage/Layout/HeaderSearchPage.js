import React, { useState, useEffect } from "react";
import ButtonOutline from "../misc/ButtonOutline.";
import { Link } from "react-router-dom";
const HeaderSearchPage = ({ isLoggedIn }) => {
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 bg-white_cus-500 transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Link to="/">
              <img src="../asset/Logo.png" className="h-16 w-auto"></img>
            </Link>
          </div>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
          <Link to="/SignIn">
              {isLoggedIn ? (
                <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                    alt="Profile"
                  />
                </button>
              ) : (
                <ButtonOutline>Sign In</ButtonOutline>
              )}
            </Link>
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white_cus-500 sm:px-3">
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default HeaderSearchPage;
