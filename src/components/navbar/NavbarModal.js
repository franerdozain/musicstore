import { Button, Form, Modal } from "react-bootstrap"
import InputField from "./InputField"

const NavbarModal = ({ show, onHide, modalType }) => {

    const renderModalType = () => {
        if (modalType === "login") {
            return (
                <Form className="d-flex flex-column justify-content-center align-items-center">
                    <InputField typeInput={"email"} textInput={"E-mail"} />
                    <InputField typeInput={"password"} textInput={"Password"} />
                </Form>
            )
        } else if (modalType === "registration") {
            return (
                <Form className="d-flex flex-column justify-content-center align-items-center">
                    <InputField typeInput={"email"} textInput={"Email"} />
                    <InputField typeInput={"text"} textInput={"Username"} />
                    <InputField typeInput={"text"} textInput={"Shipping Address"} />
                    <InputField typeInput={"text"} textInput={"Country"} />
                    <InputField typeInput={"text"} textInput={"City"} />
                    <InputField typeInput={"text"} textInput={"State"} />
                    <InputField typeInput={"text"} textInput={"Zip"} />
                    <InputField typeInput={"password"} textInput={"Password"} />
                    <InputField typeInput={"password"} textInput={"Re-Enter Password"} />
                </Form>
            )
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
                <h4> {modalType === "login" ? "Login" : "Registration"}</h4>
            </Modal.Header>

            <Modal.Body >
                {renderModalType()}
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="primary" type="submit" className="w-50">
                    {modalType === "login" ? "Login" : "Create Account"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NavbarModal;