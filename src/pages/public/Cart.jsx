import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { removeFromCart, clearCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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
                    overflow: hidden;
                }

                .kinetic-title {
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .table-spatial {
                    --bs-table-bg: transparent;
                    --bs-table-color: rgba(255, 255, 255, 0.8);
                    --bs-table-border-color: rgba(255, 255, 255, 0.1);
                    --bs-table-hover-bg: rgba(255, 255, 255, 0.05);
                    --bs-table-hover-color: #fff;
                }

                .table-spatial thead th {
                    background-color: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border-bottom-width: 1px;
                    font-weight: 500;
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
            <h2 className="mb-5 kinetic-title">Shopping Cart ({cart.totalQuantity} items)</h2>

            {cart.items.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-white-50 mb-4">Your cart is empty</h4>
                    <Button as={Link} to="/" className="spatial-btn">Go to Events</Button>
                </div>
            ) : (
                <div className="row">
                    {/* Cart Items List */}
                    <div className="col-lg-8">
                        <Card className="glass-card border-0 mb-4">
                        <Table responsive hover className="mb-0 table-spatial">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map((item) => (
                                    <tr key={item.id} className="align-middle">
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px', borderRadius: '8px' }}
                                                />
                                                <span className="fw-bold">{item.name}</span>
                                            </div>
                                        </td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td style={{ color: '#00f260', fontWeight: 'bold' }}>${item.totalPrice}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                style={{ borderRadius: '50px' }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        </Card>
                        <div className="d-flex justify-content-end">
                            <Button variant="outline-danger" onClick={() => dispatch(clearCart())} style={{ borderRadius: '50px' }}>Clear Cart</Button>
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <Card className="glass-card border-0">
                            <Card.Body className="p-4">
                                <Card.Title className="mb-4 fs-4">Order Summary</Card.Title>
                                
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="text-white-50">Total Amount</span>
                                    <span className="fw-bold fs-3" style={{ color: '#00f260' }}>${cart.totalAmount}</span>
                                </div>
                                <Button as={Link} to="/checkout" className="w-100 spatial-btn">
                                    Proceed to Checkout
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )}
        </Container>
        </div>
    );
};

export default Cart;