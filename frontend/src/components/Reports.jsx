import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const Reports = ({ token }) => {
  const downloadStockReport = async () => {
    try {
      const res = await axios.get('/api/reports/stock/download', {
        headers: { 'x-auth-token': token },
        responseType: 'blob',
      });
      saveAs(new Blob([res.data]), 'stock_report.xlsx');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Reports</h2>
      <button onClick={downloadStockReport}>Download Stock Report (XLSX)</button>
    </div>
  );
};

export default Reports;
