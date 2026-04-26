import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './components/Success';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
