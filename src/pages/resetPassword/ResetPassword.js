import { Button, Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updatePassword } from "../../services/api";
import InputField from "../../components/navbar/InputField";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    useEffect(() => {
        if ((password === reEnterPassword) || (!password && !reEnterPassword)) {
            setNewPassword(password)
            setPasswordsMatch(true)
            setPasswordErrorMsg("")
        } else {
            setPasswordsMatch(false);
            setPasswordErrorMsg("Passwords don't match")
        }
    }, [password, reEnterPassword])

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "password":
                setPassword(value);
                break;
            case "reEnterPassword":
                setReEnterPassword(value);
        }
    };

    const handleSubmit = async () => {
        if (passwordsMatch) {
            try {
                const response = await updatePassword(token, newPassword);
                console.log("response", response);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
    }

    return (
        <Container className="min-vh-100 d-flex justify-content-center my-5">
            <Row className="d-flex justify-content-center">
                <Col  className="text-center">
                    <InputField typeInput={"password"} textInput={"Password"} name={"password"} value={password} onChange={handleInputChange} />
                    <InputField typeInput={"password"} textInput={"Re enter Password"} name={"reEnterPassword"} value={reEnterPassword} onChange={handleInputChange} />  
                    {passwordErrorMsg && <small className="text-danger">{passwordErrorMsg}</small>}                 
                    <Button onClick={handleSubmit} className="w-75">Submit</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default ResetPassword; 