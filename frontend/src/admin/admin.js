import React, { useState } from 'react';
import Navbar from './Navbar';
import AccountManagement from './AccountManagement';
import Dashboard from './Dashboard';
import "./admin.css"
import DesktopHeader from './DesktopHeader.js';
import MobileHeader from './MobileHeader.js';
const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar onTabChange={handleTabChange} />
      <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
        <DesktopHeader />
        <MobileHeader />
        {activeTab === 'dashboard' && (
          <div>
            <Dashboard />
          </div>
        )}
        {activeTab === 'accountManagement' && (
          <div>
            <AccountManagement />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
