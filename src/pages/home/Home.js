import { useEffect, useState } from "react";
import HomeModal from "./HomeModal";
import { Container } from "react-bootstrap";
import { getCategories, getCategoriesImages } from "../../services/api";
import CategoryCard from "./CategoryCard";
import useApi from "../../hooks/useApi";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const { data: imagesData, loading: loadingCategoriesImages, LoadingAnimation: loadingCategoriesImagesAnimation } = useApi(getCategoriesImages);
  const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);

  useEffect(() => {
    if (imagesData) {
      setImages(imagesData);
    }
  }, [imagesData]);


  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const handleClick = (category) => {
    setModalShow(true);
    setSelectedCategory(category);

  }

  const categoriesWithNullParent = categories.filter(
    (category) => category.idCategoryParent === null
  );

  return (
    <Container className="min-vh-100" id="home-text">
      {loadingCategories || loadingCategoriesImages ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4 justify-content-center">
          {loadingCategoriesAnimation || loadingCategoriesImagesAnimation}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4">
          {categoriesWithNullParent.map((category, index) => (
            <div key={index} className="col">
              <CategoryCard category={category} onClick={() => handleClick(category)} images={images} />
            </div>
          ))}
        </div>
      )}
      <HomeModal
        show={modalShow}
        category={selectedCategory?.categoryName || ""}
        subcategories={categories.filter(
          (category) => selectedCategory && category.idCategoryParent === selectedCategory.idCategory
        )}
        onHide={() => {
          setModalShow(false);
          setSelectedCategory(null);
        }}
        images={images}
      />
    </Container>
  )
}
export default Home;
