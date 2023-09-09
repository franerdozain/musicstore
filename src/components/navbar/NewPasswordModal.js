import { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Spinner } from "react-bootstrap";

import { newPassword } from "../../services/api";

const NewPasswordModal = ({ onHide, show }) => {
    const [email, setEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [newPassLinkSentMsg, setNewPassLinkSentMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setErrorMsg("");
            //setTimeout for testing loading animation
            await new Promise(r => setTimeout(r, 2000));

            const responseData = await newPassword(email);
            if (responseData.notFound) {
                setErrorMsg(responseData.notFound);
            }
            if (responseData.message) {
                setNewPassLinkSentMsg(responseData.message);
            }
        }
        catch (error) {
            setErrorMsg("Internal server error, please try again in a moment");
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
                <h4 className="my-0">
                    New Password
                </h4>
            </Modal.Header>
            <Modal.Body className="my-1 p-4 text-center">
                <Form
                    className="d-flex flex-column justify-content-center align-items-center"
                    onSubmit={handleResetSubmit}
                >
                    <Form.Group controlId="E-mail" className="w-100">
                        <Col xs={12} sm={11} md={11} lg={7} className="mx-auto">
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="justify-content-center" required>E-mail</InputGroup.Text>
                                <Form.Control
                                    disabled={loading}
                                    type="email"
                                    name="email"
                                    value={email}
                                    defaultValue={email || ""}
                                    onChange={(event) => { setEmail(event.target.value); setErrorMsg(""); setNewPassLinkSentMsg("") }}
                                    className="text-center"
                                    required
                                />
                            </InputGroup>
                            {errorMsg && <small className="text-danger">{errorMsg}</small>}
                        </Col>
                    </Form.Group>
                    {newPassLinkSentMsg && <small className="mb-3 text-secondary">{newPassLinkSentMsg}</small>}
                    <Button className="w-50 mt-3" variant="danger" type="submit" disabled={loading}>
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
                <Button onClick={onHide} className="w-50 mt-3 mx-auto" variant="secondary">
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    )
}
export default NewPasswordModal;