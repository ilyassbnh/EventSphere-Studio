import { useEffect, useState } from 'react';
import { Container, Table, Button, Image } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [events, setEvents] = useState([]);

  // Fetch events on load
  useEffect(() => {
    fetchEvents();
  }, []);

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
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard - Products</h2>
        <Button variant="success">Add New Event</Button> {/* Link will go here later */}
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
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
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    rounded 
                  />
                </td>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>${event.price}</td>
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
    </Container>
  );
};

export default AdminDashboard;