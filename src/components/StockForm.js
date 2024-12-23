import React, { useEffect, useState } from "react";
import { addStock, updateStock, deleteStock, getStocks } from "../services/api";
import Modal from "./Modal";

const StockUpdate = ({stock, onSubmit, onClose}) => {
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
}

const StockForm = ({ stock, onSubmit }) => {
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
  };

  return (
    <div className="bg-white p-6 border rounded-md shadow-md w-96 max-h-96">
      <h2 className="text-xl font-bold text-center mb-4">Stock Form</h2>
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
      </div>
      <div className="flex justify-evenly mt-6">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
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

const StockList = ({ stocks, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 border rounded-md shadow-md w-full max-h-dvh overflow-y-auto">
      <h2 className="text-xl font-bold text-center mb-4">Stock List</h2>
      <ul className="divide-y divide-gray-200">
        {stocks.map((stock) => (
          <li
            key={stock.id}
            className="flex justify-between items-center py-2 px-4 hover:bg-gray-50"
          >
            <div>
              <div className="mb-2">
                <p className="font-semibold">{stock.name}</p>
                <p className="text-sm text-gray-500">{stock.ticker}</p>
              </div>
              <div className="mb-2">
                <p className="font-semibold">Quantity: {stock.quantity}</p>
                <p className="text-sm text-gray-500">Buy Price: $ {stock.buyPrice}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                onClick={() => onEdit(stock)}
                className="text-white cursor-pointer bg-blue-500 py-2 px-5 rounded-lg"
              >
                Edit
              </div>
              <button
                onClick={() => onDelete(stock.id)}
                className="text-white cursor-pointer bg-red-500 py-2 px-5 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const StockManager = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    refreshStocks();
  }, []);

  const refreshStocks = () => {
    getStocks().then((response) => setStocks(response.data));
  };

  const handleAdd = () => {
    refreshStocks();
    setSelectedStock(null);
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

  const handleClose = ()=>{
    setIsModalOpen(false);
  }

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <StockForm stock={selectedStock} onSubmit={handleAdd} />
      <StockList stocks={stocks} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StockUpdate stock={selectedStock} onSubmit={handleUpdate} onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default StockManager;
