import { Card, Row, Col, Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaHeart } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import { addToWishlist, deleteFromWishlist } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;

const ProductCard = ({ products, setProducts }) => {
  const navigate = useNavigate();
  const { userStatus } = useAuth();

  const handleClick = (idProduct, productName) => {
    navigate(`/product/${encodeURIComponent(productName)}/${idProduct}`)
  }

  const handleWishlist = async (product) => {
    try {
      if (!product.isInWishlist) {
        const response = await addToWishlist(product.idProduct);
        if (response.addOk) {
          product.isInWishlist = 1;
          setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(p => {
              if (p.idProduct === product.idProduct) {
                return { ...p, isInWishlist: 1 };
              }
              return p;
            });
            return updatedProducts;
          });
        }
      } else if (product.isInWishlist) {
        const response = await deleteFromWishlist(product.idProduct);
        if (response.deleteOk) {
          product.isInWishlist = 0;
          setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(p => {
              if (p.idProduct === product.idProduct) {
                return { ...p, isInWishlist: 0 };
              }
              return p;
            });
            return updatedProducts;
          });
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  return (
    <Row className="w-100 mt-5 mt-md-2 ml-1">
      {products?.map((product, idx) => {
        return (
          <Col key={`${product.productID}-${idx}`} xs={12} sm={6} md={4} lg={3} xl={3} xxl={2} className="mb-2" >
            <Card className="h-100" >
              <Carousel interval={null} data-bs-theme="dark">
                {product.imageUrls.map((img, idx) => (
                  <Carousel.Item key={idx} interval={null}>
                    <img className="d-block w-100 "
                      src={`${imagePath}/${encodeURIComponent(img)}`}
                      onError={(e) => { e.target.src = '/coming soon.png' }}
                      alt={product.productName}
                      onClick={() => handleClick(product.idProduct, product.productName)}
                    />
                  </Carousel.Item>
                ))
                }
              </Carousel>
              <Card.Body>
                <Card.Text onClick={() => handleClick(product.idProduct, product.productName)}>{product.productName}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="mb-0">$ {product.price}</Card.Text>   
                  {userStatus.isAuthenticated ? (
                    <FaHeart onClick={() => handleWishlist(product)} style={{ color: product.isInWishlist ? 'red' : 'black' }} />
                  ) : (
                    <OverlayTrigger
                    key="top"
                    placement="top"
                    trigger={"click"}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            You must be logged in
                        </Tooltip>}
                    rootClose
                >
                    <div>
                    <FaHeart />                        
                    </div>
                </OverlayTrigger>
                  )
                  }                                  
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