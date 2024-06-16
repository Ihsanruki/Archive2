import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarangList from './components/barang/BarangList';
import AddBarang from './components/barang/AddBarang';
import KasirPage from './components/key/KasirPage';
import User from './components/userfd/user';
import SupplierPage from './components/key/SupplierPage';
import AdminPage from './components/key/AdminPage';
import barangData from './data/barang.json';
import transactionData from './data/transactions.json';

function App() {
  const [barangs, setBarangs] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [currentPage, setCurrentPage] = useState('user');

  useEffect(() => {
    setBarangs(barangData.barangs);
    localStorage.setItem('barangs', JSON.stringify(barangData.barangs));
    
    setTransactions(transactionData.transactions);
    localStorage.setItem('transactions', JSON.stringify(transactionData.transactions));
  }, []);

  useEffect(() => {
    localStorage.setItem('barangs', JSON.stringify(barangs));
  }, [barangs]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const userAccounts = [
    { username: "gudang", password: "gudang123", role: "gudang" },
    { username: "kasir", password: "kasir123", role: "kasir" },
    { username: "supplier", password: "supplier123", role: "supplier" },
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" }
  ];

  const login = () => {
    const account = userAccounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (account) {
      setIsLogin(true);
      setRole(account.role);
      setCurrentPage(account.role);
    } else {
      alert("Username atau password salah");
    }
  };

  const logout = () => {
    setIsLogin(false);
    setRole('user');
    setCurrentPage('user');
  };

  const handleDelete = (id) => {
    setBarangs(barangs.filter((barang) => barang.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit barang dengan id: ${id}`); 
  };

  const handleAdd = () => {
    setCurrentPage('addBarang');
  };

  const addBarang = (barang) => {
    const newId = barangs.length > 0 
                  ? Math.max(...barangs.map(b => b.id)) + 1 
                  : 1; 
    setBarangs([...barangs, { ...barang, id: newId }]);
    setCurrentPage('gudang');
  };

  const handleCancelAdd = () => {
    setCurrentPage('gudang'); 
  };

  const validateTransaction = (transactionId, payment, discount) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (!transaction) {
      alert(`Transaksi dengan ID ${transactionId} tidak ditemukan.`);
      return;
    }

    const barang = barangs.find((b) => b.id === transaction.barangId);
    if (!barang) {
      alert('Barang tidak ditemukan dalam inventaris.');
      return;
    }

    if (barang.stokBarang < transaction.quantity) {
      alert('Stok barang tidak mencukupi.');
      return;
    }

    const totalPrice = (transaction.quantity * barang.hargaBarang) * (1 - (discount / 100));
    if (payment < totalPrice) {
      alert('Pembayaran tidak mencukupi.');
      return;
    }

    updateTransactionStatus(transactionId, 'processed', payment, discount);
    updateBarangStock(transaction.barangId, transaction.quantity);
    alert('Transaksi berhasil divalidasi dan stok barang telah dikurangi.');
  };

  const requestSupplier = (barangId, quantityNeeded) => {
    const barang = barangs.find(b => b.id === barangId);
    if (!barang) {
      alert('Barang tidak ditemukan dalam inventaris.');
      return;
    }

    console.log(`Meminta ${quantityNeeded} unit ${barang.namaBarang} dari supplier.`);
    alert(`Permintaan untuk ${quantityNeeded} unit ${barang.namaBarang} telah dikirim ke supplier.`);
  };

  const updateTransactionStatus = (transactionId, newStatus, payment, discount) => {
    setTransactions(transactions.map((t) => 
      t.id === transactionId ? { ...t, status: newStatus, payment, discount } : t 
    ));
  };

  const handleTransactionSubmit = (transaction) => {
    const newId = transactions.length > 0 
                  ? Math.max(...transactions.map(t => t.id)) + 1 
                  : 1; 
    setTransactions([...transactions, { ...transaction, id: newId, status: 'pending' }]);
  };

  const updateBarangStock = (barangId, quantity) => {
    setBarangs(barangs.map((barang) => 
      barang.id === barangId ? { ...barang, stokBarang: barang.stokBarang - quantity } : barang 
    ));
  };

  const deleteTransaction = (transactionId) => {
    setTransactions(transactions.filter(t => t.id !== transactionId));
  };

  const updateStock = (barangId, additionalStock) => {
    setBarangs(barangs.map((barang) => 
      barang.id === barangId ? { ...barang, stokBarang: barang.stokBarang + additionalStock } : barang 
    ));
  };

  return (
    <div className="container mt-4">
      {!isLogin ? (
        <div className="login-page">
          <div className="background-image" style={{
            backgroundImage: `url('https://t3.ftcdn.net/jpg/06/03/60/40/360_F_603604052_ymJlfUg5aemPj2iEqHqeMgUwBwrW5gQN.jpg')`,
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1
          }} />
          <div className="login-form">
            <h1 className="text-center">Login</h1>
            <form onSubmit={(e) => { e.preventDefault(); login(); }}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '18px',
                    border: 'none',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '18px',
                    border: 'none',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2" style={{
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '18px',
                border: 'none',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }}>
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <header className="mb-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                {role === 'kasir' && (
                  <li className="nav-item">
                    <button 
                      className="btn btn-link nav-link" 
                      onClick={() => setCurrentPage('kasir')}
                    >
                      Kasir
                    </button>
                  </li>
                )}
                {role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <button 
                        className="btn btn-link nav-link" 
                        onClick={() => setCurrentPage('gudang')}
                      >
                        Gudang
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className="btn btn-link nav-link" 
                        onClick={() => setCurrentPage('supplier')}
                      >
                        Supplier
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className="btn btn-link nav-link" 
                        onClick={() => setCurrentPage('kasir')}
                      >
                        Kasir
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className="btn btn-link nav-link" 
                        onClick={() => setCurrentPage('admin')}
                      >
                        Admin
                      </button>
                    </li>
                  </>
                )}
                <li className="nav-item"> 
                  <button 
                    className="btn btn-link nav-link" 
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </header>

          {currentPage === 'gudang' && ( 
            <div>
              <h1>Gudang Page</h1> 
              <BarangList 
                barangs={barangs} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
              />
              <button 
                className="btn btn-primary mt-2"
                onClick={handleAdd}
              >
                Add Barang
              </button>
            </div>
          )}

          {currentPage === 'addBarang' && (
            <div>
              <AddBarang onAdd={addBarang} onCancel={handleCancelAdd} />
            </div>
          )}

          {currentPage === 'kasir' && (
            <div>
              <h1>Kasir Page</h1>
              <KasirPage 
                transactions={transactions} 
                barangs={barangs} 
                onValidateTransaction={validateTransaction} 
                onRequestSupplier={requestSupplier} 
                onUpdateTransactionStatus={updateTransactionStatus}
                onDeleteTransaction={deleteTransaction}
              />
            </div>
          )}

          {currentPage === 'supplier' && (
            <div>
              <h1>Supplier Page</h1>
              <SupplierPage 
                barangs={barangs} 
                onUpdateStock={updateStock} 
              />
            </div>
          )}

          {currentPage === 'admin' && (
            <div>
              <h1>Admin Page</h1>
              <AdminPage 
                barangs={barangs} 
                transactions={transactions}
              />
            </div>
          )}

          {currentPage === 'user' && (
            <div>
              <h1>User Page</h1>
              <User 
                barangs={barangs} 
                transactions={transactions} 
                handleTransactionSubmit={handleTransactionSubmit} 
                onLogout={logout} 
              /> 
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
