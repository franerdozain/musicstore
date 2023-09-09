import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { updatePassword } from "../../services/api";
import NewPasswordForm from "./NewPasswordForm";

const NewPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [tokenEpired, setTokenExpired] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [updatedMsg, setUpdatedMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);


    const onSubmit = async (data) => {
        try {
            setErrorMsg("");
            setLoading(true);
            const response = await updatePassword(token, data.password);

            if (response.error) {
                setDisabled(true);
                setTokenExpired(response.error);
            }
            if (response.message) {
                setDisabled(true);
                setUpdatedMsg(response.message);
            }
        } catch (error) {
            setErrorMsg("Internal server error, please try again in a moment")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="min-vh-100 d-flex justify-content-center my-5">
            <Col xs={11} sm={10} md={8} lg={6} xl={5} xxl={4}>
                <NewPasswordForm
                    onSubmit={onSubmit}
                    loading={loading}
                    setLoading={setLoading}
                    updatedMsg={updatedMsg}
                    disabled={disabled}
                    tokenEpired={tokenEpired}
                    errorMsg={errorMsg}
                />
            </Col>
        </Container>
    );
};

export default NewPassword;