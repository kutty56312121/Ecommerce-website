import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, type RootState } from './app/store';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './index.css';

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = useSelector((s: RootState) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Link to="/" className="font-semibold">Shop</Link>
              <nav className="flex gap-4">
                <Link to="/">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6 flex-1">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
