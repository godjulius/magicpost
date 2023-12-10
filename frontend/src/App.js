import Layout from "./LandingPage/Layout/Layout.js";
import Admin from "./admin/admin.js";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import SignIn from "./signIn/SignIn.js";

import PaymentForm from "./admin/paymentForm.js";
import AccountManagement from "./admin/AccountManagement";
import BranchManagement from "./admin/BranchManagement.js";
import Dashboard from "./admin/Dashboard";
import CreateAccount from "./CreateAccount/createAccount.js";

import BranchManager from "./BranchManager/BranchManager.js";
import BranchCreateAccount from "./BranchManager/BranchCreateAccount.js";
import BranchEmployeeManagement from "./BranchManager/BranchEmployeeManagement.js";

import HubManager from "./HubManager/HubManager.js";
import HubCreateAccount from "./HubManager/HubCreateAccount.js";
import HubEmployeeManagement from "./HubManager/HubEmployeeManagement.js";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route path="PaymentForm" element={<PaymentForm />} />
          <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="AccountManagement" element={<AccountManagement/>}/>
          <Route path="CreateAccount" element={<CreateAccount />} />
          <Route path="BranchManagement" element={<BranchManagement/>}/>
        </Route>
        <Route path="/BranchManager/*" element={<BranchManager />}>
          <Route path="BranchEmployeeManagement" element={<BranchEmployeeManagement/>}/>
          <Route path="BranchCreateAccount" element={<BranchCreateAccount />} />
        </Route>
        <Route path="/HubManager/*" element={<HubManager />}>
          <Route path="HubEmployeeManagement" element={<HubEmployeeManagement/>}/>
          <Route path="HubCreateAccount" element={<HubCreateAccount />} />
        </Route>
      </Routes>
    </>
  );
}
