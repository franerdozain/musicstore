import { Dropdown, DropdownButton } from "react-bootstrap";

const DropdownSortBy = ({ handleSortByClick, selectedSortBy }) => {

    const handleClick = (e) => {
        handleSortByClick(e)
    }

    return (
        <DropdownButton
            title={selectedSortBy || "Sort By"}
            variant="dark"
            className="mt-2 ms-1 me-2"
        >
            {["Delete Sorting", "Price High to Low", "Price Low to High", "Brand A-Z", "Brand Z-A", "New", "Old"].map((sortBy, idx) => (
                <Dropdown.Item
                    key={idx}
                    onClick={(e) => handleClick(e.target.innerText)}
                    className="sortByDropdown">
                    {sortBy}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    )
}

export default DropdownSortBy;