import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

interface StockInfo {
  date: string;
  open: number;
  close: number;
}

interface StockData {
  stockName: string;
  info: StockInfo[];
}

const StockApp: React.FC<{ data: StockData[] }> = ({ data }) => {
  const [selectedStock, setSelectedStock] = useState<StockData>(data[0]);
  const [numDaysPerPage, setNumDaysPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stockName = e.target.value;
    const selected = data.find(stock => stock.stockName === stockName);
    if (selected) setSelectedStock(selected);
  };

  const handleNumDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const days = parseInt(e.target.value);
    setNumDaysPerPage(days);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * numDaysPerPage;
  const endIndex = startIndex + numDaysPerPage;
  const paginatedData = selectedStock.info.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1 className="title">Stock App</h1>
      <div className="dropdown-container">
        <label>Select Stock:</label>
        <select className="dropdown" onChange={handleStockChange}>
          {data.map(stock => (
            <option key={stock.stockName} value={stock.stockName}>
              {stock.stockName}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label>Number of Days Per Page:</label>
        <select className="dropdown" onChange={handleNumDaysChange} value={numDaysPerPage}>
          {[3, 5, 10].map(days => (
            <option key={days} value={days}>
              {days}
            </option>
          ))}
        </select>
      </div>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td className={entry.open > entry.close ? 'green' : 'red'}>{entry.open}</td>
              <td className={entry.close > entry.open ? 'green' : 'red'}>{entry.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
        <span>{currentPage}</span>
        <button disabled={endIndex >= selectedStock.info.length} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const jsonData: StockData[] = [
    {
      stockName: "Macrosoft",
      info: [
        { date: "Mar 1, 2024", open: 10, close: 11 },
        { date: "Mar 2, 2024", open: 12, close: 11 },
        { date: "Mar 3, 2024", open: 10, close: 5 },
        { date: "Mar 4, 2024", open: 5, close: 9 },
        { date: "Mar 5, 2024", open: 10, close: 13 },
        { date: "Mar 6, 2024", open: 14, close: 7 },
        { date: "Mar 7, 2024", open: 5, close: 11 },
        { date: "Mar 8, 2024", open: 10, close: 11 },
        { date: "Mar 9, 2024", open: 11, close: 10 },
        { date: "Mar 10, 2024", open: 10, close: 11 },
        { date: "Mar 11, 2024", open: 11, close: 11 }
      ]
    },
    {
      stockName: "Doogle",
      info: [
        { date: "Mar 1, 2024", open: 20, close: 21 },
        { date: "Mar 2, 2024", open: 21, close: 21 },
        { date: "Mar 3, 2024", open: 21, close: 21 },
        { date: "Mar 4, 2024", open: 21, close: 18 },
        { date: "Mar 5, 2024", open: 17, close: 15 },
        { date: "Mar 6, 2024", open: 16, close: 15 },
        { date: "Mar 7, 2024", open: 16, close: 18 },
        { date: "Mar 8, 2024", open: 22, close: 18 },
        { date: "Mar 9, 2024", open: 19, close: 19 },
        { date: "Mar 10, 2024", open: 16, close: 17 },
        { date: "Mar 11, 2024", open: 17, close: 19 }
      ]
    }
  ];

  return <StockApp data={jsonData} />;
};

export default App;
