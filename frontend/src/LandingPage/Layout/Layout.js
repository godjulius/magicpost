import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "../Hero.js";
import Feature from "../Feature.js";
import Pricing from "../Pricing.js";
import SearchBar from "../SearchBar.js";
import SearchBarLandingPage from "../SearchBarLandingPage.js";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
  const navigate = useNavigate();

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
      <SearchBarLandingPage />
      <Feature />
      <Pricing />
      {/* {children} */}
      <Footer />
    </>
  );
};

export default Layout;
