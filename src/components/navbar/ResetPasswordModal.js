import { Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"
import InputField from "./InputField";
import { resetPassword } from "../../services/api";

const ResetPasswordModal = ({ onHide, show }) => {
    const [email, setEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [recoverPasswordEmail, setRecoverPasswordEmail] = useState("");
    
    const handleResetSubmit = async (event) => {
        event.preventDefault();
        try {
            const responseData = await resetPassword(email);
            if (responseData.error && responseData.error === "The email doesn't exist in our database or has a typo") {
                setErrorMsg("The email doesn't exist in our database or has a typo")
            }
            if (!responseData.error) {
                setRecoverPasswordEmail("An email with a link to recover your password was sent to your email account")                 
            }
        }
        catch (error) {
            console.log("Error: ", error);
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
                    src='/images/mmLogoBL.png'
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
                        onChange={(event) => {setEmail(event.target.value); setErrorMsg(""); setRecoverPasswordEmail("")}}
                    />
                    {recoverPasswordEmail && <small className="mb-3 text-secondary">A link was sent to your email account :-)</small>}
                <Button className="w-50" variant="danger" type="submit">
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