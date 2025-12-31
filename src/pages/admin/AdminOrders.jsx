import { useEffect, useState } from 'react';
import { Container, Table, Badge, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const AdminOrders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

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
    <Container className="py-5">
      <h2 className="mb-4">Gestion des Commandes</h2>
      
      <Card className="shadow-sm">
        <Table responsive hover className="mb-0">
          <thead className="table-dark">
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
                  <td className="text-success fw-bold">${order.totalAmount}</td>
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
  );
};

export default AdminOrders;