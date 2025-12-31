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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Se connecter
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;