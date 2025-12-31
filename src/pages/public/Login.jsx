import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Récupérer les vrais identifiants du .env
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPass) {
      // Succès : On donne le badge
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Identifiants incorrects.');
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
      `}</style>

    <Container className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: '80vh', zIndex: 1 }}>
      <Card className="glass-card p-4 border-0" style={{ width: '400px' }}>
        <h3 className="text-center mb-4 kinetic-title">Admin Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="spatial-input"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="spatial-input"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 spatial-btn">
            Se connecter
          </Button>
        </Form>
      </Card>
    </Container>
    </div>
  );
};

export default Login;