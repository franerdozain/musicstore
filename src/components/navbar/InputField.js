import React from "react";
import { Form, InputGroup } from "react-bootstrap";


const InputField = React.forwardRef(({ typeInput, textInput, name, value, onChange, errorText, disabled, marginBottom, multiple, placeholder }, ref) => {
    return (
        <Form.Group controlId={textInput} className="w-100">
            <InputGroup className={`${marginBottom || "mb-3"}`}>
                <InputGroup.Text className="justify-content-center" required>{textInput}</InputGroup.Text>
                <Form.Control
                    as={typeInput === "textarea" ? "textarea" : "input"}                    
                    disabled={disabled}
                    type={typeInput}
                    name={name}
                    // value={value || ""}
                    defaultValue={value || ""}
                    onChange={onChange}
                    className="text-center"
                    multiple={multiple = typeInput === "file" ? true : false}
                    placeholder={placeholder || "nothing"}
                    ref={ref}
                    // required 
                />
                {errorText && <small className="text-danger">{errorText}</small>}
            </InputGroup>
        </Form.Group>
    )
});

export default InputField;