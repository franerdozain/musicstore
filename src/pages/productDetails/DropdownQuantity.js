import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { FaCircleCheck } from "react-icons/fa6";

const DropdownQuantity = ({ quantity, handleQuantitySelect, handleInputValueChange, handleCheckClick, inputValue, stock }) => {
    const isInvalid = inputValue > stock || parseInt(inputValue) === 0;

    const handleInputClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <DropdownButton title={quantity} variant="secondary">
            {Array.from({ length: 10 }, (_, index) => (
                <DropdownItem onClick={() => handleQuantitySelect(index + 1)} key={index}>
                    {index + 1}
                </DropdownItem>
            ))}
            <Dropdown.Divider />
            <DropdownItem onClick={(e) => e.stopPropagation()}>
                <InputGroup>
                    <Form.Control
                        type="number"
                        onClick={handleInputClick}
                        onChange={handleInputValueChange}
                        value={inputValue}
                        isInvalid={isInvalid}
                        min="1"
                    />
                    <Form.Control.Feedback type="invalid">
                        {isInvalid && `Maximum Availabale Quantity: ${stock}`}
                    </Form.Control.Feedback>

                    <InputGroup.Text onClick={() => {
                        if (inputValue <= stock && inputValue > 0) {
                            handleCheckClick();
                        }
                    }}>
                        <FaCircleCheck />
                    </InputGroup.Text>
                </InputGroup>
            </DropdownItem>
        </DropdownButton>
    )
}

export default DropdownQuantity;