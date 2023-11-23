// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onTabChange }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  return (
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <Link to="/admin/Dashboard" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</Link>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <Link
          to="/admin/Dashboard"
          onClick={() => handleTabClick('dashboard')}
          className={`flex items-center ${currentTab === 'dashboard' ? 'active-nav-link' : 'nav-item'} text-white py-4 pl-4 nav-item w-full ${currentTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <i className="fas fa-tachometer-alt mr-2"></i>
          Dashboard
        </Link>
        <Link
          to="/admin/AccountManagement"
          onClick={() => handleTabClick('accountManagement')}
          className={`flex items-center ${currentTab === 'accountManagement' ? 'active-nav-item' : 'nav-item'} text-white py-4 pl-4 nav-item w-full ${currentTab === 'accountManagement' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Account Management
        </Link>
        <Link
          to="/admin/PaymentForm"
          onClick={() => handleTabClick('paymentForm')}
          className={`flex items-center ${currentTab === 'paymentForm' ? 'active-nav-item' : 'nav-item'} text-white py-4 pl-4 nav-item w-full ${currentTab === 'paymentForm' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <i className="fas fa-align-left mr-3"></i>
          Payment Form
        </Link>
      </nav>
    </aside>
  );
};

export default Navbar;
