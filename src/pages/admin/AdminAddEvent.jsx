import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminAddEvent = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'https://694d4617ad0f8c8e6e203fd2.mockapi.io/api/v1';
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Check if we are editing an existing event
  const eventToEdit = location.state?.eventToEdit;

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // 2. Initialize State (Empty if new, populated if editing)
  const [formData, setFormData] = useState({
    name: eventToEdit?.name || '',
    category: eventToEdit?.category || '',
    price: eventToEdit?.price || '',
    image: eventToEdit?.image || '', 
    description: eventToEdit?.description || ''
  });

  const [status, setStatus] = useState(null); 
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Cloudinary Upload Logic (Re-integrated)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "EventSphere");
    data.append("cloud_name", "dtpjdj7m4"); 

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtpjdj7m4/image/upload", {
        method: "POST",
        body: data,
      });
      const fileData = await res.json();
      
      if (fileData.secure_url) {
        setFormData((prev) => ({ ...prev, image: fileData.secure_url }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, price: Number(formData.price) };
      
      if (eventToEdit) {
        // 4. If Editing -> Update (PUT)
        await axios.put(`${API_URL}/events/${eventToEdit.id}`, payload);
      } else {
        // 5. If New -> Create (POST)
        await axios.post(`${API_URL}/events`, payload);
      }
      
      setStatus('success');
      
      // Delay redirect so user sees success message
      setTimeout(() => {
        setStatus(null);
        navigate('/admin/dashboard'); 
      }, 1500);
      
    } catch (error) {
      console.error("Erreur", error);
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

        .spatial-input option {
          background-color: #000;
          color: #fff;
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

    <Container className="position-relative" style={{ zIndex: 1, maxWidth: '600px' }}>
      <Card className="glass-card p-4 border-0">
        <h2 className="text-center mb-4 kinetic-title">
          {eventToEdit ? "Modifier l'Événement" : "Ajouter un Événement"}
        </h2>
        
        {status === 'success' && <Alert variant="success">Opération réussie ! Redirection...</Alert>}
        {status === 'error' && <Alert variant="danger">Une erreur est survenue.</Alert>}

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
              className="spatial-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange} required className="spatial-input">
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
              className="spatial-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image de l'événement</Form.Label>
            
            {/* FILE INPUT FOR CLOUDINARY */}
            <Form.Control 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload} 
              disabled={uploading}
              required={!formData.image} // Only required if no image exists yet
              className="spatial-input mb-2"
            />
            
            {uploading && <div className="text-light"><Spinner size="sm" animation="border" /> Téléchargement...</div>}

            {/* PREVIEW IMAGE */}
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Aperçu" 
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '12px' }} 
                />
              </div>
            )}
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
              className="spatial-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 spatial-btn" disabled={uploading}>
            {eventToEdit ? "Mettre à jour" : "Enregistrer l'événement"}
          </Button>

          {/* Cancel Button */}
          <Button 
            variant="link" 
            className="w-100 mt-2 text-white text-decoration-none" 
            onClick={() => navigate('/admin/dashboard')}
          >
            Annuler
          </Button>

        </Form>
      </Card>
    </Container>
    </div>
  );
};

export default AdminAddEvent;