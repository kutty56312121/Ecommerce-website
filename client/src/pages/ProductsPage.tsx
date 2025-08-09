import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../app/store';
import { setProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { api } from '../api/client';

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, page, limit, total } = useSelector((s: RootState) => s.products);

  useEffect(() => {
    (async () => {
      const res = await api.get('/products', { params: { page, limit } });
      dispatch(setProducts(res.data));
    })();
  }, [dispatch, page, limit]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => (
          <div key={p._id} className="border rounded-lg p-3 flex flex-col">
            <div className="aspect-square bg-neutral-100 rounded mb-2" />
            <div className="font-medium truncate">{p.title}</div>
            <div className="text-sm text-neutral-600 line-clamp-2">{p.description}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="font-semibold">${p.price.toFixed(2)}</div>
              <button
                onClick={() => dispatch(addToCart({ productId: p._id, title: p.title, price: p.price }))}
                className="px-3 py-1 rounded bg-neutral-900 text-white text-sm"
              >Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-neutral-600">Total: {total}</div>
      </div>
    </div>
  );
}