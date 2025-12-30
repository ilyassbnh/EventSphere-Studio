import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import axios from 'axios';

const Events = () => {
  // CHANGED: Direct link to MockAPI (removed trailing slash for safety)
  const API_URL = 'https://694d4617ad0f8c8e6e203fd2.mockapi.io/api/v1';
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState('All');

  // 1. Fetch Data
  useEffect(() => {
    axios.get(`${API_URL}/events`)
      .then(res => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch(err => console.error("Error loading events", err));
  }, []);

  // 2. Filter Logic
  useEffect(() => {
    if (category === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === category));
    }
  }, [category, events]);

  // Placeholder for Redux (Next Step)
  const handleAddToCart = (event) => {
    dispatch(addToCart(event));
    alert(`${event.name} added to cart!`);
  };
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Upcoming Events</h2>
        <p className="text-muted">Discover the best events happening around you</p>

        {/* Category Filters */}
        <ButtonGroup className="mt-3">
          {['All', 'Musique', 'Art', 'Sport', 'Tech'].map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "dark" : "outline-dark"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Events Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredEvents.map((event) => (
          <Col key={event.id}>
            <Card className="h-100 shadow-sm border-0">
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={event.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  // Fallback image in case MockAPI data is missing an image
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fw-bold mb-0">{event.name}</Card.Title>
                  <span className="badge bg-primary rounded-pill">{event.category}</span>
                </div>
                <Card.Text className="text-muted small flex-grow-1">
                  {event.description ? event.description.substring(0, 80) : "No description"}...
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h5 className="mb-0 text-success fw-bold">${event.price}</h5>
                  <Button
                    variant="dark"
                    onClick={() => handleAddToCart(event)}
                  >
                    <i className="bi bi-cart-plus me-2"></i> Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredEvents.length === 0 && (
        <p className="text-center text-muted mt-5">No events found in this category.</p>
      )}
    </Container>
  );
};

export default Events;