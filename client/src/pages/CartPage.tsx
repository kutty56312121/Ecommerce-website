import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { removeFromCart, decrementQuantity, clearCart } from '../features/cart/cartSlice';

export default function CartPage() {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="space-y-3">
        {items.map(it => (
          <div key={it.productId} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-neutral-600">${it.price.toFixed(2)} x {it.quantity}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-2 py-1 border rounded" onClick={() => dispatch(decrementQuantity({ productId: it.productId }))}>-</button>
              <button className="px-2 py-1 border rounded" onClick={() => dispatch(removeFromCart({ productId: it.productId }))}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
        <button className="px-4 py-2 bg-neutral-900 text-white rounded" onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
}