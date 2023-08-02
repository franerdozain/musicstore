import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BasicModal = ({ onHide, show }) => {
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
                    src='/images/mmLogoBL.png'
                    alt="Music Makers Logo"
                    className="logo-modal float-start me-2 img-fluid"
                />
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default BasicModal;