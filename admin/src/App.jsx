import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

function Dashboard() {
  return <div className="p-4">Dashboard overview</div>
}

function Products() {
  return <div className="p-4">Admin products management</div>
}

function Users() {
  return <div className="p-4">Registered users list</div>
}

function Login() {
  return <div className="p-4">Admin login</div>
}

function ThemeToggle() {
  function toggle() {
    const root = document.documentElement
    root.classList.toggle('dark')
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light')
  }
  return (
    <button onClick={toggle} className="px-3 py-1 rounded border">
      Toggle Theme
    </button>
  )
}

function Shell({ children }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="font-semibold">Admin</Link>
        <nav className="flex items-center gap-4">
          <Link to="/products">Products</Link>
          <Link to="/users">Users</Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
