import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">EventSphere</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Events</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {/* Admin Links for testing */}
            <Nav.Link as={Link} to="/admin/dashboard" className="text-warning">Admin</Nav.Link>
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
  );
};

export default AppNavbar;