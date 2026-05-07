import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import OrderHistory from './pages/OrderHistory';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes - Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Protected Customer Routes - Requires Login */}
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes - Requires Admin Role */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all for 404s */}
        <Route path="*" element={<div className="p-20 text-center font-bold text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;