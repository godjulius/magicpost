import Layout from "./LandingPage/Layout/Layout.js";
import Admin from "./admin/admin.js";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import SignIn from "./signIn/SignIn.js";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      <Outlet />
    </>
  );
}
