import { Router } from 'express';
import { z } from 'zod';
import Product from '../models/Product.js';
import { authRequired, requireRole } from '../middleware/auth.js';

const router = Router();

const productSchema = z.object({
  title: z.string().min(1),
  rate: z.number().min(0).max(5).optional(),
  description: z.string().optional(),
  discount: z.number().min(0).max(100).optional(),
  clothType: z.enum(['men', 'women', 'kids', 'unisex', 'other']).optional(),
  price: z.number().min(0),
  stock: z.number().min(0),
  images: z.array(z.string()).optional(),
});

// Create (admin)
router.post('/', authRequired, requireRole('admin'), async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await Product.create(data);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
});

// List (public) with pagination
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 12, 1), 100);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(),
    ]);
    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
});

// Get by id (public)
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: item });
  } catch (err) {
    next(err);
  }
});

// Update (admin)
router.put('/:id', authRequired, requireRole('admin'), async (req, res, next) => {
  try {
    const data = productSchema.partial().parse(req.body);
    const item = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: item });
  } catch (err) {
    next(err);
  }
});

// Delete (admin)
router.delete('/:id', authRequired, requireRole('admin'), async (req, res, next) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;