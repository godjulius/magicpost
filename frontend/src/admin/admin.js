import React, { useState } from 'react';
import Navbar from './Navbar';
import AccountManagement from './AccountManagement';
import Dashboard from './Dashboard';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar onTabChange={handleTabChange} />
      <div className="relative w-full flex flex-col h-screen overflow-y-auto">
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
