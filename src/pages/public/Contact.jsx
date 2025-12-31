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

        .spatial-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
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
      `}</style>

    <Container className="position-relative" style={{ zIndex: 1 }}>
      <h2 className="text-center mb-5 kinetic-title display-4">Contact Us</h2>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="glass-card p-4 border-0">
            
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
                    className="spatial-input"
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
                    className="spatial-input"
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
                    className="spatial-input"
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 spatial-btn"
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
    </div>
  );
};

export default Contact;