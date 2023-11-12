import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "../Hero.js";
import Feature from "../Feature.js";
import Pricing from "../Pricing.js";
import SearchBar from "../SearchBar.js";
const Layout = ({ children }) => {
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
