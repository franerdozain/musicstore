import Button from 'react-bootstrap/Button';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { Modal, Image, Badge } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';
const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;


const CheckoutModal = ({ onHide, show, image, cartQuantity }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onHide()
        navigate("/home")
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <img
                    src='/mmLogoBL.png'
                    alt="Music Makers Logo"
                    className="logo-modal float-start me-2 img-fluid"
                />
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='text-center'><h1>Thank You!</h1></div>
                    <div className='text-center mt-3 mb-4'>
                        {cartQuantity > 1 ? (
                            <Badge className='me-4' bg="secondary">
                                <Image src={`${imagePath}/${image}`} alt='' fluid rounded style={{ maxHeight: "10vh", maxWidth: "fit-content" }} className='me-1' />
                                <FaPlus />                              
                            </Badge>
                        ) : (
                            <Image src={image} fluid rounded style={{ maxHeight: "10vh", maxWidth: "fit-content" }} className='me-4' />
                        )}
                        <GiCheckMark style={{ color: "green", transform: "scale(3)" }} />
                    </div>
                    <div className='text-center'>
                        Details in Profile <BsArrowRight className='mx-2' />Shopping History
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button onClick={handleClick}>Close & Go Home</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CheckoutModal;