import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import ProductsPage from './pages/Products.jsx'
import CartPage from './pages/Cart.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Shop</h1>
      <p className="text-muted-foreground">Discover our latest products.</p>
    </div>
  )
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

function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="font-semibold">Shop</Link>
        <nav className="flex items-center gap-4">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
