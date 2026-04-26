import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === id ? { ...item, quantity: parseInt(quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};