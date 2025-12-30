import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';

// Import Pages
import Events from './pages/public/Events';
import Cart from './pages/public/Cart';
import AdminAddEvent from './pages/admin/AdminAddEvent';
import AdminDashboard from './pages/admin/AdminDashboard';
// import Checkout from './pages/public/Checkout'; // We will build this next

function App() {
  return (
    <Router>
      <AppNavbar /> {/* Always visible */}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Events />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Admin Routes */}
        <Route path="/admin/add" element={<AdminAddEvent />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;