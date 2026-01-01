import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';

// Import Pages
import Home from './pages/public/Home';
import Events from './pages/public/Events';
import Cart from './pages/public/Cart';
import AdminAddEvent from './pages/admin/AdminAddEvent';
import AdminDashboard from './pages/admin/AdminDashboard';
import Checkout from './pages/public/Checkout';
import AdminOrders from './pages/admin/AdminOrders';
import Login from './pages/public/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/public/Contact';

function App() {
  return (
    <Router>
      <AppNavbar /> {/* Always visible */}

      <Routes>
        {/* --- ROUTES PUBLIQUES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />

        {/* --- ROUTES PROTÉGÉES (ADMIN) --- */}
        {/* Tout ce bloc doit être DANS <Routes> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AdminAddEvent />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

      </Routes> {/* <--- On ferme Routes ICI, pas avant */}
    </Router>
  );
}

export default App;