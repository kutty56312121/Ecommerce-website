import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../app/store';
import { addProduct } from '../features/products/productsSlice';
import { api } from '../api/client';

export default function CreateProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title || price < 0 || stock < 0) {
      setError('Please fill all required fields correctly');
      return;
    }
    const payload = { title, price: Number(price), stock: Number(stock), description };
    try {
      const res = await api.post('/products', payload);
      dispatch(addProduct(res.data.product));
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to create');
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">New Product</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
          <div>
            <label className="block text-sm mb-1">Stock</label>
            <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="px-4 py-2 bg-neutral-900 text-white rounded">Create</button>
      </form>
    </div>
  );
}