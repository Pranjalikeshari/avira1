import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Checkout.css';

const Checkout = () => {
  const [billing, setBilling] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!billing.name || !billing.email || !billing.phone || !billing.address) {
      alert('Please fill in all required billing information!');
      return;
    }
    // Use stored userId if available, otherwise send null for guest checkout
    const userId = localStorage.getItem('userId') || null;
    const order = {
      user: userId,
      products: cart.map(item => ({ product: item._id, quantity: item.quantity })),
      total,
      billing,
    };
    console.log('Sending order:', order);
    try {
      const res = await axios.post('http://localhost:5000/api/orders', order);
      console.log('Order response:', res.data);
      clearCart();
      navigate('/success', { state: { orderId: res.data._id } });
    } catch (err) {
      console.log('Order error:', err.response?.data || err.message);
      alert('Order failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cart.map(item => (
          <div key={item._id} className="summary-item">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div className="summary-total">
          <strong>Total: ₹{total.toLocaleString('en-IN')}</strong>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={billing.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={billing.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={billing.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={billing.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={billing.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" name="state" value={billing.state} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pin Code</label>
          <input type="text" name="pinCode" value={billing.pinCode} onChange={handleChange} required />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;