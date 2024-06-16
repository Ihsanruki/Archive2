import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBarang = ({ onAdd, onCancel }) => {
  const [namaBarang, setNamaBarang] = useState('');
  const [jenisBarang, setJenisBarang] = useState('');
  const [hargaBarang, setHargaBarang] = useState('');
  const [stokBarang, setStokBarang] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input (optional)
    if (!namaBarang || !jenisBarang || !hargaBarang || stokBarang < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Buat objek barang baru
    const newBarang = {
      namaBarang,
      jenisBarang,
      hargaBarang: parseInt(hargaBarang, 10), // Pastikan harga adalah integer
      stokBarang: parseInt(stokBarang, 10) // Pastikan stok adalah integer
    };

    // Kirim data barang baru ke fungsi onAdd
    onAdd(newBarang);

    // Reset input form
    setNamaBarang('');
    setJenisBarang('');
    setHargaBarang('');
    setStokBarang(0);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Barang</h5>
            <button type="button" className="close" aria-label="Close" onClick={onCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="namaBarang">Nama Barang:</label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={namaBarang}
                  onChange={(e) => setNamaBarang(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="jenisBarang">Jenis Barang:</label>
                <input
                  type="text"
                  className="form-control"
                  id="jenisBarang"
                  value={jenisBarang}
                  onChange={(e) => setJenisBarang(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hargaBarang">Harga Barang:</label>
                <input
                  type="number"
                  className="form-control"
                  id="hargaBarang"
                  value={hargaBarang}
                  onChange={(e) => setHargaBarang(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stokBarang">Stok Barang:</label>
                <input
                  type="number"
                  className="form-control"
                  id="stokBarang"
                  value={stokBarang}
                  onChange={(e) => setStokBarang(parseInt(e.target.value, 10))}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Barang</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddBarang.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddBarang;
