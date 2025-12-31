import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // On vérifie si le flag "isAdmin" est présent dans le stockage local
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Si oui, on affiche la page demandée (Outlet). Sinon, on renvoie au Login.
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;