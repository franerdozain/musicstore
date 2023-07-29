import { Form, InputGroup } from "react-bootstrap";
import { SlMagnifier } from 'react-icons/sl'

const SearchBar = () => {
    return (
        <>
            <Form className="d-flex">
                <InputGroup>
                    <Form.Control
                        type="search"
                        placeholder="Search"                       
                        aria-label="Search"
                    />
                    <InputGroup.Text>
                        <SlMagnifier />
                    </InputGroup.Text>
                </InputGroup>
            </Form>
        </>
    )
}
export default SearchBar;