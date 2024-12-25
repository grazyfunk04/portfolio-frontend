import React, { useEffect, useState } from "react";
import { getStocks } from "../services/api";
import axios from "axios";
import StockManager from "./StockData";

const Portfolio = () => {
    const [portfolioStocks, setPortfolioStocks] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            const response = await getStocks();
            const randomStocks = response.data
                .sort(() => 0.5 - Math.random())
                .slice(0, 5);
            const updatedStocks = await Promise.all(
                randomStocks.map(async (stock) => {
                    const price = await fetchStockPrice(stock.ticker);
                    return { ...stock, price };
                })
            );
            setPortfolioStocks(updatedStocks);
            calculateTotalValue(updatedStocks);
        } catch (error) {
            console.error("Error loading portfolio:", error);
        }
    };

    const fetchStockPrice = async (ticker) => {
        try {
            const options = {
                method: "GET",
                url: `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?symbol=${ticker}`,
                headers: {
                    "X-RapidAPI-Key": "a9f74e8f90msh2f8b94c5ff40d9ap10ea68jsn2b7f60ca0a2c",
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

    const calculateTotalValue = (stocks) => {
        const total = stocks.reduce((acc, stock) => acc + parseFloat(stock.price || 0), 0);
        setTotalValue(total.toFixed(2));
    };

    const calculateGainLoss = (buyPrice, marketPrice, quantity) => {
        if(marketPrice == 0){
            return {
                gainLoss: 0,
                color: "text-gray-500",
                sign: "-",
            }
        }
        const gainLoss = marketPrice - buyPrice;
        const isGain = gainLoss > 0;
        return {
            gainLoss: gainLoss.toFixed(2) * quantity,
            color: isGain ? "text-green-500" : "text-red-500",
            sign: isGain ? "+" : "-",
        };
    };

    let totalGainLoss = 0;

    return (
        <div className="gap-6 p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">My Portfolio</h2>
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700 m-8">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Ticker</th>
                            <th className="px-4 py-2">Market Price</th>
                            <th className="px-4 py-2">Buy Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Gain/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioStocks.map((stock) => {
                            const { gainLoss, color, sign } = calculateGainLoss(stock.buyPrice, stock.price, stock.quantity);
                            totalGainLoss += gainLoss;
                            return (
                                <tr
                                    key={stock.id}
                                    className="border-b hover:bg-gray-50 transition-all duration-200 h-24 font-semibold"
                                >
                                    <td className="px-4 py-2">{stock.name}</td>
                                    <td className="px-4 py-2">{stock.ticker}</td>
                                    <td className="px-4 py-2">$ {stock.price}</td>
                                    <td className="px-4 py-2">$ {stock.buyPrice}</td>
                                    <td className="px-4 py-2">{stock.quantity}</td>
                                    <td className={`px-4 py-2 ${color}`}>
                                        {gainLoss == 0 ? "-" : `${sign} $ ${gainLoss > 0 ? gainLoss : (-1*gainLoss)}`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-around items-center">
                <div className="mt-6 text-lg font-semibold">
                    Total Portfolio Value: $ {totalValue}
                </div>
                <div className={`mt-6 text-lg font-semibold ${totalGainLoss > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {totalGainLoss > 0 ? `Total Gain: $ ${totalGainLoss}` : `Total Loss: $ ${totalGainLoss}`}
                </div>
            </div>
        </div>
    );
};

const LiveStocks = () => {
    const [currentTab, setCurrentTab] = useState("manage");

    return (
        <div className="gap-6 p-6 min-h-screen">
            <div className="flex justify-around mb-6">
                <button
                    onClick={() => setCurrentTab("manage")}
                    className={`px-4 py-2 rounded ${currentTab === "manage"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                >
                    My Holdings
                </button>
                <button
                    onClick={() => setCurrentTab("portfolio")}
                    className={`px-4 py-2 rounded ${currentTab === "portfolio"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                >
                    My Portfolio
                </button>
            </div>

            {currentTab === "manage" ? (
                <div>
                    <StockManager />
                </div>
            ) : (
                <Portfolio />
            )}
        </div>
    );
};

export default LiveStocks;
