import { useState, useEffect } from "react";
import { Button, Carousel, Col, Container, Image, Spinner, Table, Toast } from "react-bootstrap";
import { useParams } from 'react-router-dom';

import DropdownQuantity from "./DropdownQuantity";
import CheckoutModal from "./CheckoutModal";
import { addToCart, getProduct } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../../components/navbar/AuthModal";
import DescriptionComponent from "./DescriptionComponent";
import ScrollToTopButton from "../../components/generalComponents/ScrollToTopButton";
const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [notLoggedToast, setNotLoggedToast] = useState(false);
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
        const idUser = userStatus.user?.idUser        
        if(!idUser) {
            setNotLoggedToast(true);
        } else if(idUser){
            try {              
                const data = { personId: idUser, idProduct: pId, quantity: q }
                const response = await addToCart(data);
                response && setShowModal(true)        
            } catch (error) {
                console.log(error)
            }
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
                    <Carousel interval={null} className="w-100" data-bs-theme="dark">
                        {productDetails && productDetails.product.imageUrls.map((image, index) => (
                            <Carousel.Item key={index} >
                                <Image
                                    className="d-block w-100"
                                    src={`${imagePath}/${encodeURIComponent(image)}`}
                                    onError={(e) => { e.target.src = '/coming soon.png' }}
                                    alt={image.productName}
                                    style={{ objectFit: "contain", maxHeight: "50vh" }}
                                />
                            </Carousel.Item>
                        ))
                        }
                    </Carousel>                   
                    <h2 className="product-name-product-details text-center w-75 my-5 p-2 rounded shadow">{productDetails && productDetails.product.productName}</h2>                   
                    <h2 className="fw-bold p-2 rounded mt-2 shadow mb-4">$ {productDetails && productDetails.product.price}</h2>

                    {productDetails && productDetails.product.features && productDetails.product.features.length > 0 && (
                        <div className="shadow bg-body-tertiary rounded mt-2 mb-4">
                            <h4 className="text-center fw-bold pt-2">Features</h4>
                            <ul className="pe-3">
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
                            <div style={{ position: 'relative' }}>
                                <Button className="add-item-button-with-shine" onClick={(p, q) => handleAddClick(productDetails && productDetails.product.idProduct, quantity)}>Add To Cart</Button>
                                <Toast
                                    show={notLoggedToast}
                                    onClose={() => setNotLoggedToast(false)}
                                    delay={3000}
                                    autohide style={{
                                        position: 'absolute',
                                        top: '100%',
                                        bottom: '100%',
                                        left: '0%',
                                        zIndex: 9999
                                    }}>
                                    <Toast.Header>
                                        <strong className="mr-auto">Please Login</strong>
                                    </Toast.Header>
                                </Toast>
                            </div>
                        </div>

                        {productDetails && productDetails.product.slogan && (
                            <h5 className="my-4 shadow p-3 bg-body-tertiary rounded fst-italic">{productDetails.product.slogan}</h5>
                        )}

                    {productDetails && productDetails.product.description && (                        
                        <DescriptionComponent description={productDetails.product.description} />
                    )}

                    <div className="w-100">
                        {productDetails && productDetails.product.specifications && (
                            <div className="table-responsive">
                                <h4 className="text-center fw-bold">Specifications</h4>
                                <Table className="table-striped-custom text-center" borderless variant="light">
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
                    <ScrollToTopButton />
                </>
            )}
        </Container>
    )
}
export default ProductDetails;