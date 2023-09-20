import { useState, useEffect } from "react";
import { Button, Carousel, Container, Image, Spinner, Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';

import DropdownQuantity from "./DropdownQuantity";
import CheckoutModal from "./CheckoutModal";
import { addToCart, getProduct } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [productDetails, setProductDetails] = useState(null);
    const { id } = useParams();
    const { userStatus } = useAuth();

    useEffect(() => {
        const fetchProduct = async (id) => {
            try {
                const response = await getProduct(id)
                if (response) {
                    setProductDetails(response)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
        fetchProduct(id)
    }, [id])

    const handleQuantitySelect = (selectedQuantity) => {
        setQuantity(selectedQuantity);
    };

    const handleInputValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCheckClick = () => {
        setQuantity(inputValue ? parseInt(inputValue) : 1);
        setInputValue("");
    };

    const handleAddClick = async (pId, q) => {
        setShowModal(true)
        const idUser = userStatus.user?.idUser
        //if not iduser, ask to login
        try {
            const data = { personId: idUser, idProduct: pId, quantity: q }
            const response = await addToCart(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-3">
            {isLoading ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4 justify-content-center">
                     <Spinner
                        animation="border"
                        size="lg"
                        role="status"
                        aria-label="Submitting... Please wait."
                    />
                </div>
            ) : (
                <>
                    <Carousel interval={null} className="w-75" data-bs-theme="dark">
                        {productDetails && productDetails.product.imageUrls.map((image, index) => (
                            <Carousel.Item key={index} >
                                <Image
                                    className="d-block w-100"
                                    src={`${imagePath}/${encodeURIComponent(image)}`}
                                    onError={(e) => { e.target.src = '/coming soon.png' }}
                                    alt={image.productName}
                                    style={{ objectFit: "contain", maxHeight: "80vh" }}
                                />
                            </Carousel.Item>
                        ))
                        }
                    </Carousel>
                    <h2 className="text-center">{productDetails && productDetails.product.productName}</h2>
                    <h2>$ {productDetails && productDetails.product.price}</h2>

                    {productDetails && productDetails.product.features && (
                        <div>
                            <h4 className="text-center">Features</h4>
                            <ul>
                                {productDetails.product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="d-flex flex-wrap w-50 justify-content-evenly">
                        <DropdownQuantity
                            quantity={quantity}
                            handleQuantitySelect={handleQuantitySelect}
                            handleInputValueChange={handleInputValueChange}
                            handleCheckClick={handleCheckClick}
                            inputValue={inputValue}
                            stock={productDetails && productDetails.product.stock}
                        />
                        <Button onClick={(p, q) => handleAddClick(productDetails && productDetails.product.idProduct, quantity)}>Add To Cart</Button>
                    </div>

                    {productDetails && productDetails.product.slogan && (
                        <h5>{productDetails.product.slogan}</h5>
                    )}

                    {productDetails && productDetails.product.description && (
                        <span>{productDetails.product.description}</span>

                    )}

                    <div className="w-100">
                        {productDetails && productDetails.product.specifications && (
                            <div className="table-responsive">
                                <span className="fw-bold">Specifications</span>
                                <Table striped borderless variant="light">
                                    <tbody>
                                        {productDetails.product.specifications.map((spec, specIndex) => (
                                            <tr key={specIndex}>
                                                <td>{spec}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>

                    <CheckoutModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        image={productDetails && productDetails.product.imageUrls[0]}
                        product={productDetails && productDetails.product.productName}
                        price={productDetails && productDetails.product.price}
                    />
                </>
            )}
        </Container>
    )
}
export default ProductDetails;