import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, type RootState } from './app/store';
import ProductsAdminPage from './pages/ProductsAdminPage';
import EditProductPage from './pages/EditProductPage';
import CreateProductPage from './pages/CreateProductPage';
import UsersAdminPage from './pages/UsersAdminPage';
import LoginPage from './pages/LoginPage';
import './index.css';

function AdminRoute({ children }: { children: React.ReactElement }) {
  const user = useSelector((s: RootState) => s.auth.user);
  return user?.role === 'admin' ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Link to="/" className="font-semibold">Admin</Link>
              <nav className="flex gap-4">
                <Link to="/">Products</Link>
                <Link to="/users">Users</Link>
                <Link to="/login">Login</Link>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6 flex-1">
            <Routes>
              <Route path="/" element={<AdminRoute><ProductsAdminPage /></AdminRoute>} />
              <Route path="/products/new" element={<AdminRoute><CreateProductPage /></AdminRoute>} />
              <Route path="/products/:id" element={<AdminRoute><EditProductPage /></AdminRoute>} />
              <Route path="/users" element={<AdminRoute><UsersAdminPage /></AdminRoute>} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
