// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BranchENavbar = ({ onTabChange }) => {
  const [currentTab, setCurrentTab] = useState('');

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  return (
    <aside className="relative bg-gray-100 h-screen w-64 hidden sm:block shadow-xl">
      <div className="">
        <Link to="/" className="text-gray-600 text-3xl font-semibold uppercase hover:text-gray-300">
          <img src="../asset/Logo.png" alt="LOGO" className="h-16 mx-auto"></img>
        </Link>
      </div>
      <nav className="text-gray-600 text-base font-semibold pt-3">
        <Link
          to="/BranchEmployee/BranchPaymentForm"
          onClick={() => handleTabClick('branchPaymentForm')}
          className={`flex items-center ${currentTab === 'branchPaymentForm' ? 'active-nav-item' : 'nav-item'} text-gray-600 py-4 pl-4 nav-item w-full ${currentTab === 'branchPaymentForm' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Payment Form
        </Link>
        <Link
          to="/BranchEmployee/BranchOrderManagement"
          onClick={() => handleTabClick('branchOrderManagement')}
          className={`flex items-center ${currentTab === 'branchOrderManagement' ? 'active-nav-item' : 'nav-item'} text-gray-600 py-4 pl-4 nav-item w-full ${currentTab === 'branchOrderManagement' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Order Management
        </Link>
        <Link
          to="/BranchEmployee/BranchCurrentOrder"
          onClick={() => handleTabClick('branchCurrentOrder')}
          className={`flex items-center ${currentTab === 'branchCurrentOrder' ? 'active-nav-item' : 'nav-item'} text-gray-600 py-4 pl-4 nav-item w-full ${currentTab === 'branchCurrentOrder' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Current Order
        </Link>
        <Link
          to="/BranchEmployee/BranchOrderStatistics"
          onClick={() => handleTabClick('branchOrderStatistics')}
          className={`flex items-center ${currentTab === 'branchOrderStatistics' ? 'active-nav-item' : 'nav-item'} text-gray-600 py-4 pl-4 nav-item w-full ${currentTab === 'branchOrderStatistics' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Order Statistics
        </Link>
      </nav>
    </aside>
  );
};

export default BranchENavbar;
