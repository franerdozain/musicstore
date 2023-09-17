import { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Offcanvas } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useNavigate } from 'react-router-dom';

function CategoriesMenu({ categories, setCurrentPage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCatMenuBigScreen, setShowCatMenuBigScreen] = useState(false);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleCategoryClick = (category) => {   
    setSelectedCategory(category);
    setShowCatMenuBigScreen(true);
  };

  const handleSubcategoryClick = (subcategory, e) => {
    e.stopPropagation();   
    setCurrentPage(1);
    subcategory === "All" ?
            navigate(`/categories/${selectedCategory.categoryName}/all/${selectedCategory.idCategory}`) :
            navigate(`/categories/${selectedCategory.categoryName}/${subcategory.categoryName}/${subcategory.idCategory}`);
    setSelectedSubcategory(subcategory.idCategory);
    setShowCatMenuBigScreen(false);
  };

  return (
    <div className='container'>
      <Button variant="light" className="d-md-none mt-2 position-relative" onClick={handleToggleMenu}>
        Categories
      </Button>

      {/* big screen menu */}
      <ButtonGroup vertical className="d-none d-md-inline-flex mt-2">

        {categories.map((category) => (
          category.idCategoryParent === null && (
            <DropdownButton
              as={ButtonGroup}
              title={category.categoryName}
              key={category.idCategory}
              drop="end"
              variant="light"
              onClick={() => {
                handleCategoryClick(category);
              }}
              show={showCatMenuBigScreen && category === selectedCategory}
            >
              {categories.some(subcategory => subcategory.idCategoryParent === category.idCategory) && (
                <>
                  {categories.map((subcategory => (
                    subcategory.idCategoryParent === category.idCategory && (
                      <DropdownItem
                        className='text-center'
                        key={subcategory.idCategory}
                        onClick={(e) => handleSubcategoryClick(subcategory, e)}                                            
                      >
                        {subcategory.categoryName}
                      </DropdownItem>
                    )
                  )))}
                  <DropdownItem
                    className='text-center'
                    onClick={(e) => handleSubcategoryClick("All", e)}>
                    Show All
                  </DropdownItem>
                </>
              )}
            </DropdownButton>
          )
        ))}
      </ButtonGroup>

      {/* small screen menu */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton></Offcanvas.Header>
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