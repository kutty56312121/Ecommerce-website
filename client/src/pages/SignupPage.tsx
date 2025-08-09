import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../app/store';
import { setCredentials } from '../features/auth/authSlice';
import { api } from '../api/client';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      dispatch(setCredentials(res.data));
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Signup failed');
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2" required minLength={2} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required minLength={6} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="w-full py-2 bg-neutral-900 text-white rounded">Create account</button>
      </form>
      <div className="mt-3 text-sm">Already have an account? <Link to="/login" className="underline">Login</Link></div>
    </div>
  );
}