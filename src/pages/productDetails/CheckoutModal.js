import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;


const CheckoutModal = ({ onHide, show, image, product, price }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate(`/cart`)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton >
                <img
                    src='/mmLogoBL.png'
                    alt="Music Makers Logo"
                    className="logo-modal float-start me-2 img-fluid"
                />
                <h6 className='mx-auto'>Item Added To Your Cart</h6>
            </Modal.Header>
            <Modal.Body>
                <div className="container d-flex justify-content-between">
                    <img
                        src={`${imagePath}/${image}`}
                        className="card-img-top img-fluid object-fit-contain w-25"
                        alt={product}
                    />
                    <h6 className='align-self-center'>{product}</h6>
                    <h5 className='align-self-center text-center w-25'>$ {price}</h5>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button className='w-50 btn-secondary' onClick={onHide}>Continue Shopping</Button>
                <Button className='w-50 btn-danger' onClick={handleCheckout}>Cart & Checkout</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CheckoutModal;