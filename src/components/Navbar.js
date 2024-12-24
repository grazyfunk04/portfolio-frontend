import React, { useState, useEffect } from 'react';
import { getStocks } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import StockForm from '../components/StockForm';
import LiveStocks from './LiveStocks';
import image from '../image.png'

const Navbar = ({ setIsLoggedIn }) => {
  const [stocks, setStocks] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    refreshStocks();
  }, []);

  const refreshStocks = () => {
    getStocks().then((response) => setStocks(response.data));
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Stock Form':
        return <StockForm onSubmit={refreshStocks} />;
      case 'Live Stocks':
        return <LiveStocks />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="flex items-center p-2 justify-center">
          <img src={image} width={140} height={140}/>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'Poppins'}}>Stocks Byte</h1>
      </div>
      <div className="w-full">
        <nav className="flex justify-evenly space-x-6 py-4 bg-gray-100 shadow-md">
          <div
            className={`relative px-4 py-2 font-semibold cursor-pointer transition duration-200 inline-flex items-center text-xl ${
              activeTab === 'Dashboard'
                ? 'text-blue-500 after:absolute after:w-full after:h-1 after:bg-blue-500 after:bottom-0 after:left-0'
                : 'text-gray-600 hover:text-gray-800 hover:after:absolute hover:after:w-full hover:after:h-1 hover:after:bg-gray-300 hover:after:bottom-0 hover:after:left-0'
            }`}
            onClick={() => setActiveTab('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`relative px-4 py-2 font-semibold cursor-pointer transition duration-200 inline-flex items-center text-xl ${
              activeTab === 'Stock Form'
                ? 'text-blue-500 after:absolute after:w-full after:h-1 after:bg-blue-500 after:bottom-0 after:left-0'
                : 'text-gray-600 hover:text-gray-800 hover:after:absolute hover:after:w-full hover:after:h-1 hover:after:bg-gray-300 hover:after:bottom-0 hover:after:left-0'
            }`}
            onClick={() => setActiveTab('Stock Form')}
          >
            Stock Form
          </div>
          <div
            className={`relative px-4 py-2 font-semibold cursor-pointer transition duration-200 inline-flex items-center text-xl ${
              activeTab === 'Live Stocks'
                ? 'text-blue-500 after:absolute after:w-full after:h-1 after:bg-blue-500 after:bottom-0 after:left-0'
                : 'text-gray-600 hover:text-gray-800 hover:after:absolute hover:after:w-full hover:after:h-1 hover:after:bg-gray-300 hover:after:bottom-0 hover:after:left-0'
            }`}
            onClick={() => setActiveTab('Live Stocks')}
          >
            Live Stocks <span className="ml-2 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <main className="p-6">{renderContent()}</main>
      </div>
    </>
  );
};

export default Navbar;
