import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Slideshow from "./slideShow/slideShow.js";
import LookupPostal from "./lookupPostal/lookupPostal.js";
import TopHeader from "./topHeader/topHeader.js";
import BotHeader from "./botHeader/botHeader.js";
import SignIn from "./signIn/SignIn.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<>
<TopHeader />
<BotHeader />
<Slideshow />
<LookupPostal />
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import reportWebVitals from './reportWebVitals';

