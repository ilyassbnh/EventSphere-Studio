import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AdminAddEvent from './pages/admin/AdminAddEvent';

function App() {
  return (
    <div className="App">
       {/* Test direct de l'étape 1 */}
       <AdminAddEvent />
    </div>
  );
}

export default App;
