import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const formatHarga = (harga) => {
  return `Rp. ${Number(harga).toLocaleString('id-ID')}`;
};

const User = ({ transactions = [], barangs = [], handleTransactionSubmit, onLogout }) => {
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [quantity, setQuantity] = useState(1);

  console.log('Barangs:', barangs);
  console.log('Transactions:', transactions);

  const handleBarangSelect = (barang) => {
    setSelectedBarang(barang);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleSubmitOrder = () => {
    if (selectedBarang && quantity > 0) {
      const transaction = {
        id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1, // Assign unique ID
        itemName: selectedBarang.namaBarang,
        quantity: quantity,
        barangId: selectedBarang.id,
        price: selectedBarang.hargaBarang,
        status: 'pending'
      };
      handleTransactionSubmit(transaction);
      setSelectedBarang(null);
      setQuantity(1);
    } else {
      alert("Please select a barang and enter a valid quantity.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">Available Barangs</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Harga Barang</th>
                    <th>Stok Barang</th>
                  </tr>
                </thead>
                <tbody>
                  {barangs.map((barang) => (
                    <tr key={barang.id} onClick={() => handleBarangSelect(barang)}>
                      <td>{barang.id}</td>
                      <td>{barang.namaBarang}</td>
                      <td>{barang.jenisBarang}</td>
                      <td>{formatHarga(barang.hargaBarang)}</td>
                      <td>{barang.stokBarang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {selectedBarang && (
            <div className="card mb-4">
              <div className="card-header">Selected Barang</div>
              <div className="card-body">
                <h3>{selectedBarang.namaBarang}</h3>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-control"
                    aria-label="Quantity"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      onClick={handleSubmitOrder}
                      className="btn btn-success"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Transaction List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.itemName}</td>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.status || 'pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      itemName: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number,
      status: PropTypes.string,
    })
  ).isRequired,
  barangs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      namaBarang: PropTypes.string.isRequired,
      jenisBarang: PropTypes.string.isRequired,
      hargaBarang: PropTypes.number.isRequired,
      stokBarang: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleTransactionSubmit: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default User;
