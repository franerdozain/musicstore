import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { FaCircleCheck } from "react-icons/fa6";

const DropdownQuantity = ({ quantity, handleQuantitySelect, handleInputValueChange, handleCheckClick, inputValue }) => {
    return (
        <DropdownButton title={quantity} variant="secondary">
            {Array.from({ length: 10 }, (_, index) => (
                <DropdownItem onClick={(e) => handleQuantitySelect(e.target.innerText)} key={index}>
                    {index + 1}
                </DropdownItem>
            ))}
            <Dropdown.Divider />
            <DropdownItem onClick={(e) => e.stopPropagation()}>
                <InputGroup>
                    <Form.Control
                        type="number"
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleInputValueChange}
                        value={inputValue}
                    />
                    <InputGroup.Text onClick={handleCheckClick}>
                        <FaCircleCheck />
                    </InputGroup.Text>
                </InputGroup>
            </DropdownItem>
        </DropdownButton>
    )
}

export default DropdownQuantity;