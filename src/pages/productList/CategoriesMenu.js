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

  const handleCategoryClick = (idCategory) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === idCategory ? null : idCategory
    );
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.idCategory)
  };

  return (
    <div className='container'>
      <Button variant="light" className="d-md-none mt-2 position-relative" onClick={handleToggleMenu}>
        Categories
      </Button>

      {/* big screen menu */}
      <ButtonGroup vertical className="d-none d-md-inline-flex mt-2">
       
        { categories.map((category) => (
          category.idCategoryParent === null && (
            <DropdownButton              
              as={ButtonGroup}
              title={category.categoryName}
              key={category.idCategory}
              drop="end"
              variant="light"
              onClick={() => {
                handleCategoryClick(category.idCategory);
              }}             
            >
              {categories.some(subcategory => subcategory.idCategoryParent === category.idCategory) ? (
                categories.map((subcategory => (
                  subcategory.idCategoryParent === category.idCategory && (
                    <DropdownItem
                      className='text-center'
                      key={subcategory.idCategory}
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
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {categories.map((category) => (
              category.idCategoryParent === null && (
                <li key={category.idCategory}>
                  <button onClick={() => handleCategoryClick(category.idCategory)}>
                    {category.categoryName}
                  </button>
                  {/* subcategories */}
                  {selectedCategory === category.idCategory && (
                    <ul>
                      {categories.map((subcategory) => (
                        subcategory.idCategoryParent === category.idCategory && (
                          <li key={subcategory.idCategory}>{subcategory.categoryName}</li>
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