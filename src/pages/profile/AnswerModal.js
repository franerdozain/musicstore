import { Modal } from "react-bootstrap";
import { sendAnswer } from "../../services/api";
import AnswerForm from "./AnswerForm";

const AnswerModal = ({ showAnswerModal, setShowAnswerModal, messageToBeAnswered, setErrorMsg, setMsgSendOk, errorMsg, notify }) => {
    const clearErrorMsg = () => setErrorMsg("");

    const submitAnswerForm = async (data) => {
        const dataForAnswerHandling = {
            [messageToBeAnswered[0].idSenderUser ? 'idReceiverUser' : 'emailReceiver']:
                messageToBeAnswered[0].idSenderUser || messageToBeAnswered[0].emailSender,
            message: data.message,
            subject: data.subject
        }
        const response = await sendAnswer(dataForAnswerHandling);

        if (response.messageOk) {
            setMsgSendOk(response.messageOk);
            // setErrorMsg("");
            setShowAnswerModal(false);
            // notify();          
        } else {
            setErrorMsg(response.error || response.errorEmail)
            // setMsgSendOk("");
            setShowAnswerModal(false);
            // notify();
        }
    }

    return (
        <Modal
            show={showAnswerModal}
            onHide={setShowAnswerModal}
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
                    Answer To Customer
                </h4>
            </Modal.Header>
            <Modal.Body>
                <textarea className="w-100" value={messageToBeAnswered[0].message} readOnly />
                <AnswerForm
                    errorMsg={errorMsg}
                    clearErrorMsg={clearErrorMsg}
                    submitAnswerForm={submitAnswerForm}
                />
                {/* {errorMsg && <small className="text-danger">{errorMsg}</small>} */}
            </Modal.Body>
        </Modal>
    )
}

export default AnswerModal;