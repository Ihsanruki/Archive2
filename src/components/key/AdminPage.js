import React, { useState, useEffect } from 'react';
import roles from '../../data/role.json';
import './AdminPage.css';

const AdminPage = () => {
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [availableRoles, setAvailableRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [barangs, setBarangs] = useState([]);
  const [selectedBarangId, setSelectedBarangId] = useState(null);
  const [additionalStock, setAdditionalStock] = useState(0);

  useEffect(() => {
    setAvailableRoles(roles.roles.map(role => role.role));
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    const storedBarangs = localStorage.getItem('barangs');
    if (storedBarangs) {
      setBarangs(JSON.parse(storedBarangs));
    }
  }, []);

  const addUser = (username, password, role) => {
    const newUser = { username, password, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (username) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUserUsername && newUserPassword && newUserRole) {
      addUser(newUserUsername, newUserPassword, newUserRole);
      setNewUserUsername('');
      setNewUserPassword('');
      setNewUserRole('user');
      setError(null);
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemName && newItemQuantity) {
      const newItems = [...items, { name: newItemName, quantity: newItemQuantity }];
      setItems(newItems);
      localStorage.setItem('items', JSON.stringify(newItems));
      setNewItemName('');
      setNewItemQuantity(0);
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleUpdateQuantity = (itemName, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.name === itemName) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleUpdateStock = () => {
    if (selectedBarangId !== null && additionalStock > 0) {
      const updatedBarangs = barangs.map(barang => {
        if (barang.id === selectedBarangId) {
          return { ...barang, stokBarang: barang.stokBarang + additionalStock };
        }
        return barang;
      });
      setBarangs(updatedBarangs);
      localStorage.setItem('barangs', JSON.stringify(updatedBarangs));
      setSelectedBarangId(null);
      setAdditionalStock(0);
    } else {
      setError('Please select a barang and enter a valid stock amount');
    }
  };

  return (
    <div className="container-fluid">
      <header className="mb-4 text-center">
        <h1>Admin Dashboard</h1>
        <p>Manage users and items from this dashboard.</p>
      </header>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Menu</div>
            <div className="card-body">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <i className="fas fa-user-plus"></i> Add New User
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-users"></i> Manage Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-cog"></i> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card mb-4">
            <div className="card-header">Add New User</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="newUserUsername">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newUserUsername"
                    value={newUserUsername}
                    onChange={(e) => setNewUserUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newUserPassword">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newUserPassword"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newUserRole">Role:</label>
                  <select
                    className="form-control"
                    id="newUserRole"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                  Add User
                </button>
              </form>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">Add New Item</div>
            <div className="card-body">
              <form onSubmit={handleAddItem}>
                <div className="form-group">
                  <label htmlFor="newItemName">Item Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newItemName"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newItemQuantity">Quantity:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="newItemQuantity"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Item
                </button>
              </form>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">Items</div>
            <div className="card-body">
              <table className="table table-striped mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Update Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.name} className={index % 2 === 0 ? 'table-primary' : ''}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateQuantity(item.name, parseInt(e.target.quantity.value, 10));
                          }}
                        >
                          <input
                            type="number"
                            name="quantity"
                            defaultValue={item.quantity}
                            className="form-control d-inline w-50"
                            required
                          />
                          <button type="submit" className="btn btn-primary ml-2">
                            Update
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
          <div className="card">
            <div className="card-header">Users</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.username} className={index % 2 === 0 ? 'table-primary' : ''}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteUser(user.username)}
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
    </div>
  );
};

export default AdminPage;