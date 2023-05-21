const { Product } = require('../models');

const productData = [
  {
    name: 'Plain T-Shirt', //modified name parameter
    description: 'A plain t-shirt',  // Added 'description'
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    name: 'Running Sneakers',//modified name parameter
    description: 'High quality running sneakers',  // Added 'description'
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    name: 'Branded Baseball Hat',//modified name parameter
    description: 'A branded baseball hat',  // Added 'description'
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    name: 'Top 40 Music Compilation Vinyl Record',//modified name parameter
    description: 'Top 40 Music Compilation on Vinyl',  // Added 'description'
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    name: 'Cargo Shorts',//modified name parameter
    description: 'Comfortable cargo shorts',  // Added 'description'
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
