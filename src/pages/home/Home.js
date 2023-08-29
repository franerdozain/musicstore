import { useEffect, useState } from "react";
import HomeModal from "./HomeModal";
import { Container } from "react-bootstrap";
import { getCategories, getCategoriesImages } from "../../services/api";
import CategoryCard from "./CategoryCard";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const response = await getCategoriesImages();                
            setImages(response);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    fetchImages();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getCategories();
        setCategories(responseData);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchData()
  }, [])

  const handleClick = (category) => {
    setModalShow(true);
    setSelectedCategory(category);

  }

  const categoriesWithNullParent = categories.filter(
    (category) => category.idCategoryParent === null
  );

  return (
    <Container className="min-vh-100" id="home-text">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4">
        {categoriesWithNullParent.map((category, index) => (
          <div key={index} className="col">
            <CategoryCard category={category} onClick={() => handleClick(category)} images={images} />
          </div>
        ))}
      </div>
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
