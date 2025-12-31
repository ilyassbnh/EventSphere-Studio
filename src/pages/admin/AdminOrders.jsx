import { useEffect, useState } from 'react';
import { Container, Table, Badge, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminOrders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      // On inverse pour voir les plus récentes en premier
      setOrders(response.data.reverse());
    } catch (error) {
      console.error("Erreur chargement commandes:", error);
    }
  };

  return (
    <div className="spatial-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        .spatial-wrapper {
          background-color: #050505;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(76, 29, 149, 0.15), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(14, 165, 233, 0.15), transparent 25%);
          min-height: 100vh;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          padding-top: 4rem;
          padding-bottom: 4rem;
          position: relative;
        }

        .spatial-wrapper::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
          overflow: hidden;
        }

        .kinetic-title {
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .table-spatial {
          --bs-table-bg: transparent;
          --bs-table-color: rgba(255, 255, 255, 0.8);
          --bs-table-border-color: rgba(255, 255, 255, 0.1);
          --bs-table-hover-bg: rgba(255, 255, 255, 0.05);
          --bs-table-hover-color: #fff;
        }

        .table-spatial thead th {
          background-color: rgba(255, 255, 255, 0.05);
          color: #fff;
          border-bottom-width: 1px;
          font-weight: 500;
        }
      `}</style>

    <Container className="position-relative" style={{ zIndex: 1 }}>
      <h2 className="mb-5 kinetic-title text-center">Gestion des Commandes</h2>
      
      <Card className="glass-card border-0">
        <Table responsive hover className="mb-0 table-spatial">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Client</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td className="fw-bold">{order.client?.fullName || 'Anonyme'}</td>
                  <td>{order.client?.email || '-'}</td>
                  <td className="fw-bold" style={{ color: '#00f260' }}>${order.totalAmount}</td>
                  <td>
                    <Badge bg={order.status === 'Pending' ? 'warning' : 'success'}>
                      {order.status || 'Confirmé'}
                    </Badge>
                  </td>
                  <td>
                    {/* Pour l'instant on affiche juste le nombre d'items */}
                    <small>{order.items?.length || 0} articles</small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">Aucune commande trouvée.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
    </div>
  );
};

export default AdminOrders;