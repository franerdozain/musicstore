import { useEffect, useState } from "react";
import { Button, Col, Table, Image, Form, InputGroup, Spinner, Container } from "react-bootstrap";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import FormShippingData from "../../components/generalComponents/FormShippingData";
import CheckoutModal from "./CheckoutModal";
import { useAuth } from "../../contexts/AuthContext";
import { completePurchase, deleteFromCart, getCart, modifyCartItemQuantity } from "../../services/api";

const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;

const Cart = () => {
    const { userStatus } = useAuth();
    const [modalShow, setModalShow] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [modifiableMsg, setModifiableMsg] = useState("");

    useEffect(() => {
        if (userStatus.isAuthenticated) {
            const fetchCart = async () => {
                try {
                    const response = await getCart()                    
                    if (response.cart) {
                        const uniqueProducts = {};
                        response.cart.forEach((product) => {
                            if (!uniqueProducts[product.idProduct]) {
                              uniqueProducts[product.idProduct] = {
                                ...product,
                                quantity: product.quantity,
                              };
                            } else {
                              uniqueProducts[product.idProduct].quantity += product.quantity;
                            }
                          });
                          
                          const uniqueProductsArray = Object.values(uniqueProducts);
                        setCartItems(uniqueProductsArray)
                    }
                } catch (error) {
                    console.log(`Error: ${error}`);
                }
            }
            fetchCart();
        }
    }, [userStatus.isAuthenticated])

    const handleInputChange = (event, index) => {
        const newValue = parseInt(event.target.value);
        updateQuantity(index, newValue >= 1 ? newValue : 1);
    };

    const handleDecreaseClick = (index, id) => {
        if (cartItems[index].quantity > 1) {
            const fetchDecrease = async () => {
                try {
                    setModifiableMsg(prevMessages => ({ ...prevMessages, [id]: "" }))
                    const response = await modifyCartItemQuantity(id, "decrement")
                    if (response.quantityModified) {
                       
                        const updatedValue = cartItems[index].quantity > 1 ? cartItems[index].quantity - 1 : 1;
                        updateQuantity(index, updatedValue);
                    }
                } catch (error) {
                    console.log(`Error: ${error}`);
                }
            }
            fetchDecrease();
        }
    };

    const handleIncreaseClick = (index, id) => {
        if (cartItems[index].quantity < cartItems[index].product.stock) {
            const fetchDecrease = async () => {
                try {
                    const response = await modifyCartItemQuantity(id, "increment")
                    if (response.quantityModified) {
                        const updatedValue = cartItems[index].quantity < cartItems[index].product.stock ? cartItems[index].quantity + 1 : cartItems[index].quantity;
                        updateQuantity(index, updatedValue);
                    }
                } catch (error) {
                    console.log(`Error: ${error}`);
                }
            }
            fetchDecrease();
        } else {
            setModifiableMsg(prevMessages => ({ ...prevMessages, [id]: "Maximum Quantity Available Today, More Coming! :-)" }));
        }
    };

    const updateQuantity = (index, value) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = value;
        setCartItems(updatedCartItems);
    };

    const handleDeleteItem = (productName, id) => {
        const deleteItem = async () => {
            try {
                const response = await deleteFromCart(id)
                if (response.affectedRows) {
                    const updatedCartItems = cartItems.filter(item => item.idProduct !== id);
                    setCartItems(updatedCartItems);
                }
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
        deleteItem();
    }

    const handlePurchase = () => {
        const products = cartItems.map(cartItem => ({
            idProduct: cartItem.idProduct,
            quantity: cartItem.quantity,
            unitPrice: cartItem.product.price
        }));

        const makePurchase = async () => {
            try {
                await completePurchase(products);
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
        setModalShow(true)
        makePurchase();
    }

   


    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-3">
            <>
                {userStatus.user === null ? (
                    <Spinner
                        animation="border"
                        size="lg"
                        role="status"
                        aria-label="Submitting... Please wait."
                    />
                ) : (
                    <>
                        {!userStatus.isAuthenticated ? (
                             <p>Please create an account or login</p>
                        ) : (
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="flex-grow-1">
                                    <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8} className="min-vh-100 table-responsive mx-auto mt-2">
                                        <h2 className="text-center bg-secondary rounded text-white p-1 mt-3">Your Cart:</h2>
                                        <Table striped borderless variant="light">
                                            <tbody>
                                                {cartItems && cartItems.length > 0 ? (
                                                    cartItems.map((cartItem, index) => (
                                                        <tr key={index}>
                                                            <td>                                                                
                                                                <Image src={`${imagePath}/${cartItem.product.image}`} fluid rounded style={{ maxHeight: "10vh", maxWidth: "fit-content" }} />
                                                            </td>
                                                            <td>{cartItem.product.productName}</td>
                                                            <td>
                                                                <div className="d-flex flex-column align-items-center align-items-md-start">
                                                                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                                                        <BsDashCircle
                                                                            style={{ cursor: "pointer", color: "blue", margin: "0.2em" }}
                                                                            onClick={() => handleDecreaseClick(index, cartItem.idProduct)}
                                                                        />
                                                                        <InputGroup className="w-50">
                                                                            <Form.Control
                                                                                className="rounded-bottom rounded-top text-center"
                                                                                onClick={(e) => e.preventDefault()}
                                                                                onChange={(e) => handleInputChange(e, index)}
                                                                                value={cartItem.quantity}
                                                                                isInvalid={cartItem.quantity < 1 || cartItem.quantity > cartItem.product.stock}
                                                                                min="1"
                                                                                readOnly='true'
                                                                            />
                                                                            <small className="text-danger">{modifiableMsg[cartItem.idProduct]}</small>
                                                                        </InputGroup>
                                                                        <BsPlusCircle
                                                                            style={{ cursor: "pointer", color: "blue", margin: "0.2em" }}
                                                                            onClick={() => handleIncreaseClick(index, cartItem.idProduct)}
                                                                        />
                                                                        <MdDelete size={20} style={{ cursor: "pointer", marginLeft: "0.3em" }} onClick={() => handleDeleteItem(cartItem.productName, cartItem.idProduct)} />
                                                                    </div>
                                                                    <h6 className="mt-2 mt-md-0 align-self-center">${(cartItem.product.price * cartItem.quantity).toFixed(2)}</h6>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))) : (
                                                    <h1>There's nothing in your cart, time to add something :D</h1>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </div>

                                <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={5}>
                                    <div className="mx-1 mx-md-4">
                                        <FormShippingData />
                                        <div className="mx-1 mx-md-4 mt-4 border rounded text-center">
                                            <h2>Order Summary</h2>
                                            <h3>Total: {cartItems && cartItems.length > 0 ? cartItems.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0).toFixed(2) : '0.00'}</h3>
                                            <Button variant="danger" className="my-2" onClick={handlePurchase}>Checkout</Button>
                                        </div>
                                    </div>
                                </Col>
                                {cartItems && cartItems.length > 0 && (<>
                                    <CheckoutModal show={modalShow} onHide={() => { setModalShow(false); setCartItems([]) }} image={cartItems && cartItems[0].product.image} cartQuantity={cartItems && cartItems.length} />
                                </>
                                )
                                }
                            </div>
                        )}
                    </>
                )}
            </>
        </Container>
    )
}
export default Cart;