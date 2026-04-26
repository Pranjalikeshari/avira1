import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Product added to cart!');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>
        <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
        <p className="description">{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;