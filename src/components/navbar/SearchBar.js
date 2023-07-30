import { Form, InputGroup } from "react-bootstrap";
import { SlMagnifier } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate();
    const handleSearchCLick = () => {
        navigate("/search")
    }
    return (
        <>
            <Form className="d-flex  col-xxl-8 flex-grow-1 my-2">
                <InputGroup>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <InputGroup.Text onClick={handleSearchCLick} role="button">
                        <SlMagnifier />
                    </InputGroup.Text>
                </InputGroup>
            </Form>
        </>
    )
}
export default SearchBar;