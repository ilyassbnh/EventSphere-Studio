import { useEffect, useState } from 'react';
import { Container, Table, Button, Image, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'https://694d4617ad0f8c8e6e203fd2.mockapi.io/api/v1';
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events on load
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_URL}/events/${id}`);
        // Remove from UI without reloading
        setEvents(events.filter(event => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
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

        .spatial-btn {
          background: #fff !important;
          color: #000 !important;
          border: none;
          border-radius: 50px;
          padding: 0.6rem 1.5rem;
          font-weight: 600;
          transition: transform 0.2s;
          text-decoration: none;
        }

        .spatial-btn:hover {
          transform: scale(1.05);
          background: #f0f0f0 !important;
          color: #000 !important;
        }
      `}</style>

    <Container className="position-relative" style={{ zIndex: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="kinetic-title">Admin Dashboard - Products</h2>
        <Button as={Link} to="/admin/add" className="spatial-btn">Add New Event</Button>
      </div>

      <Card className="glass-card border-0">
      <Table responsive hover className="mb-0 table-spatial">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>
                  <Image 
                    src={event.image} 
                    alt={event.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} 
                    rounded 
                  />
                </td>
                <td className="fw-bold">{event.name}</td>
                <td>{event.category}</td>
                <td style={{ color: '#00f260', fontWeight: 'bold' }}>${event.price}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(event.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No events found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      </Card>
    </Container>
    </div>
  );
};

export default AdminDashboard;