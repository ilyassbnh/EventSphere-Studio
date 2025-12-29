import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAddEvent from './pages/admin/AdminAddEvent';
import Events from './pages/public/Events';

function App() {
  return (
    <div className="App">
       <AdminAddEvent />
    </div>
  );
}
export default App;