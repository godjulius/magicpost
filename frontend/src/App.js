import Layout from "./LandingPage/Layout/Layout.js";
import SearchPage from "./LandingPage/Layout/SearchPage.js";
import Admin from "./admin/admin.js";
import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";
import SignIn from "./signIn/SignIn.js";

import AccountManagement from "./admin/AccountManagement";
import BranchManagement from "./admin/BranchManagement.js";
import Dashboard from "./admin/Dashboard";
import CreateAccount from "./CreateAccount/createAccount.js";
import CreateBranch from "./admin/CreateBranch.js";

import BranchManager from "./BranchManager/BranchManager.js";
import BranchDashboard from "./BranchManager/BranchDashboard.js";
import BranchCreateAccount from "./BranchManager/BranchCreateAccount.js";
import BranchEmployeeManagement from "./BranchManager/BranchEmployeeManagement.js";

import BranchEmployee from "./BranchEmployee/BranchEmployee.js";
import BranchPaymentForm from "./BranchEmployee/BranchPaymentForm.js";
import BranchOrderManagement from "./BranchEmployee/BranchOrderManagement.js";
import BranchCurrentOrder from "./BranchEmployee/BranchCurrentOrder.js";
import BranchTransshipment from "./BranchEmployee/BranchTransshipment.js";
import BranchOrderStatistics from "./BranchEmployee/BranchOrderStatistics.js";

import HubManager from "./HubManager/HubManager.js";
import HubDashboard from "./HubManager/HubDashboard.js";
import HubCreateAccount from "./HubManager/HubCreateAccount.js";
import HubEmployeeManagement from "./HubManager/HubEmployeeManagement.js";

import HubEmployee from "./HubEmployee/HubEmployee.js";
import HubOrderManagement from "./HubEmployee/HubOrderManagement.js";
import HubCurrentOrder from "./HubEmployee/HubCurrentOrder.js";
import HubTransshipment from "./HubEmployee/HubTransshipment.js";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SearchPage" element={<SearchPage />}></Route>
        <Route path="/SearchPage/:id" element={<SearchPage />}></Route>
        <Route path="/admin/*" element={<Admin />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="AccountManagement" element={<AccountManagement />} />
          <Route path="CreateAccount" element={<CreateAccount />} />
          <Route path="BranchManagement" element={<BranchManagement />} />
          <Route path="CreateBranch" element={<CreateBranch />} />
        </Route>
        <Route path="/BranchManager/*" element={<BranchManager />}>
          <Route path="Dashboard" element={<BranchDashboard />} />
          <Route
            path="BranchEmployeeManagement"
            element={<BranchEmployeeManagement />}
          />
          <Route path="BranchCreateAccount" element={<BranchCreateAccount />} />
        </Route>
        <Route path="/BranchEmployee/*" element={<BranchEmployee />}>
          <Route path="BranchPaymentForm" element={<BranchPaymentForm />} />
          <Route
            path="BranchOrderManagement"
            element={<BranchOrderManagement />}
          />
          <Route path="BranchCurrentOrder" element={<BranchCurrentOrder />} />
          <Route
            path="BranchTransshipment/:orderId"
            element={<BranchTransshipment />}
          />
          <Route
            path="BranchOrderStatistics"
            element={<BranchOrderStatistics />}
          />
        </Route>
        <Route path="/HubManager/*" element={<HubManager />}>
          <Route path="Dashboard" element={<HubDashboard />} />
          <Route
            path="HubEmployeeManagement"
            element={<HubEmployeeManagement />}
          />
          <Route path="HubCreateAccount" element={<HubCreateAccount />} />
        </Route>
        <Route path="/HubEmployee/*" element={<HubEmployee />}>
          <Route path="HubOrderManagement" element={<HubOrderManagement />} />
          <Route path="HubCurrentOrder" element={<HubCurrentOrder />} />
          <Route
            path="HubTransshipment/:orderId"
            element={<HubTransshipment />}
          />
        </Route>
      </Routes>
    </>
  );
}
