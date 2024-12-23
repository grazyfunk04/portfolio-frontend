import React, { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import { getStocks } from '../services/api';
import PortfolioDashboard from './PortfolioDashboard';
import axios from 'axios';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  // eslint-disable-next-line
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [totalGainLoss, setTotalGainLoss] = useState(0);

  const fetchStockPrice = async (ticker) => {
    try {
      const options = {
        method: "GET",
        url: `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?symbol=${ticker}`,
        headers: {
          "X-RapidAPI-Key": "c4f5af5f13mshe6cce22e4efdf45p14312ajsnd24ce414a27e",
          "X-RapidAPI-Host": "yahoo-finance166.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      if (response.data && response.data.quoteSummary && response.data.quoteSummary.result && response.data.quoteSummary.result[0] && response.data.quoteSummary.result[0].price) {
        const regularMarketPrice = response.data.quoteSummary.result[0].price.regularMarketPrice.raw;
        return regularMarketPrice;
      } else {
        console.warn(`Warning: Price not found for ${ticker}`);
        return 0;
      }
    } catch (error) {
      console.error(`Error fetching stock price for ${ticker}:`, error.message);
      return 0;
    }
  };

  const calculateTotalGainLoss = async (stocks) => {
    let total = 0;
    
    const updatedStocks = await Promise.all(stocks.map(async (stock) => {
      const marketPrice = await fetchStockPrice(stock.ticker);
      const gainLoss = (marketPrice - stock.buyPrice) * stock.quantity;
      total += gainLoss;
      return { ...stock, marketPrice, gainLoss };
    }));

    setPortfolioStocks(updatedStocks);
    setTotalGainLoss(total);
  };

  // eslint-disable-next-line
  useEffect(() => {
    getDashboard()
      .then((response) => {
        setMetrics(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard metrics:', error);
      });

    getStocks()
      .then((response) => {
        // eslint-disable-next-line
        calculateTotalGainLoss(response.data);
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
      // eslint-disable-next-line
  }, []);

  const topPerformingStockName = metrics.topPerformingStock?.name || 'Not available';
  const totalValue = metrics.totalValue || 'Loading...';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Portfolio Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700">Total Value Spent</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">${totalValue}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700">Top Performing Stock</h2>
          <p className="text-xl text-gray-800 mt-2">{topPerformingStockName}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700">Total Gain or Loss</h2>
          <p className={`text-xl mt-2 ${totalGainLoss > 0 ? "text-green-500" : "text-red-500"}`}>${totalGainLoss}</p>
        </div>
      </div>

      <div className="mt-8">
        <PortfolioDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
