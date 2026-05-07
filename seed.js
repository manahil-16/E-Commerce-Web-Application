const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); //

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🌱 Database connected for Lab #12 seeding..."))
  .catch(err => console.error("❌ Connection error:", err));

const labProducts = [
  {
    name: "Apple MacBook Air (M3 Chip)",
    description: "The latest M3 chip for incredible performance and battery life.",
    price: 1099.00,
    category: "Electronics",
    imageUrl: "https://m.media-amazon.com/images/I/71ItM9kooAL._AC_SL1500_.jpg",
    stock: 15,
    rating: 5
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation and premium sound quality.",
    price: 398.00,
    category: "Electronics",
    imageUrl: "https://m.media-amazon.com/images/I/61S9aVn9dDL._AC_SL1500_.jpg",
    stock: 25,
    rating: 5
  },
  {
    name: "Nintendo Switch OLED Model",
    description: "Vibrant 7-inch OLED screen and enhanced audio.",
    price: 349.99,
    category: "Gaming",
    imageUrl: "https://m.media-amazon.com/images/I/61-P3fS6dqL._AC_SL1500_.jpg",
    stock: 10,
    rating: 5
  },
  {
    name: "Logitech G502 HERO Mouse",
    description: "High-performance wired gaming mouse with 25K sensor.",
    price: 49.99,
    category: "Gaming",
    imageUrl: "https://m.media-amazon.com/images/I/61mpMH5TCtL._AC_SL1500_.jpg",
    stock: 50,
    rating: 4
  },
  {
    name: "KitchenAid Artisan Stand Mixer",
    description: "10 speeds for nearly any task or recipe.",
    price: 449.99,
    category: "Kitchen",
    imageUrl: "https://m.media-amazon.com/images/I/81p6v68S96L._AC_SL1500_.jpg",
    stock: 8,
    rating: 5
  },
  {
    name: "Keurig K-Elite Coffee Maker",
    description: "Strong brew and iced coffee settings.",
    price: 189.99,
    category: "Kitchen",
    imageUrl: "https://m.media-amazon.com/images/I/71NnE9XmSGL._AC_SL1500_.jpg",
    stock: 30,
    rating: 4
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "Pressure cooker, slow cooker, and more.",
    price: 99.95,
    category: "Kitchen",
    imageUrl: "https://m.media-amazon.com/images/I/71WtwEvY85L._AC_SL1500_.jpg",
    stock: 40,
    rating: 5
  },
  {
    name: "Samsung 49-inch Odyssey G9",
    description: "1000R curved gaming monitor for total immersion.",
    price: 1299.99,
    category: "Electronics",
    imageUrl: "https://m.media-amazon.com/images/I/6125yAfsJKL._AC_SL1000_.jpg",
    stock: 5,
    rating: 5
  },
  {
    name: "Fitbit Charge 6",
    description: "Fitness tracker with built-in GPS and heart rate monitor.",
    price: 159.95,
    category: "Electronics",
    imageUrl: "https://m.media-amazon.com/images/I/61vYyO-2x+L._AC_SL1500_.jpg",
    stock: 22,
    rating: 4
  },
  {
    name: "Kindle Paperwhite (16 GB)",
    description: "Now with a 6.8\" display and adjustable warm light.",
    price: 149.99,
    category: "Electronics",
    imageUrl: "https://m.media-amazon.com/images/I/51QC8S7mJvL._AC_SL1000_.jpg",
    stock: 60,
    rating: 5
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Clears old data
    await Product.insertMany(labProducts); // Inserts 10 required products
    console.log("✅ Lab #12: 10 Products Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();