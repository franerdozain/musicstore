import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import HomeModal from "./HomeModal";
import { getCategories } from "../../services/api";
import CategoryCard from "./CategoryCard";
import useApi from "../../hooks/useApi";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [categories, setCategories] = useState({ images: [], categories: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const handleClick = (category) => {
    setModalShow(true);
    setSelectedCategory(category);

  }

  const categoriesWithNullParent = categories.categories.filter(
    (category) => category.idCategoryParent === null
  );

  return (
    <Container className="min-vh-100" id="home-text">
      {loadingCategories  ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4 justify-content-center">
          {loadingCategoriesAnimation }
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4">
          {categoriesWithNullParent.map((category, index) => (
            <div key={index} className="col">
              <CategoryCard category={category} onClick={() => handleClick(category)} images={categories.images} />
            </div>
          ))}
        </div>
      )}
      <HomeModal
        show={modalShow}
        category={selectedCategory?.categoryName || ""}
        subcategories={categories.categories.filter(
          (category) => selectedCategory && category.idCategoryParent === selectedCategory.idCategory
        )}
        onHide={() => {
          setModalShow(false);
          setSelectedCategory(null);
        }}
        images={categories.images}
      />
    </Container>
  )
}
export default Home;
