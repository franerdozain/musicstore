import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import AuthForm from "./AuthForm";
import NewPasswordModal from "./NewPasswordModal";
import { loginUser, registerUser } from "../../services/api";

const AuthModal = ({ show, onHide, modalType, handleLoggedIn }) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitAuthForm = async (data) => {
        data.role = "user";
        setIsSubmitting(true);

        try {
            setErrorMsg("");
            if (modalType === "registration") {
                const responseData = await registerUser(data);
                if (responseData.errorExistingEmail) {
                    setErrorMsg(responseData.errorExistingEmail);
                }
                if (responseData.message) {
                    setSuccessMsg(responseData.message)
                    onHide()
                    setSuccessMsg("")
                }
            } else if (modalType === "login") {
                const responseData = await loginUser(data);
                if (responseData.errorInexistentEmail) {
                    setErrorMsg(responseData.errorInexistentEmail)
                }
                if (responseData.errorWrongPassword) {
                    setErrorMsg(responseData.errorWrongPassword)
                }
                if (responseData.idUser) {
                    handleLoggedIn();
                    onHide();
                }
            }
        } catch (error) {
            setErrorMsg("Internal server error, please try again in a moment")
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleForgotPassword = () => {
        setForgotPasswordModal(true);
    };

    const clearErrorMsg = () => setErrorMsg("");

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide();
                setErrorMsg("");
            }}
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
                    {modalType === "login" ? "Login" : "Registration"}
                </h4>
            </Modal.Header>
            <Modal.Body>
                <AuthForm
                    formType={modalType}
                    submitAuthForm={submitAuthForm}
                    isSubmitting={isSubmitting}
                    errorMsg={errorMsg}
                    successMsg={successMsg}
                    clearErrorMsg={clearErrorMsg}
                />
                {modalType === "login" && (
                    <Button onClick={handleForgotPassword} variant="link">
                        Forgot password?
                    </Button>
                )}
                {forgotPasswordModal && (
                    <NewPasswordModal show={forgotPasswordModal} onHide={() => setForgotPasswordModal(false)} />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;