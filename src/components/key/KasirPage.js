import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const formatHarga = (harga) => {
  return `Rp. ${Number(harga).toLocaleString('id-ID')}`;
};

const KasirPage = ({ transactions, barangs, onValidateTransaction, onRequestSupplier, onUpdateTransactionStatus }) => {
  const [payment, setPayment] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setPayment('');
    setDiscount('');
    setErrorMessage('');
  };

  const handleValidationSubmit = (e) => {
    e.preventDefault();

    const selectedTransactionBarangId = selectedTransaction?.barangId;
    const barang = barangs.find(b => b.id === selectedTransactionBarangId);

    if (!barang) {
      setErrorMessage('Barang not found in inventory for validation.');
      return;
    }

    if (barang.stokBarang < selectedTransaction.quantity) {
      setErrorMessage('Stock insufficient for validation. Please request more stock from the supplier.');
      return;
    }

    onValidateTransaction(selectedTransaction.id, payment, discount);
    setSelectedTransaction(null);
    setPayment('');
    setDiscount('');
  };

  const handleRequestStock = () => {
    const barang = barangs.find(b => b.id === selectedTransaction.barangId);
    if (!barang) {
      setErrorMessage('Barang not found in inventory for stock request.');
      return;
    }

    const quantityNeeded = selectedTransaction.quantity - barang.stokBarang;
    onRequestSupplier(selectedTransaction.barangId, quantityNeeded);
    setErrorMessage('Stock request sent to supplier.');
  };

  const handleAcceptTransaction = (transaction) => {
    handleSelectTransaction(transaction);
    onUpdateTransactionStatus(transaction.id, 'accepted');
  };

  const handleDeclineTransaction = (transactionId, e) => {
    e.stopPropagation();
    onUpdateTransactionStatus(transactionId, 'declined');
    alert('Transaction declined.');
  };

  const handleRequestMoreStock = (transaction, e) => {
    e.stopPropagation();
    handleSelectTransaction(transaction);
    handleRequestStock();
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-header">Transactions</div>
        <div className="card-body">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <ul className="list-group">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleSelectTransaction(transaction)}
              >
                <div>
                  {transaction.itemName} - {transaction.quantity} @ {transaction.price}
                </div>
                <div>
                  <button
                    className="btn btn-success btn-sm mx-1"
                    onClick={(e) => { e.stopPropagation(); handleAcceptTransaction(transaction); }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={(e) => handleDeclineTransaction(transaction.id, e)}
                  >
                    Decline
                  </button>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={(e) => handleRequestMoreStock(transaction, e)}
                  >
                    Request
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedTransaction && (
        <div className="card mb-4">
          <div className="card-header">Validate Transaction</div>
          <div className="card-body">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleValidationSubmit}>
              <div className="mb-3">
                <label htmlFor="payment" className="form-label">Payment</label>
                <input
                  type="number"
                  className="form-control"
                  id="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  min="0" 
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">Discount</label>
                <input
                  type="number"
                  className="form-control"
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  min="0" 
                />
              </div>
              <button type="submit" className="btn btn-primary">Validate</button>
              {errorMessage && errorMessage.includes('insufficient') && (
                <button type="button" className="btn btn-warning" onClick={handleRequestStock}>Request Stock</button>
              )}
            </form>
          </div>
        </div>
      )}
      <h3 className="mb-4">List of Barang</h3>
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
            <tr key={barang.id}>
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
  );
};

KasirPage.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      itemName: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      barangId: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
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
  onValidateTransaction: PropTypes.func.isRequired,
  onRequestSupplier: PropTypes.func.isRequired,
  onUpdateTransactionStatus: PropTypes.func.isRequired,
};

export default KasirPage;
