import { Modal } from "react-bootstrap";
import ContactUsForm from "./ContactUsForm";
import { useState } from "react";
import { sendMsg } from "../../services/api";

const ModalContactUs = ({ showContactUsModal, setShowContactUsModal }) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const clearErrorMsg = () => setErrorMsg("");


    const submitContactUsForm = async (data) => {
        const response = await sendMsg(data);        
    }
    
    return (
        <Modal
            show={showContactUsModal}
            onHide={setShowContactUsModal}
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
                <h4>
                    We Want To Read You!
                </h4>
            </Modal.Header>
            <Modal.Body>
                <ContactUsForm 
                 errorMsg={errorMsg}
                 successMsg={successMsg}
                 clearErrorMsg={clearErrorMsg}
                 submitContactUsForm={submitContactUsForm}
                />               
            </Modal.Body>
        </Modal>
    )
}

export default ModalContactUs;