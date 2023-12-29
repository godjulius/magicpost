import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "../Hero.js";
import Feature from "../Feature.js";
import Pricing from "../Pricing.js";
import SearchBar from "../SearchBar.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onChangeOrderId = function (event){
    setOrderId(event.target.value);
  }
  const handleSubmit = function (event) {
    navigate(`SearchPage/${orderId}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getData", {
          withCredentials: true,
        });

        if (response.data === "No data") {
          setIsLoggedIn(false);
        }
        else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isLoggedIn]); // useEffect sẽ chạy sau khi component được render

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <Hero />
      <SearchBar handleSubmit={handleSubmit} onChangeOrderId={onChangeOrderId}/>
      <Feature />
      <Pricing />
      {/* {children} */}
      <Footer />
    </>
  );
};

export default Layout;
