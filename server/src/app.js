import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app