import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const CONTACT_WEBHOOK = import.meta.env.VITE_N8N_CONTACT_URL;

    try {
      if (CONTACT_WEBHOOK) {
        // Send data to n8n
        await axios.post(CONTACT_WEBHOOK, formData);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        console.error("Webhook URL missing in .env");
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Contact Us</h2>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 p-4">
            
            {status === 'success' && (
              <div className="text-center py-4">
                <h4 className="text-success mb-3"><i className="bi bi-check-circle-fill"></i> Message Sent!</h4>
                <p>Thanks for reaching out. We will reply to {formData.email || 'you'} soon.</p>
                <Button variant="outline-primary" onClick={() => setStatus(null)}>Send another</Button>
              </div>
            )}

            {status === 'error' && (
              <Alert variant="danger" onClose={() => setStatus(null)} dismissible>
                Something went wrong. Please try again later.
              </Alert>
            )}

            {status !== 'success' && (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    placeholder="How can we help?" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required 
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;