import React from 'react';
import { useLocation } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="success">
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with Avira.</p>
      {orderId && <p>Your Order ID: {orderId}</p>}
      <a href="/">Continue Shopping</a>
    </div>
  );
};

export default Success;