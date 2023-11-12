import React from "react";

const ButtonOutline = ({ children }) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange_cus-500 text-orange_cus-500 bg-white_cus-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange_cus-500 hover:text-white_cus-500 transition-all hover:shadow-orange ">
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;
