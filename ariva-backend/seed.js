const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/avira');

const products = [
  // Sarees
  { name: 'Banarasi Silk Saree', price: 12490, image: 'http://localhost:5000/uploads/1776708123180-269970309.jpeg', description: 'Beautiful Banarasi silk saree with intricate embroidery.', category: 'Saree', stock: 10 },
  { name: 'Kanchipuram Silk Saree', price: 16640, image: 'http://localhost:5000/uploads/1776708183394-997263271.jpeg', description: 'Traditional Kanchipuram silk saree.', category: 'Saree', stock: 8 },
  { name: 'Chiffon Saree', price: 9960, image: 'http://localhost:5000/uploads/1776708236488-235948148.jpeg', description: 'Light and elegant chiffon saree.', category: 'Saree', stock: 15 },
  { name: 'Georgette Saree', price: 8310, image: 'http://localhost:5000/uploads/1776708302319-198448175.jpeg', description: 'Flowy georgette saree for modern occasions.', category: 'Saree', stock: 12 },
  { name: 'Cotton Saree', price: 6640, image: 'http://localhost:5000/uploads/1776708387014-310869605.jpeg', description: 'Comfortable cotton saree for daily wear.', category: 'Saree', stock: 20 },

  // Suits
  { name: 'Embroidered Salwar Suit', price: 14940, image: 'http://localhost:5000/uploads/1776708514017-694447613.jpeg', description: 'Elegant embroidered salwar suit.', category: 'Suit', stock: 10 },
  { name: 'Anarkali Suit', price: 18320, image: 'http://localhost:5000/uploads/1776708602935-593732168.jpeg', description: 'Graceful Anarkali suit with dupatta.', category: 'Suit', stock: 7 },
  { name: 'Churidar Suit', price: 13300, image: 'http://localhost:5000/uploads/1776708655277-491538687.jpeg', description: 'Classic churidar suit set.', category: 'Suit', stock: 14 },
  { name: 'Patiala Suit', price: 11630, image: 'http://localhost:5000/uploads/1776708723266-194215758.jpeg', description: 'Comfortable Patiala suit.', category: 'Suit', stock: 11 },
  { name: 'Designer Suit', price: 20790, image: 'http://localhost:5000/uploads/1776708779497-386297605.jpeg', description: 'Premium designer suit.', category: 'Suit', stock: 6 },

  // Lehengas
  { name: 'Bridal Lehenga', price: 41580, image: 'http://localhost:5000/uploads/1776710825475-325438142.jpeg', description: 'Stunning bridal lehenga with heavy embroidery.', category: 'Lehenga', stock: 3 },
  { name: 'Party Lehenga', price: 29130, image: 'http://localhost:5000/uploads/1776710879307-781231995.jpeg', description: 'Vibrant party lehenga.', category: 'Lehenga', stock: 5 },
  { name: 'Semi Lehenga', price: 23240, image: 'http://localhost:5000/uploads/1776710936668-405478829.jpeg', description: 'Semi-stitched lehenga for customization.', category: 'Lehenga', stock: 8 },
  { name: 'Velvet Lehenga', price: 33280, image: 'http://localhost:5000/uploads/1776711048039-225839210.jpeg', description: 'Luxurious velvet lehenga.', category: 'Lehenga', stock: 4 },
  { name: 'Net Lehenga', price: 26560, image: 'http://localhost:5000/uploads/1776711102258-249024198.jpeg', description: 'Delicate net lehenga.', category: 'Lehenga', stock: 6 },

  // Dupattas
  { name: 'Silk Dupatta', price: 4150, image: 'http://localhost:5000/uploads/1776711251214-370258850.jpeg', description: 'Soft silk dupatta.', category: 'Dupatta', stock: 25 },
  { name: 'Chiffon Dupatta', price: 3320, image: 'http://localhost:5000/uploads/1776711325378-72768504.jpeg', description: 'Light chiffon dupatta.', category: 'Dupatta', stock: 30 },
  { name: 'Wool Dupatta', price: 4980, image: 'http://localhost:5000/uploads/1776711376568-757740206.jpeg', description: 'Warm wool dupatta.', category: 'Dupatta', stock: 18 },
  { name: 'Cotton Dupatta', price: 2490, image: 'http://localhost:5000/uploads/1776711420898-324370802.jpeg', description: 'Simple cotton dupatta.', category: 'Dupatta', stock: 35 },
  { name: 'Embroidered Dupatta', price: 5810, image: 'http://localhost:5000/uploads/1776711489209-563284756.jpeg', description: 'Beautifully embroidered dupatta.', category: 'Dupatta', stock: 12 },
];

Product.deleteMany({})
  .then(() => {
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Products seeded');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));