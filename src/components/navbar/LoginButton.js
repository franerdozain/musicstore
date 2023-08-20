import { Dropdown } from "react-bootstrap";

const LoginButton = ({ Icon, text, onClick }) => {
    return (
        <Dropdown.Item onClick={onClick}>
                <Icon size={25} className="me-2" />
                {text}
        </Dropdown.Item>
    )
}

export default LoginButton;