// Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ onTabChange }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  return (
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a href="#" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <button
          onClick={() => handleTabClick('dashboard')}
          className={`flex items-center ${currentTab === 'dashboard' ? 'active-nav-link' : 'nav-item'} text-white py-4 pl-4 nav-item w-full ${currentTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <i className="fas fa-tachometer-alt mr-2"></i>
          Dashboard
        </button>
        <button
          onClick={() => handleTabClick('accountManagement')}
          className={`flex items-center ${currentTab === 'accountManagement' ? 'active-nav-item' : 'nav-item'} text-white py-4 pl-4 nav-item w-full ${currentTab === 'accountManagement' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <i className="fas fa-table mr-2"></i>
          Account Management
        </button>
      </nav>
    </aside>
  );
};

export default Navbar;
