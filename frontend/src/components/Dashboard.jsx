import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const Dashboard = ({ token }) => {
  const [summary, setSummary] = useState(null);
  const [monthlySales, setMonthlySales] = useState(null);
  const [topSelling, setTopSelling] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await axios.get('/api/reports/dashboard/summary', {
          headers: { 'x-auth-token': token },
        });
        setSummary(summaryRes.data);

        const monthlySalesRes = await axios.get('/api/reports/dashboard/monthly-sales', {
            headers: { 'x-auth-token': token },
        });
        setMonthlySales(monthlySalesRes.data);

        const topSellingRes = await axios.get('/api/reports/dashboard/top-selling', {
            headers: { 'x-auth-token': token },
        });
        setTopSelling(topSellingRes.data);

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  const monthlySalesData = {
    labels: monthlySales?.map(d => `${d._id.month}/${d._id.year}`),
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlySales?.map(d => d.totalSales),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const topSellingData = {
    labels: topSelling?.map(p => p.productDetails.name),
    datasets: [
      {
        label: 'Top Selling Products',
        data: topSelling?.map(p => p.totalQuantity),
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {summary && (
        <div>
          <p>Total Stock Value: {summary.totalStockValue}</p>
          <p>Today's Sales: {summary.todaysSales}</p>
          <p>Low Stock Alerts: {summary.lowStockProducts}</p>
        </div>
      )}
      {monthlySales && <Line data={monthlySalesData} />}
      {topSelling && <Bar data={topSellingData} />}
    </div>
  );
};

export default Dashboard;
