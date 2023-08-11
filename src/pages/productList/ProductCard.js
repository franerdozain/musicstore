import { Card, Row, Col } from "react-bootstrap";
import { FaHeart } from 'react-icons/fa6';

const ProductCard = ({ products, images }) => {
  return (
    <Row className="w-100 mt-5 mt-md-2 ml-1">      
      {products.map((product) => {
          const productImage = images.images.find((image) => image.productID === product.productID);
          const imageUrl = productImage ? productImage.url : '';
          return(
        <Col key={product.productID} xs={12} sm={6} md={4} lg={3} xl={3} xxl={2} className="mb-2" > 
          <Card className="h-100" >           
            <Card.Img variant="top" src={imageUrl} alt={product.productName} />          
            <Card.Body>
              <Card.Text>{product.productName}</Card.Text>
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