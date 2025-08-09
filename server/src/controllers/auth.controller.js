import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

function generateToken(userId, role) {
  const secret = process.env.JWT_SECRET || 'devsecret'
  return jwt.sign({ userId, role }, secret, { expiresIn: '7d' })
}

export async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'Email already in use' })
    const user = await User.create({ name, email, password, role })
    const token = generateToken(user._id, user.role)
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })
    const token = generateToken(user._id, user.role)
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    next(err)
  }
}

export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user })
  } catch (err) {
    next(err)
  }
}