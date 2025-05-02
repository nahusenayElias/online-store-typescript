import { Button, Card, Col } from "react-bootstrap";
import { useAppDispatch } from "../hooks/hooks";
import { addToCart } from "../features/productSlice";
// import '../assets/List.css';
interface Rating {
    rate: number;
    count: number;
}

interface IProps {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    rating: Rating;
}

export default function Product(props: IProps) {
    const { image, title, price, rating, description } = props;
    const dispatch = useAppDispatch();

    const handleAddProduct = () => {
        dispatch(addToCart({
            id: props.id,
            image: props.image,
            title: props.title,
            price: props.price,
            description: props.description,
            rating: props.rating
        }));

    };

    return (
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 shadow">
            <Card.Img
              variant="top"
              src={image}
              alt={title}
              style={{ height: '200px', objectFit: 'contain' }}
              className="p-3"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-6 flex-grow-1">{title}</Card.Title>
              <Card.Text className="text-muted small">
                {description.substring(0, 50)}...
              </Card.Text>
              <div className="mt-auto">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">${price.toFixed(2)}</span>
                  <span className="text-warning">★ {rating.rate}</span>
                </div>
                <Button
                  onClick={handleAddProduct}
                  variant="primary"
                  className="w-100"
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    }