import React, { useState } from 'react';
import './AdminPage.css';

function SupplierPage({ barangs, onUpdateStock }) {
  const [selectedBarangId, setSelectedBarangId] = useState(null);
  const [additionalStock, setAdditionalStock] = useState(0);

  const handleUpdateStock = () => {
    if (selectedBarangId && additionalStock > 0) {
      onUpdateStock(selectedBarangId, additionalStock);
      setSelectedBarangId(null);
      setAdditionalStock(0);
    } else {
      alert('Please select a barang and enter a valid stock quantity.');
    }
  };

  return (
    <div className="container-fluid">
      <header className="mb-4 text-center">
        <h1>Supplier Dashboard</h1>
        <p>Manage barang stock from this dashboard.</p>
      </header>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header">List of Barang</div>
            <div className="card-body">
              <ul className="list-group">
                {barangs.map(barang => (
                  <li key={barang.id} className="list-group-item">
                    {barang.namaBarang} - Stok: {barang.stokBarang}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">Update Stock</div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="barangSelect">Select Barang:</label>
                <select
                  id="barangSelect"
                  className="form-control"
                  value={selectedBarangId || ''}
                  onChange={(e) => setSelectedBarangId(parseInt(e.target.value))}
                >
                  <option value="" disabled>Select Barang</option>
                  {barangs.map(barang => (
                    <option key={barang.id} value={barang.id}>
                      {barang.namaBarang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="additionalStock">Additional Stock:</label>
                <input
                  type="number"
                  id="additionalStock"
                  className="form-control"
                  value={additionalStock}
                  onChange={(e) => setAdditionalStock(parseInt(e.target.value))}
                />
              </div>
              <button className="btn btn-primary" onClick={handleUpdateStock}>
                Update Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierPage;
