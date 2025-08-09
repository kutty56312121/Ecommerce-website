import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../store/index.js'

export default function CartPage() {
  const { items } = useSelector((s) => s.cart)
  const dispatch = useDispatch()

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i._id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-gray-500">Qty: {i.quantity} x ${i.price}</div>
              </div>
              <button className="text-red-600" onClick={() => dispatch(removeFromCart(i._id))}>Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between font-semibold border-t pt-3">
            <div>Subtotal</div>
            <div>${subtotal.toFixed(2)}</div>
          </div>
          <button className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black" onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      )}
    </div>
  )
}