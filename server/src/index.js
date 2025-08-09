import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { errorHandler, notFoundHandler } from './utils/errorHandlers.js';
import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

// Config
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce_app';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:5174';

// Middlewares
app.use(helmet());
app.use(cors({ origin: [CLIENT_ORIGIN, ADMIN_ORIGIN], credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// 404 and Errors
app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();