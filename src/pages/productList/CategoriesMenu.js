import { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Offcanvas } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
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

          <Accordion>
            {categories.map((category, idx) => (
              category.idCategoryParent === null && (
                <div key={idx}>
                  <Accordion.Item eventKey={category.idCategory}>
                    <Accordion.Header onClick={() => handleCategoryClick(category)}>
                      {category.categoryName}
                    </Accordion.Header>
                    <Accordion.Body>
                      {categories
                        .filter((subcategory) => subcategory.idCategoryParent === category.idCategory)
                        .map((subcategory) => (
                          <div
                            role='button'
                            aria-label={`Choose ${subcategory.categoryName} subcategory products`}
                            className='d-flex flex-column mx-auto w-100 align-items-center'
                            key={subcategory.idCategory}
                            style={{ transition: 'background-color 0.4s', border: 'none', borderRadius: '10px' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#cfe2ff'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'initial'}
                            onClick={(e) => handleSubcategoryClick(subcategory, e)}
                          >
                            {subcategory.categoryName}
                          </div>
                        ))}
                      {<div
                        role='button'
                        aria-label={`Choose all category products`}
                        className='d-flex flex-column mx-auto w-100 align-items-center'
                        style={{ transition: 'background-color 0.4s', border: 'none', borderRadius: '10px' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#cfe2ff'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'initial'}
                        onClick={(e) => handleSubcategoryClick('All', e)}
                      >
                        Show All
                      </div>}
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              )
            ))}
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CategoriesMenu;