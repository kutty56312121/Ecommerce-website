import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../app/store';
import { setCredentials } from '../features/auth/authSlice';
import { api } from '../api/client';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch(setCredentials(res.data));
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required minLength={6} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="w-full py-2 bg-neutral-900 text-white rounded">Login</button>
      </form>
      <div className="mt-3 text-sm">No account? <Link to="/signup" className="underline">Sign up</Link></div>
    </div>
  );
}