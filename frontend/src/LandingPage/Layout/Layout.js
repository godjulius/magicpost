import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "../Hero.js";
import Feature from "../Feature.js";
import Pricing from "../Pricing.js";
import SearchBar from "../SearchBar.js";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  // localStorage.setItem("userRole", null);
  // // console.log(typeof(localStorage.getItem("userRole")));
  // localStorage.setItem("branchId", null);
  // // console.log(typeof(localStorage.getItem("branchId")));
  // localStorage.setItem("employeeId", null);

  // useEffect(() => {
  //   // Lấy thông tin từ localStorage
  //   const tempUserRole = localStorage.getItem("userRole");
  //   const branchId = localStorage.getItem("branchId");
  //   const employeeId = localStorage.getItem("employeeId");

  //   // setUserRole(tempUserRole);

  //   // Sử dụng thông tin ở đây, ví dụ:
  //   console.log("UserRole:", tempUserRole);
  //   console.log("BranchId:", branchId);

  //   // Ghi chú: Kiểm tra xem giá trị có tồn tại hay không trước khi sử dụng để tránh lỗi
  // }, []); // useEffect sẽ chạy sau khi component được render

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getData", {
          withCredentials: true,
        });

        // if (response.data === "No data") {
        //   navigate("/SignIn");
        // }

      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchData();

  }, []); // useEffect sẽ chạy sau khi component được render

  return (
    <>
      <Header />
      <Hero />
      <SearchBar />
      <Feature />
      <Pricing />
      {/* {children} */}
      <Footer />
    </>
  );
};

export default Layout;
