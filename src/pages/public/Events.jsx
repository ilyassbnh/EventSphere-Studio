import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; // Check your path
import axios from 'axios';
import EventCard from '../../components/EventCard';// Import the new component

const Events = ({ onEdit }) => { // Accepts onEdit from App.jsx
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

  const handleAddToCart = (event) => {
    dispatch(addToCart(event));
  };

  return (
    <div className="spatial-wrapper">
      {/* GLOBAL STYLES (Passed down to EventCard via CSS classes) */}
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
          padding-bottom: 120px;
          position: relative;
          overflow-x: hidden;
        }

        /* Noise overlay */
        .spatial-wrapper::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .hero-section {
          padding: 8rem 0 4rem;
          position: relative;
          z-index: 1;
        }

        .kinetic-type {
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.04em;
          background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.4) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .bottom-nav-container {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          width: max-content;
          max-width: 90vw;
        }

        .glass-pill-nav {
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 0.5rem;
          display: flex;
          gap: 0.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          overflow-x: auto;
        }

        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-btn.active {
          background: #fff;
          color: #000;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        /* CARD STYLES (Used by EventCard.jsx) */
        .bento-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          height: 100%;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .bento-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6);
          background: rgba(255, 255, 255, 0.04);
        }

        .card-img-wrapper {
          height: 260px;
          position: relative;
          overflow: hidden;
        }

        .card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .bento-card:hover .card-img-wrapper img {
          transform: scale(1.08);
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .price-tag {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #00f260, #0575e6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .action-btn {
          background: #fff;
          color: #000;
          border: none;
          border-radius: 50px;
          padding: 0.7rem 1.5rem;
          font-weight: 600;
          transition: transform 0.2s;
        }

        .action-btn:hover {
          transform: scale(1.05);
          background: #f0f0f0;
        }
      `}</style>

      <Container className="position-relative" style={{ zIndex: 1 }}>
        {/* Hero Section */}
        <div className="hero-section text-center">
          <h1 className="kinetic-type">
            FUTURE<br />EVENTS
          </h1>
          <p className="text-white-50 fs-5" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Curated experiences for the digital age. Immerse yourself in the next generation of culture.
          </p>
        </div>

        {/* Events Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredEvents.map((event) => (
            <Col key={event.id}>
              {/* Render the separated Card Component */}
              <EventCard 
                event={event} 
                onAddToCart={handleAddToCart}
                onEdit={onEdit} 
              />
            </Col>
          ))}
        </Row>

        {filteredEvents.length === 0 && (
          <div className="text-center py-5 mt-5">
            <p className="text-white-50 fs-4">No signals detected in this sector.</p>
          </div>
        )}
      </Container>

      {/* Fixed Bottom Navigation Bar */}
      <div className="bottom-nav-container">
        <div className="glass-pill-nav">
          {['All', 'Musique', 'Art', 'Sport', 'Tech'].map((cat) => (
            <button
              key={cat}
              className={`nav-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;