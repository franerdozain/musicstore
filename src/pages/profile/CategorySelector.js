import { Button, Dropdown, DropdownButton } from "react-bootstrap";

import SearchBar from "../../components/navbar/SearchBar";

const CategorySelector = ({
    title,
    withSearchBar = null,
    selectedCategory,
    loadingCategories,
    loadingCategoriesAnimation,
    handleCategoryClick,
    categoriesWithNullParent,
    selectedSubcategory,
    subcategories,
    handleSubcategoryClick,
    withDeleteButton = null,
    selectedCategoryForDelete,
    selectedSubcategoryForDelete,
    deleteText }) => {

    return (
        <div className="mt-4 border rounded me-4 d-flex flex-column w-100 ">
            <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">{title}</h2>
            <div className="d-flex flex-wrap">
                <div className="bg-primary text-white h-50">
                    <DropdownButton title={selectedCategory}>
                        {loadingCategories ? (
                            <Dropdown.Item>{loadingCategoriesAnimation}</Dropdown.Item>
                        ) : (
                            <>
                                {categoriesWithNullParent.map((category, idx) => (
                                    <Dropdown.Item key={idx} onClick={() => handleCategoryClick(category)}>{category.categoryName}</Dropdown.Item>
                                ))}
                            </>
                        )
                        }
                    </DropdownButton>
                </div>
                <div className="bg-primary text-white h-50">
                    {subcategories.length > 0 && (
                        <DropdownButton title={selectedSubcategory}>
                            {subcategories.map((subcategory, idx) => (
                                <Dropdown.Item key={idx} onClick={() => handleSubcategoryClick(subcategory)}>{subcategory.categoryName}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    )}
                </div>
                {withSearchBar && (
                    <div className="col-md-6 ">
                        <SearchBar />
                    </div>
                )
                }
                {withDeleteButton && (
                    <Button
                        disabled={selectedCategoryForDelete === "Category" && selectedSubcategoryForDelete === "Subcategory"}
                        variant="danger"
                        className="mb-5"
                    >
                        {deleteText}
                    </Button>
                )}
            </div>
        </div>
    )
}
export default CategorySelector;