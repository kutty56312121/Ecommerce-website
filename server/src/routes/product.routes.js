import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js'
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', authenticate, requireAdmin, createProduct)
router.put('/:id', authenticate, requireAdmin, updateProduct)
router.delete('/:id', authenticate, requireAdmin, deleteProduct)

export default router