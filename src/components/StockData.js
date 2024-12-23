import React, { useEffect, useState } from "react";
import { addStock, deleteStock, getStocks, updateStock } from "../services/api";
import Modal from "./Modal";

const StockUpdate = ({ stock, onSubmit, onClose }) => {
  const [form, setForm] = useState(
    stock || { name: "", ticker: "", quantity: 1, buyPrice: 0 }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (stock) updateStock(stock.id, form).then(onSubmit);
    else addStock(form).then(onSubmit);
  };

  const handleCancel = () => {
    setForm(stock || { name: "", ticker: "", quantity: 1, buyPrice: 0 });
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Stock Name"
        className="border border-gray-300 rounded p-2 w-full"
      />
      <input
        name="ticker"
        value={form.ticker}
        onChange={handleChange}
        placeholder="Ticker"
        className="border border-gray-300 rounded p-2 w-full"
      />
      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="border border-gray-300 rounded p-2 w-full"
      />
      <input
        name="buyPrice"
        type="number"
        value={form.buyPrice}
        onChange={handleChange}
        placeholder="Buy Price"
        className="border border-gray-300 rounded p-2 w-full"
      />
      <div className="flex justify-evenly mt-6">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const StockData = ({ stocks, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-700 m-8">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Ticker</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Buy Price</th>
            <th className="px-16 py-2 text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.id}
              className="border-b hover:bg-gray-50 transition-all duration-200 h-24"
            >
              <td className="px-4 py-2">{stock.name}</td>
              <td className="px-4 py-2">{stock.ticker}</td>
              <td className="px-9 py-2">{stock.quantity}</td>
              <td className="px-4 py-2">$ {stock.buyPrice}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onEdit(stock)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all duration-200 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(stock.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StockManager = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 8;

  useEffect(() => {
    refreshStocks();
  }, []);

  const refreshStocks = () => {
    getStocks().then((response) => setStocks(response.data));
  };


  const handleUpdate = () => {
    refreshStocks();
    setIsModalOpen(false);
  };

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteStock(id).then(refreshStocks);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="gap-6 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Holdings</h2>
      <StockData stocks={currentStocks} onEdit={handleEdit} onDelete={handleDelete} />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastStock >= stocks.length}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StockUpdate stock={selectedStock} onSubmit={handleUpdate} onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default StockManager;
