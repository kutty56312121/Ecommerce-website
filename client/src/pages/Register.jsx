import { useState } from 'react'
import api from '../api/client.js'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/index.js'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) return setError('All fields required')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    try {
      const { data } = await api.post('/auth/signup', { name, email, password })
      localStorage.setItem('token', data.token)
      dispatch(setCredentials({ user: data.user, token: data.token }))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
      <h2 className="text-xl font-semibold">Register</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border p-2 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full px-3 py-2 rounded bg-black text-white dark:bg-white dark:text-black">Create account</button>
    </form>
  )
}