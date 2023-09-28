import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';


const ConfirmDeleteAccountModal = ({show, handleDeleteUser, onHide}) => {

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
                    <div className='ms-auto'>
                        <h1>Delete Account</h1>
                    </div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='text-center'>
                        Are you sure you want to delete your account? This action cannot be undone
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button variant='success' onClick={onHide}>Cancel</Button>
                <Button onClick={handleDeleteUser} variant='danger'>Delete Account</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ConfirmDeleteAccountModal;