import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getDashboard } from '../services/api';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PortfolioDashboard = () => {
  const [distributionData, setDistributionData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((response) => {
        setMetrics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard metrics:', error);
        setLoading(false);
      });
  }, []);

  // Map portfolio distribution data to an array of objects with ticker and percentage
  useEffect(() => {
    if (metrics.portfolioDistribution) {
      const mappedData = Object.keys(metrics.portfolioDistribution).map(ticker => ({
        ticker,
        percentage: metrics.portfolioDistribution[ticker],
      }));
      setDistributionData(mappedData);
    }
  }, [metrics]);

  const pieChartColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", 
    "#66B3FF", "#FFB3E6", "#99FF99", "#FF6666", "#4B0082", "#00FF7F", 
    "#FFD700", "#800080", "#A52A2A", "#FF6347", "#D2691E", "#F0E68C", 
    "#00CED1", "#ADFF2F", "#FF1493", "#00008B", "#8A2BE2", "#7FFF00", 
    "#FF4500", "#F0F8FF", "#808000", "#F08080", "#E0FFFF", "#FA8072", 
    "#D3D3D3", "#2E8B57", "#98FB98", "#8B0000", "#B22222", "#DAA520", 
    "#7CFC00", "#D3D3D3", "#FFFACD", "#00FFFF", "#32CD32", "#FF8C00", 
    "#F4A460", "#556B2F", "#FF69B4", "#800000", "#B0C4DE", "#FFDAB9", 
    "#DCDCDC", "#F5FFFA"
  ];

  const chartData = {
    labels: distributionData.map(stock => stock.ticker),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: distributionData.map(stock => stock.percentage),
        backgroundColor: pieChartColors.slice(0, distributionData.length), // Limit the colors to the number of stocks
        hoverBackgroundColor: pieChartColors.slice(0, distributionData.length), // Same for hover effect
      },
    ],
  };

  const barChartData = {
    labels: distributionData.map(stock => stock.ticker),
    datasets: [
      {
        label: 'Percentage Distribution',
        data: distributionData.map(stock => stock.percentage),
        backgroundColor: pieChartColors.slice(0, distributionData.length),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || '';
            if (label) {
              label += ': ' + context.raw + '%';
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Distribution</h2>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pie Chart</h3>
            <Pie data={chartData} options={chartOptions} />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Bar Chart</h3>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDashboard;
