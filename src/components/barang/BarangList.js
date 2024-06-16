import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const formatHarga = (harga) => `Rp. ${Number(harga).toLocaleString('id-ID')}`;

const BarangList = ({ onSelect }) => {
  const [barangs, setBarangs] = useState([]);
  const [editBarang, setEditBarang] = useState(null);
  const [namaBarang, setNamaBarang] = useState('');
  const [jenisBarang, setJenisBarang] = useState('');
  const [hargaBarang, setHargaBarang] = useState('');
  const [stokBarang, setStokBarang] = useState('');

  useEffect(() => {
    const storedBarangs = JSON.parse(localStorage.getItem('barangs')) || [];
    setBarangs(storedBarangs);
  }, []);

  useEffect(() => {
    localStorage.setItem('barangs', JSON.stringify(barangs));
  }, [barangs]);

  const handleDelete = (id) => {
    const updatedBarangs = barangs.filter(barang => barang.id !== id);
    setBarangs(updatedBarangs);
  };

  const handleEdit = (barang) => {
    setEditBarang(barang);
    setNamaBarang(barang.namaBarang);
    setJenisBarang(barang.jenisBarang);
    setHargaBarang(barang.hargaBarang);
    setStokBarang(barang.stokBarang);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const newBarang = {
      id: editBarang ? editBarang.id : new Date().getTime(),
      namaBarang,
      jenisBarang,
      hargaBarang,
      stokBarang: parseInt(stokBarang),
    };
    if (editBarang) {
      const updatedBarangs = barangs.map(b => b.id === editBarang.id ? newBarang : b);
      setBarangs(updatedBarangs);
    } else {
      setBarangs([...barangs, newBarang]);
    }
    setEditBarang(null);
    setNamaBarang('');
    setJenisBarang('');
    setHargaBarang('');
    setStokBarang('');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">List of Barang</h2>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleAddOrUpdate}>
            <div className="mb-3">
              <label htmlFor="namaBarang" className="form-label">Nama Barang</label>
              <input
                type="text"
                className="form-control"
                id="namaBarang"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jenisBarang" className="form-label">Jenis Barang</label>
              <input
                type="text"
                className="form-control"
                id="jenisBarang"
                value={jenisBarang}
                onChange={(e) => setJenisBarang(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hargaBarang" className="form-label">Harga Barang</label>
              <input
                type="number"
                className="form-control"
                id="hargaBarang"
                value={hargaBarang}
                onChange={(e) => setHargaBarang(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stokBarang" className="form-label">Stok Barang</label>
              <input
                type="number"
                className="form-control"
                id="stokBarang"
                value={stokBarang}
                onChange={(e) => setStokBarang(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editBarang ? 'Update Barang' : 'Add Barang'}
            </button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Nama Barang</th>
                  <th>Jenis Barang</th>
                  <th>Harga Barang</th>
                  <th>Stok Barang</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {barangs.map((barang) => (
                  <tr key={barang.id} onClick={() => onSelect(barang)}>
                    <td>{barang.id}</td>
                    <td>{barang.namaBarang}</td>
                    <td>{barang.jenisBarang}</td>
                    <td>{formatHarga(barang.hargaBarang)}</td>
                    <td>{barang.stokBarang}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(barang);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(barang.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

BarangList.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default BarangList;
