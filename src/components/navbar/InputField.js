import { Form, InputGroup } from "react-bootstrap";

const InputField = ({ typeInput, textInput }) => {
    return (
        <Form.Group controlId={textInput} className="w-100">
            <InputGroup className="mb-3">
                <InputGroup.Text className=" justify-content-center">{textInput}</InputGroup.Text>
                <Form.Control type={typeInput} className="text-center" />
            </InputGroup>
        </Form.Group>
    )
}
export default InputField;