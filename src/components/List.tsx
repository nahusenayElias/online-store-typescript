import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Product from "./Product";
import { fetchProducts } from "../features/productSlice";
import { calculateTotalOfProducts } from "../utils/utils";
import { Alert, Container, Row } from "react-bootstrap";

const List = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const totalOfProducts = calculateTotalOfProducts(products);

  return (
    <Container className="my-4">
      {/* Notification Toast */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        {notification && (
          <Alert variant="success" onClose={() => setNotification(null)} dismissible>
            {notification}
          </Alert>
        )}
      </div>

      <h2>Total in Cart: ${totalOfProducts}</h2>
      <Row className="g-4">
        {products.map((product) => (
          <Product
            key={product.id}
            {...product}
            
          />
        ))}
      </Row>
    </Container>
  );
};

export default List;