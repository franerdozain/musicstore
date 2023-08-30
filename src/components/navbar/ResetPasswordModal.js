import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { useState } from "react"
import InputField from "./InputField";
import { resetPassword } from "../../services/api";

const ResetPasswordModal = ({ onHide, show }) => {
    const [email, setEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [recoverPasswordEmail, setRecoverPasswordEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleResetSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            //setTimeout for testing loading animation
            await new Promise(r => setTimeout(r, 2000))        

            const responseData = await resetPassword(email);
            if (responseData.notFound) {
                setErrorMsg(responseData.notFound)
            }            
            if (responseData.message) {
                setRecoverPasswordEmail(responseData.message)                                        
            }
        }
        catch (error) {
            console.log("Error: ", error);
        } finally {
            setLoading(false);
        }
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
                <Form
                    className="d-flex flex-column justify-content-center align-items-center"
                    onSubmit={handleResetSubmit}
                >
                    {errorMsg && <small className="text-danger">{errorMsg}</small>}
                    <InputField
                        typeInput={"email"}
                        textInput={"E-mail"}
                        name={"email"}
                        value={email}
                        onChange={(event) => { setEmail(event.target.value); setErrorMsg(""); setRecoverPasswordEmail("") }}
                    />
                    {recoverPasswordEmail && <small className="mb-3 text-secondary">{recoverPasswordEmail}</small>}
                    <Button className="w-50" variant="danger" type="submit">
                        {loading && (
                            <Spinner
                                animation="border"
                                size="sm"
                                role="status"
                                aria-label="Submitting... Please wait."
                            />
                        )}
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button onClick={onHide} className="w-50" variant="secondary">
                    Close
                </Button>
            </Modal.Footer>

        </Modal>
    )
}
export default ResetPasswordModal;