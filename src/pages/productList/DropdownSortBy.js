import { Dropdown, DropdownButton } from "react-bootstrap";

const DropdownSortBy = () => {
    return (
        <DropdownButton title="Sort By" variant="light" className="mt-2">
            <Dropdown.Item>Price High to Low</Dropdown.Item>
            <Dropdown.Item>Price Low to High</Dropdown.Item>
        </DropdownButton>
    )
}
export default DropdownSortBy;