import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString('en-IN')}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    min="1"
                  />
                  <button onClick={() => removeItem(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: ₹{total.toLocaleString('en-IN')}</h2>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;