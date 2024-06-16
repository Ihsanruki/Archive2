import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ role, setCurrentPage, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Inventory App</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {role === 'admin' && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setCurrentPage('gudang')}>Gudang</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setCurrentPage('supplier')}>Supplier</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setCurrentPage('kasir')}>Kasir</a>
              </li>
            </>
          )}
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => setCurrentPage('user')}>User</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={onLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  role: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
