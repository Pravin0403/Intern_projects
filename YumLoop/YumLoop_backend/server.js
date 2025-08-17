import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import http from 'http';
import setupSocket from './socket/socket.js';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimit.js';

// Routers
import addressRouter from './Routers/addressRouter.js';
import cartRouter from './Routers/cartRouter.js';
import categoryRouter from './Routers/categoryRouter.js';
import deliveryPartnerRouter from './Routers/deliveryPartnerRouter.js';
import ecomOrderRouter from './Routers/ecomOrderRouter.js';
import foodOrderRouter from './Routers/foodOrderRouter.js';
import foodReviewRouter from './Routers/foodReviewRouter.js';
import menuItemRouter from './Routers/menuItemRouter.js';
import messageRouter from './Routers/messageRouter.js';
import paymentRouter from './Routers/paymentRouter.js';
import postRouter from './Routers/postRouter.js';
import productReviewRouter from './Routers/productReviewRouter.js';
import productRouter from './Routers/productRouter.js';
import reelRouter from './Routers/reelRouter.js';
import restaurantRouter from './Routers/restaurantRouter.js';
import storyRouter from './Routers/storyRouter.js';
import wishlistRouter from './Routers/wishlistRouter.js';
import userRouter from './Routers/userRouter.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));
app.use(apiLimiter);
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(cookieParser());

// Serve static files from uploads directory with CORS headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, express.static('uploads'));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routers
app.use('/api/address', addressRouter);
app.use('/api/cart', cartRouter);
app.use('/api/category', categoryRouter);
app.use('/api/delivery-partner', deliveryPartnerRouter);
app.use('/api/ecom-order', ecomOrderRouter);
app.use('/api/food-order', foodOrderRouter);
app.use('/api/food-review', foodReviewRouter);
app.use('/api/menu-item', menuItemRouter);
app.use('/api/message', messageRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/post', postRouter);
app.use('/api/product-review', productReviewRouter);
app.use('/api/product', productRouter);
app.use('/api/reel', reelRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/story', storyRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/user', userRouter);
app.use('/api/users', userRouter);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yumloop';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.log('Please check:');
    console.log('1. Your internet connection');
    console.log('2. MongoDB Atlas IP whitelist');
    console.log('3. Connection string format');
  });

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});

app.use(errorHandler);
