import { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const AdminAddEvent = () => {
  // URL de l'API depuis le .env ou en dur si besoin
  const API_URL = import.meta.env.VITE_API_URL || 'https://694d4617ad0f8c8e6e203fd2.mockapi.io/api/v1';

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '', // On stocke une URL d'image pour l'instant
    description: ''
  });

  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Conversion du prix en nombre
      const payload = { ...formData, price: Number(formData.price) };
      
      await axios.post(`${API_URL}/events`, payload);
      
      setStatus('success');
      // Reset du formulaire
      setFormData({ name: '', category: '', price: '', image: '', description: '' });
      
      // Enlever le message de succès après 3 secondes
      setTimeout(() => setStatus(null), 3000);
      
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      setStatus('error');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow p-4">
        <h2 className="text-center mb-4">Ajouter un Événement</h2>
        
        {status === 'success' && <Alert variant="success">Événement ajouté avec succès !</Alert>}
        {status === 'error' && <Alert variant="danger">Erreur lors de l'ajout.</Alert>}

        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label>Nom de l'événement</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Ex: Concert Jazz, Match Final..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Choisir une catégorie...</option>
              <option value="Musique">Musique</option>
              <option value="Art">Art</option>
              <option value="Sport">Sport</option>
              <option value="Tech">Tech</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prix du ticket (€)</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de l'image</Form.Label>
            <Form.Control 
              type="url" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
              placeholder="https://example.com/image.jpg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Enregistrer l'événement
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminAddEvent;