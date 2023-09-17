import { useState, useEffect } from "react";
import { Button, Carousel, Container, Image, Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';

import DropdownQuantity from "./DropdownQuantity";
import CheckoutModal from "./CheckoutModal";
import useApi from "../../hooks/useApi";
import { getProduct } from "../../services/api";
const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null);
    const { name, id } = useParams();
    const { data: productResponse, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getProduct, id);

    useEffect(() => {
        if (productResponse) {
            setProductDetails(productResponse)
        }
    }, [productResponse]);

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

    const handleAddClick = (p, q) => {
        setShowModal(true)
    }

    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-3">
            {loadingCategories ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4 justify-content-center">
                    {loadingCategoriesAnimation}
                </div>
            ) : (
                <>
                    <Carousel interval={null} className="w-75" data-bs-theme="dark">
                        {productDetails?.product.imageUrls.map((image, index) => (
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
                    <h2 className="text-center">{productDetails?.product.productName}</h2>
                    <h2>$ {productDetails?.product.price}</h2>

                    {productDetails?.product.features && (
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
                            stock={productDetails?.product.stock}
                        />
                        <Button onClick={(p, q) => handleAddClick(productDetails?.product, quantity)}>Add To Cart</Button>
                    </div>

                    {productDetails?.product.slogan && (
                        <h5>{productDetails.product.slogan}</h5>
                    )}

                    {productDetails?.product.description && (
                        <span>{productDetails.product.description}</span>

                    )}

                    <div className="w-100">
                        {productDetails?.product.specifications && (
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
                        image={productDetails?.product.imageUrls[0]}
                        product={productDetails?.product.productName}
                        price={productDetails?.product.price}
                    /></>)}
        </Container>
    )
}
export default ProductDetails;