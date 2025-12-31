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
      <Container className="py-5 text-center">
        <h3>Votre panier est vide.</h3>
        <Button variant="primary" onClick={() => navigate('/')}>Retour aux événements</Button>
      </Container>
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
    <Container className="py-5">
      <h2 className="mb-4">Finaliser la commande</h2>
      <Row>
        {/* Formulaire Client */}
        <Col md={7}>
          <Card className="shadow-sm p-4 mb-4">
            <h4 className="mb-3">Vos Coordonnées</h4>
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
                />
              </Form.Group>

              <Button 
                variant="success" 
                type="submit" 
                className="w-100 mt-3" 
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
          <Card className="shadow-sm">
            <Card.Header className="bg-light fw-bold">Résumé du Panier</Card.Header>
            <ListGroup variant="flush">
              {cart.items.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">Qté: {item.quantity} x ${item.price}</small>
                  </div>
                  <span className="text-muted">${item.totalPrice}</span>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-between fw-bold bg-light">
                <span>Total à payer</span>
                <span>${cart.totalAmount}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;