import { Router } from 'express';
import User from '../models/User.js';
import { authRequired, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authRequired, requireRole('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ items: users });
  } catch (err) {
    next(err);
  }
});

export default router;