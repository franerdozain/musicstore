import { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Offcanvas } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';


function CategoriesMenu({ categories }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)

  const handleToggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleCategoryClick = (categoryID) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryID ? null : categoryID
    );
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.categoryID)
  };

  return (
    <div className='container'>
      <Button variant="primary" className="d-md-none" onClick={handleToggleMenu}>
        Categories
      </Button>
      {/* big screen menu */}

      <ButtonGroup vertical className="d-none d-md-inline-flex">
        {categories.categories.map((category) => (
          category.parentID === null && (
            <DropdownButton              
              as={ButtonGroup}
              title={category.categoryName}
              key={category.categoryID}
              drop="end"
              variant="light"
              onClick={() => {
                handleCategoryClick(category.categoryID);
              }}             
            >
              {categories.categories.some(subcategory => subcategory.parentID === category.categoryID) ? (
                categories.categories.map((subcategory => (
                  subcategory.parentID === category.categoryID && (
                    <DropdownItem
                      className='text-center'
                      key={subcategory.categoryID}
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      {subcategory.categoryName}
                    </DropdownItem>
                  )
                )))
              ) : (
                <Dropdown.Item
                  className='text-center'
                  onClick={() => handleSubcategoryClick(category)}>
                  {category.categoryName}
                </Dropdown.Item>
              )
              }
            </DropdownButton>
          )
        ))}
      </ButtonGroup>

      {/* small screen menu */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categorías</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {categories.categories.map((category) => (
              category.parentID === null && (
                <li key={category.categoryID}>
                  <button onClick={() => handleCategoryClick(category.categoryID)}>
                    {category.categoryName}
                  </button>
                  {/* subcategories */}
                  {selectedCategory === category.categoryID && (
                    <ul>
                      {categories.categories.map((subcategory) => (
                        subcategory.parentID === category.categoryID && (
                          <li key={subcategory.categoryID}>{subcategory.categoryName}</li>
                        )
                      ))}
                    </ul>
                  )}
                </li>
              )
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CategoriesMenu;