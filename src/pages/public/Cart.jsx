import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { removeFromCart, clearCart } from '../../redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Container className="py-5">
      <h2 className="mb-4">Shopping Cart ({cart.totalQuantity} items)</h2>

      {cart.items.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
          <Button variant="primary" className="mt-3">Go to Events</Button>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <Table responsive bordered hover className="bg-white shadow-sm">
              <thead className="table-light">
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
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} 
                          className="rounded"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.totalPrice}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="warning" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
          </div>

          {/* Checkout Summary */}
          <div className="col-lg-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <span className="fw-bold fs-4">${cart.totalAmount}</span>
                </div>
                <Button variant="success" className="w-100" size="lg">
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;