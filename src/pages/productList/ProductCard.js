import { Card, Row, Col } from "react-bootstrap";
import { FaHeart } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products, images }) => {
  const navigate = useNavigate();
  const handleClick = (productID, productName) => {
    navigate(`/product/${encodeURIComponent(productName)}/${productID}`)
  }
  return (
    <Row className="w-100 mt-5 mt-md-2 ml-1">
      {products.map((product) => {
        const productImage = images.images.find((image) => image.productID === product.productID);
        const imageUrl = productImage ? productImage.url : '';
        return (
          <Col key={product.productID} xs={12} sm={6} md={4} lg={3} xl={3} xxl={2} className="mb-2" >
            <Card className="h-100" >
              <Card.Img src={imageUrl} alt={product.productName} onClick={() => handleClick(product.productID, product.productName)} />
              <Card.Body>
                <Card.Text onClick={() => handleClick(product.productID, product.productName)}>{product.productName}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="mb-0">$ {product.price}</Card.Text>
                  <FaHeart />
                </div>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default ProductCard;