import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../api/client.js'
import ProductCard from '../components/ProductCard.jsx'
import { addToCart, setLoading, setProducts } from '../store/index.js'

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { items, page, pages, loading } = useSelector((s) => s.products)

  useEffect(() => {
    async function load() {
      dispatch(setLoading(true))
      try {
        const { data } = await api.get('/products?limit=12&page=1')
        dispatch(setProducts(data))
      } finally {
        dispatch(setLoading(false))
      }
    }
    load()
  }, [dispatch])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} onAdd={(prod) => dispatch(addToCart(prod))} />
          ))}
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">Page {page} of {pages}</div>
    </div>
  )
}