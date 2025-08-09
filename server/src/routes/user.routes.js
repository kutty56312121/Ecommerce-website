import { Router } from 'express'
import User from '../models/user.model.js'
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

export default router