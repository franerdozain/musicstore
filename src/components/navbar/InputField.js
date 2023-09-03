import { Form, InputGroup } from "react-bootstrap";

const InputField = ({ typeInput, textInput, name, value, onChange, errorText, disabled, marginBottom, multiple }) => {
    return (
        <Form.Group controlId={textInput} className="w-100">
            <InputGroup className={`${marginBottom || "mb-3"}`}>
                <InputGroup.Text className="justify-content-center" required>{textInput}</InputGroup.Text>
                <Form.Control
                    as={typeInput === "textarea" ? "textarea" : "input"}
                    disabled={disabled}
                    type={typeInput}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="text-center"
                    multiple={typeInput === "file" ? "true" : "false"}
                    required 
                />
                {errorText && <small className="text-danger">{errorText}</small>}
            </InputGroup>
        </Form.Group>
    )
}
export default InputField;