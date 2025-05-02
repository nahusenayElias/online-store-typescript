import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { removeFromCart } from "../features/productSlice";
import { useState, useEffect } from "react";
import { Button, Alert, Card, Col, Row, Container } from "react-bootstrap";
import { calculateTotalOfProducts } from "../utils/utils";

export default function Cart() {
  const cart = useAppSelector((state) => state.products.cart);
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState<string | null>(null);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    setNotification("Product removed from cart successfully!");
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const total = calculateTotalOfProducts(cart);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Shopping Cart</h2>

      {/* Notification Toast */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        {notification && (
          <Alert variant="danger" onClose={() => setNotification(null)} dismissible>
            {notification}
          </Alert>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-4">Your cart is empty.</p>
          <Button variant="outline-primary" href="/">Continue Shopping</Button>
        </div>
      ) : (
        <>
          <Row className="g-4 mb-4">
            {cart.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: '200px', objectFit: 'contain' }}
                    className="p-3"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6 flex-grow-1">{product.title}</Card.Title>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold">${product.price.toFixed(2)}</span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="border-top pt-4 text-end">
            <h4 className="mb-3">
              Total: <span className="text-primary">${total}</span>
            </h4>
            <Button variant="success" size="lg">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
}