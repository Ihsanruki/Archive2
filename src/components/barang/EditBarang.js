import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditBarang = ({ barang, editBarang, onCancel }) => {
  const [namaBarang, setNamaBarang] = useState(barang.namaBarang);
  const [jenisBarang, setJenisBarang] = useState(barang.jenisBarang);
  const [hargaBarang, setHargaBarang] = useState(barang.hargaBarang);
  const [stokBarang, setStokBarang] = useState(barang.stokBarang);

  const jenisOptions = ["Elektronik", "Pakaian", "Makanan", "Minuman", "Alat Tulis", "Mainan"];

  const handleNamaBarangChange = (e) => setNamaBarang(e.target.value);
  const handleJenisBarangChange = (e) => setJenisBarang(e.target.value);
  const handleHargaBarangChange = (e) => setHargaBarang(e.target.value);
  const handleStokBarangChange = (e) => setStokBarang(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBarang = {
      id: barang.id,
      namaBarang,
      jenisBarang,
      hargaBarang,
      stokBarang,
    };
    editBarang(updatedBarang);
  };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title">Edit Barang</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="namaBarang">Nama Barang:</label>
            <input
              type="text"
              className="form-control"
              id="namaBarang"
              value={namaBarang}
              onChange={handleNamaBarangChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jenisBarang">Jenis Barang:</label>
            <select
              className="form-control"
              id="jenisBarang"
              value={jenisBarang}
              onChange={handleJenisBarangChange}
            >
              <option value="">Select Jenis Barang</option>
              {jenisOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="hargaBarang">Harga Barang:</label>
            <input
              type="text"
              className="form-control"
              id="hargaBarang"
              value={hargaBarang}
              onChange={handleHargaBarangChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stokBarang">Stok Barang:</label>
            <input
              type="text"
              className="form-control"
              id="stokBarang"
              value={stokBarang}
              onChange={handleStokBarangChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditBarang;
