import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        .spatial-navbar {
          background: rgba(5, 5, 5, 0.85) !important;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Space Grotesk', sans-serif;
        }

        .spatial-navbar .navbar-brand {
          font-weight: 700;
          letter-spacing: -0.03em;
          background: linear-gradient(90deg, #fff, rgba(255,255,255,0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .spatial-navbar .nav-link {
          color: rgba(255, 255, 255, 0.6) !important;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .spatial-navbar .nav-link:hover,
        .spatial-navbar .nav-link.active {
          color: #fff !important;
          text-shadow: 0 0 20px rgba(255,255,255,0.3);
        }

        .spatial-nav-dropdown .dropdown-menu {
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          margin-top: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .spatial-nav-dropdown .dropdown-item {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s;
        }

        .spatial-nav-dropdown .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
      `}</style>

      <Navbar expand="lg" className="sticky-top spatial-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">EventSphere</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Events</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            
            {/* Admin Dropdown */}
            <NavDropdown 
              title="Admin" 
              id="admin-nav-dropdown" 
              className="spatial-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders">Orders</NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              <NavDropdown.Item as={Link} to="/admin/add">Add Event</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart">
              <i className="bi bi-cart-fill me-2"></i>
              Cart
              {totalQuantity > 0 && (
                <Badge bg="danger" className="ms-2">{totalQuantity}</Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default AppNavbar;