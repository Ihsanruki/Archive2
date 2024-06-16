import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteBarang = ({ barang, deleteBarang, onCancel }) => {
  const handleDelete = () => {
    deleteBarang(barang.id);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Barang</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete {barang.namaBarang}?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBarang;
