import { Button, Form, Modal, Spinner } from "react-bootstrap"
import InputField from "./InputField"
import { useEffect, useState } from "react"
import { loginUser, registerUser } from "../../services/api"
import ResetPasswordModal from "./ResetPasswordModal"

const AuthModal = ({ show, onHide, modalType, handleLoggedIn }) => {
    const [userData, setUserData] = useState({
        "username": "",
        "email": "",
        "country": "",
        "state": "",
        "city": "",
        "zip": "",
        "shippingAddress": "",
        "password": "",
        "role": "user"
    });
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [existingEmailErrorMsg, setExistingEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setUserData({
            "username": "",
            "email": "",
            "country": "",
            "state": "",
            "city": "",
            "zip": "",
            "shippingAddress": "",
            "password": "",
            "role": "user"
        });
        setPassword("");
        setReEnterPassword("");
        setPasswordsMatch(true);
        setExistingEmailErrorMsg("");
        setPasswordErrorMsg("");
    }

    useEffect(() => {
        if ((password === reEnterPassword) || (!password && !reEnterPassword)) {
            setPasswordsMatch(true)
            setPasswordErrorMsg("")
        } else {
            setPasswordsMatch(false);
            setPasswordErrorMsg("Passwords don't match")
        }

    }, [password, reEnterPassword])

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        name === "password" && setPassword(value);
        name === "reEnterPassword" && setReEnterPassword(value);
        name === "email" && setExistingEmailErrorMsg("");

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegistration = async (event) => {
        event.preventDefault();
        if (passwordsMatch) {
            try {
                setLoading(true);

                //setTimeout for testing loading animation
                await new Promise(r => setTimeout(r, 2000))

                const responseData = await registerUser(userData);
                if (responseData.error && responseData.error === "Email already exists") {
                    setExistingEmailErrorMsg("Email already exists")
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setPasswordsMatch(false)
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            //setTimeout for testing loading animation
            await new Promise(r => setTimeout(r, 2000)) 
                                 
            const responseData = await loginUser(userData)
            if (responseData.idUser) {
                handleLoggedIn()
                onHide()
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
            setLoading(false)
        }
    }

    const renderModalType = () => {
        if (modalType === "login") {
            return (
                <Form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleLogin}>
                    <InputField typeInput={"email"} textInput={"E-mail"} name={"email"} value={userData.email} onChange={handleInputChange} />
                    <InputField typeInput={"password"} textInput={"Password"} name={"password"} value={userData.password} onChange={handleInputChange} />
                </Form>
            )
        } else if (modalType === "registration") {
            return (
                <Form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleRegistration}>
                    <InputField typeInput={"email"} textInput={"Email"} name={"email"} value={userData.email} onChange={handleInputChange} errorText={existingEmailErrorMsg} />
                    <InputField typeInput={"text"} textInput={"Username"} name={"username"} value={userData.username} onChange={handleInputChange} />
                    <InputField typeInput={"text"} textInput={"Shipping Address"} name={"shippingAddress"} value={userData.shippingAddress} onChange={handleInputChange} />
                    <InputField typeInput={"text"} textInput={"Country"} name={"country"} value={userData.country} onChange={handleInputChange} />
                    <InputField typeInput={"text"} textInput={"City"} name={"city"} value={userData.city} onChange={handleInputChange} />
                    <InputField typeInput={"text"} textInput={"State"} name={"state"} value={userData.state} onChange={handleInputChange} />
                    <InputField typeInput={"text"} textInput={"Zip"} name={"zip"} value={userData.zip} onChange={handleInputChange} />
                    <InputField typeInput={"password"} textInput={"Password"} name={"password"} value={userData.password} onChange={handleInputChange} />
                    <InputField typeInput={"password"} textInput={"Re-Enter Password"} name={"reEnterPassword"} value={userData.reEnterPassword} onChange={handleInputChange} errorText={passwordErrorMsg} />
                </Form>
            )
        }
    }

    const handleForgotPassword = () => {
        setForgotPasswordModal(true);
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide();
                resetForm();
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

            <Modal.Body >
                {renderModalType()}
                {modalType === "login" && <Button onClick={handleForgotPassword} variant="link">Forgot password?</Button>}
                {forgotPasswordModal && <ResetPasswordModal show={forgotPasswordModal} onHide={() => { setForgotPasswordModal(false) }} />}
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    type="submit"
                    className="w-50"
                    onClick={modalType === "login" ? handleLogin : handleRegistration}
                >
                    {loading && (
                        <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-label="Submitting... Please wait."
                        />
                    )}
                    {modalType === "login" ? "Login" : "Create Account"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal;



