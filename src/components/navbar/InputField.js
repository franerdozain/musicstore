import { Form, InputGroup } from "react-bootstrap";

const InputField = ({ typeInput, textInput, name, value, onChange, errorText }) => {
    return (
        <Form.Group controlId={textInput} className="w-100">
            <InputGroup className="mb-3">
                <InputGroup.Text className=" justify-content-center" required>{textInput}</InputGroup.Text>
                <Form.Control type={typeInput} name={name} value={value || ""} onChange={onChange} className="text-center" required />
                {errorText && <small className="text-danger">{errorText}</small>}
            </InputGroup>
        </Form.Group>
    )
}
export default InputField;