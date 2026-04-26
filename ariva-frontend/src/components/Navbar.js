import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark', newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="brand-text">Avira</span>
            <span className="brand-tagline">Ethnic Wear</span>
          </Link>
        </div>

        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search sarees, suits, lehengas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C7.89543 22 7 21.1046 7 20V11C7 9.89543 7.89543 9 9 9H15C16.1046 9 17 9.89543 17 11V20C17 21.1046 16.1046 22 15 22H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 11H21L19 4H5L3 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cart ({cart.length})
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V5M12 19V21M3 12H5M19 12H21M5.6 5.6L7 7M17 17L18.4 18.4M5.6 18.4L7 17M17 7L18.4 5.6M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;