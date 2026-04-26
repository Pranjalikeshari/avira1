import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  const fetchOrders = () => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setNewProduct({ ...newProduct, image: res.data.imageUrl });
      setImageFile(null);
    } catch (err) {
      console.log(err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      fetchProducts();
      setNewProduct({
        name: '',
        price: '',
        image: '',
        description: '',
        category: '',
        stock: '',
      });
      alert('Product added successfully!');
    } catch (err) {
      console.log(err);
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <input 
            type="text" 
            placeholder="Name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
            required 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={newProduct.price} 
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
            required 
          />
          
          <div className="image-upload-section">
            <label>Upload Image:</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <p>Uploading...</p>}
            {newProduct.image && (
              <div className="image-preview">
                <img src={newProduct.image} alt="Product Preview" style={{ maxWidth: '100px' }} />
                <p>✓ Image uploaded</p>
              </div>
            )}
          </div>

          <textarea 
            placeholder="Description" 
            value={newProduct.description} 
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
            required 
          />
          <select 
            value={newProduct.category} 
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
            required
          >
            <option value="">Select Category</option>
            <option value="Saree">Saree</option>
            <option value="Suit">Suit</option>
            <option value="Lehenga">Lehenga</option>
            <option value="Dupatta">Dupatta</option>
          </select>
          <input 
            type="number" 
            placeholder="Stock" 
            value={newProduct.stock} 
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} 
            required 
          />
          <button type="submit" disabled={uploading || !newProduct.image}>Add Product</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Products ({products.length})</h2>
        <ul>
          {products.map(product => (
            <li key={product._id} className="product-item">
              <div>
                {product.image && <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />}
                <span>{product.name} - ${product.price} - {product.category}</span>
              </div>
              <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>Orders ({orders.length})</h2>
        <ul>
          {orders.map(order => (
            <li key={order._id} className="order-item">
              Order ID: {order._id} - Total: ${order.total} - Status: {order.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;