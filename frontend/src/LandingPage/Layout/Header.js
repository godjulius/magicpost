import React, { useState, useEffect } from "react";
// Import react scroll
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline.";
import { Link } from "react-router-dom";
const Header = ({ isLoggedIn }) => {
  const [activeLink, setActiveLink] = useState(null);
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
            <img src="../asset/Logo.png" className="h-20 w-auto"></img>
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black_cus-500  items-center">
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover_cus inline-block relative" +
                (activeLink === "about"
                  ? " text-orange_cus-500 animation-active_cus "
                  : " text-black_cus-500 hover:text-orange_cus-500 a")
              }
            >
              Giới thiệu
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="searchbar"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("searchbar");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover_cus inline-block relative" +
                (activeLink === "searchbar"
                  ? " text-orange_cus-500 animation-active_cus "
                  : " text-black_cus-500 hover:text-orange_cus-500 ")
              }
            >
              Tìm kiếm
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="feature"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("feature");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover_cus inline-block relative" +
                (activeLink === "feature"
                  ? " text-orange_cus-500 animation-active_cus "
                  : " text-black_cus-500 hover:text-orange_cus-500 ")
              }
            >
              Feature
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="dichvu"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("dichvu");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover_cus inline-block relative" +
                (activeLink === "dichvu"
                  ? " text-orange_cus-500 animation-active_cus "
                  : " text-black_cus-500 hover:text-orange_cus-500 ")
              }
            >
              Dịch vụ
            </LinkScroll>
          </ul>
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
              {/* <ButtonOutline>
                Sign In
            </ButtonOutline>
              <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                <img
                  src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                  alt="Profile"
                />
              </button> */}
            </Link>
          </div>
        </nav>
      </header>


      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white_cus-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black_cus-500">
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-orange_cus-500 text-orange_cus-500"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Giới thiệu
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="searchbar"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("searchbar");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "searchbar"
                  ? "  border-orange_cus-500 text-orange_cus-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              searchbar
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="feature"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("feature");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "feature"
                  ? "  border-orange_cus-500 text-orange_cus-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Feature
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="dichvu"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("dichvu");
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "dichvu"
                  ? "  border-orange_cus-500 text-orange_cus-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Price
            </LinkScroll>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
