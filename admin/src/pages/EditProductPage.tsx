import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../app/store';
import { updateProduct } from '../features/products/productsSlice';
import { api } from '../api/client';

type Product = { _id: string; title: string; price: number; stock: number; description?: string };

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    })();
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;
    try {
      const res = await api.put(`/products/${product._id}`, {
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description,
      });
      dispatch(updateProduct(res.data.product));
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to update');
    }
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input type="number" step="0.01" value={product.price} onChange={e => setProduct({ ...product, price: Number(e.target.value) })} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
          <div>
            <label className="block text-sm mb-1">Stock</label>
            <input type="number" value={product.stock} onChange={e => setProduct({ ...product, stock: Number(e.target.value) })} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} className="w-full border rounded px-3 py-2" rows={4} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="px-4 py-2 bg-neutral-900 text-white rounded">Save</button>
      </form>
    </div>
  );
}