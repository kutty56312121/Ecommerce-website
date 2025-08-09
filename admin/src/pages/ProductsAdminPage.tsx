import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../app/store';
import { setProducts, removeProduct } from '../features/products/productsSlice';
import { api } from '../api/client';

export default function ProductsAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.products.items);

  useEffect(() => {
    (async () => {
      const res = await api.get('/products', { params: { limit: 100 } });
      dispatch(setProducts(res.data.items));
    })();
  }, [dispatch]);

  async function onDelete(id: string) {
    await api.delete(`/products/${id}`);
    dispatch(removeProduct(id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link to="/products/new" className="px-3 py-2 bg-neutral-900 text-white rounded">New Product</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border" />
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}>
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">${p.price.toFixed(2)}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border text-right">
                  <Link to={`/products/${p._id}`} className="px-2 py-1 border rounded mr-2">Edit</Link>
                  <button onClick={() => onDelete(p._id)} className="px-2 py-1 border rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}