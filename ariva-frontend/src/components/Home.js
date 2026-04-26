import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch some featured products
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        // Get first 4 products as featured
        setFeaturedProducts(res.data.slice(0, 4));
      })
      .catch(err => console.log(err));
  }, []);

  const categories = [
    {
      name: 'Sarees',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&crop=center',
      description: 'Elegant Banarasi & traditional sarees',
      count: '25+ Designs'
    },
    {
      name: 'Suits',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop&crop=center',
      description: 'Designer salwar suits & anarkalis',
      count: '30+ Designs'
    },
    {
      name: 'Lehengas',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&crop=center',
      description: 'Bridal & party lehenga collections',
      count: '20+ Designs'
    },
    {
      name: 'Dupattas',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop&crop=center',
      description: 'Silk & embroidered dupattas',
      count: '40+ Designs'
    },
  ];

  const features = [
    {
      icon: '👗',
      title: 'Authentic Craftsmanship',
      description: 'Handwoven fabrics with traditional techniques passed down through generations'
    },
    {
      icon: '🚚',
      title: 'Pan-India Delivery',
      description: 'Free shipping across India on orders above ₹999. Express delivery available.'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: '30-day return policy with hassle-free exchanges for your complete satisfaction'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'Finest quality materials sourced from traditional artisans and verified suppliers'
    }
  ];

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">✨ Premium Ethnic Wear</div>
            <h1 className="hero-title">Discover Timeless Elegance</h1>
            <p className="hero-subtitle">Experience the rich heritage of Indian craftsmanship with Avira's curated collection of sarees, suits, lehengas, and dupattas. Where tradition meets contemporary style.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Unique Designs</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">Explore Collection</Link>
              <Link to="/products?category=Sarees" className="btn-secondary">Shop Sarees</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop&crop=center" alt="Elegant Ethnic Wear" />
            <div className="hero-image-overlay">
              <div className="overlay-content">
                <h3>Limited Edition</h3>
                <p>Festive Collection</p>
                <span className="discount">Up to 30% Off</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our handcrafted collections designed for every occasion</p>
          </div>
          <div className="category-grid">
            {categories.map(category => (
              <Link key={category.name} to={`/products?category=${category.name}`} className="category-link">
                <div className="category-card">
                  <div className="category-image">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=' + category.name;
                      }}
                    />
                    <div className="category-count">{category.count}</div>
                  </div>
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-link-text">Shop Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Avira?</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Collection</h2>
              <p className="section-subtitle">Handpicked pieces from our latest arrivals</p>
            </div>
            <div className="featured-grid">
              {featuredProducts.map(product => (
                <div key={product._id} className="featured-card">
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400/8B4513/FFFFFF?text=' + encodeURIComponent(product.name.substring(0, 20));
                      }}
                    />
                    <div className="product-badge">New</div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                    <div className="product-actions">
                      <Link to={`/product/${product._id}`} className="btn-small">View Details</Link>
                      <button className="btn-cart" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all">
              <Link to="/products" className="btn-primary">View All Products</Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to get latest updates on new arrivals and exclusive offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;