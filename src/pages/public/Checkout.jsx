import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../../redux/cartSlice';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rediriger si le panier est vide (Sécurité)
  if (cart.items.length === 0) {
    return (
      <div className="spatial-wrapper">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
          .spatial-wrapper {
            background-color: #050505;
            background-image: radial-gradient(circle at 15% 50%, rgba(76, 29, 149, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(14, 165, 233, 0.15), transparent 25%);
            min-height: 100vh;
            color: #fff;
            font-family: 'Space Grotesk', sans-serif;
            padding-top: 4rem;
            padding-bottom: 4rem;
            position: relative;
          }
          .spatial-btn {
            background: #fff !important;
            color: #000 !important;
            border: none;
            border-radius: 50px;
            padding: 0.8rem 2rem;
            font-weight: 600;
            transition: transform 0.2s;
          }
          .spatial-btn:hover { transform: scale(1.02); background: #f0f0f0 !important; }
        `}</style>
        <Container className="py-5 text-center position-relative" style={{ zIndex: 1 }}>
          <h3 className="mb-4">Votre panier est vide.</h3>
          <Button className="spatial-btn" onClick={() => navigate('/')}>Retour aux événements</Button>
        </Container>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

    // 1. Prepare Order Object
    const newOrder = {
      client: formData,
      items: cart.items,
      totalAmount: cart.totalAmount,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    try {
      // 2. Save to Database (MockAPI) - CRITICAL
      await axios.post(`${API_URL}/orders`, newOrder);

      // 3. Trigger Email (n8n) - OPTIONAL / BACKGROUND
      // We use a separate try/catch so if n8n fails, the user still gets their order validated.
      try {
        if (N8N_URL && N8N_URL.includes('http')) {
           // We don't await this if we want it to be fast, but for now let's keep it simple
           axios.post(N8N_URL, newOrder); 
           console.log("Email trigger sent to n8n");
        }
      } catch (n8nError) {
        console.warn("n8n trigger failed (is the server running?):", n8nError);
        // We do NOT block the user flow here.
      }

      // 4. Success Flow
      dispatch(clearCart());
      alert("Order confirmed! check your email.");
      navigate('/'); 

    } catch (error) {
      console.error("Database Error:", error);
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        }

        .kinetic-title {
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .spatial-input {
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          border-radius: 12px;
          padding: 0.8rem 1rem;
        }

        .spatial-input:focus {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05) !important;
        }

        .spatial-btn {
          background: #fff !important;
          color: #000 !important;
          border: none;
          border-radius: 50px;
          padding: 0.8rem 2rem;
          font-weight: 600;
          transition: transform 0.2s;
        }

        .spatial-btn:hover {
          transform: scale(1.02);
          background: #f0f0f0 !important;
          color: #000 !important;
        }

        .spatial-wrapper .list-group-item {
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
        }
      `}</style>

    <Container className="position-relative" style={{ zIndex: 1 }}>
      <h2 className="mb-5 kinetic-title text-center">Finaliser la commande</h2>
      <Row className="g-5">
        {/* Formulaire Client */}
        <Col md={7}>
          <Card className="glass-card border-0 p-4">
            <h4 className="mb-4 fw-bold">Vos Coordonnées</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nom Complet</Form.Label>
                <Form.Control 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                  placeholder="John Doe"
                  className="spatial-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="john@example.com"
                  className="spatial-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="+33 6 12 34 56 78"
                  className="spatial-input"
                />
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100 mt-4 spatial-btn" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement...' : `Payer $${cart.totalAmount}`}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Résumé de la commande */}
        <Col md={5}>
          <Card className="glass-card border-0 p-4">
            <h4 className="mb-4 fw-bold">Résumé du Panier</h4>
            <ListGroup variant="flush">
              {cart.items.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="my-0 text-white">{item.name}</h6>
                    <small className="text-white-50">Qté: {item.quantity} x ${item.price}</small>
                  </div>
                  <span className="fw-bold" style={{ color: '#00f260' }}>${item.totalPrice}</span>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-between fw-bold pt-4 border-top border-secondary border-opacity-25">
                <span className="fs-5">Total à payer</span>
                <span className="fs-4" style={{ color: '#00f260' }}>${cart.totalAmount}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Checkout;