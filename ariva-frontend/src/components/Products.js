import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      setCategory(categoryParam);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    if (sort === 'low') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [category, sort, searchTerm, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // You could add a toast notification here
  };

  return (
    <div className="products">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Discover handcrafted ethnic wear for every occasion</p>
      </div>

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Saree">Sarees</option>
          <option value="Suit">Suits</option>
          <option value="Lehenga">Lehengas</option>
          <option value="Dupatta">Dupattas</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {searchTerm && (
        <div className="search-results">
          <p>Search results for: <strong>"{searchTerm}"</strong></p>
          <button onClick={() => setSearchTerm('')} className="clear-search">Clear Search</button>
        </div>
      )}

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay">
                <Link to={`/product/${product._id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
              <div className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
          <Link to="/products" className="btn-primary" onClick={() => {
            setCategory('');
            setSearchTerm('');
            setSort('');
          }}>
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products;