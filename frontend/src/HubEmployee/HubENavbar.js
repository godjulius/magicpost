// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HubENavBar = ({ onTabChange }) => {
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
          to="/HubEmployee/HubOrderManagement"
          onClick={() => handleTabClick('hubOrderManagement')}
          className={`flex items-center ${currentTab === 'hubOrderManagement' ? 'active-nav-item' : 'nav-item'} text-gray-600 py-4 pl-4 nav-item w-full ${currentTab === 'hubOrderManagement' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Order Management
        </Link>
        <Link
          to="/HubEmployee/HubCurrentOrder"
          onClick={() => handleTabClick('hubCurrentOrder')}
          className={`flex items-center ${currentTab === 'hubCurrentOrder' ? 'active-nav-item' : 'nav-item'} text-gray-600 py-4 pl-4 nav-item w-full ${currentTab === 'hubCurrentOrder' ? 'bg-gray-300' : 'hover:bg-gray-300'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Current Order
        </Link>
      </nav>
      
    </aside>
  );
};

export default HubENavBar;
