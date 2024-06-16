import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionForm = ({ onTransactionSubmit, barangs }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [barangId, setBarangId] = useState(null); // Tambahkan state untuk barangId

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barangId) {
      alert('Please select a barang.');
      return;
    }

    const barang = barangs.find(b => b.id === barangId);

    if (!barang) {
      alert('Barang not found.');
      return;
    }

    onTransactionSubmit({ itemName: barang.namaBarang, quantity, barangId }); 
    setItemName('');
    setQuantity(1);
    setBarangId(null);
  };

  return (
    <div>
      <select
        className="form-control"
        value={barangId || ''}
        onChange={(e) => setBarangId(parseInt(e.target.value))}
      >
        <option value="" disabled>Select Barang</option>
        {barangs.map((barang) => (
          <option key={barang.id} value={barang.id}>
            {barang.namaBarang}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} className="btn btn-primary mt-2">
        Submit Transaction
      </button>
    </div>
  );
};

TransactionForm.propTypes = {
  onTransactionSubmit: PropTypes.func.isRequired,
  barangs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      namaBarang: PropTypes.string.isRequired,
      jenisBarang: PropTypes.string.isRequired,
      hargaBarang: PropTypes.string.isRequired,
      stokBarang: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionForm;