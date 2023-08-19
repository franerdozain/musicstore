import { useEffect, useState } from "react";
import HomeModal from "./HomeModal";
import { Container } from "react-bootstrap";
import { getCategories } from "../../services/api";
import CategoryCard from "./CategoryCard";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
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
            <CategoryCard category={category.categoryName} onClick={() => handleClick(category)} />
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
      />
    </Container>
  )
}
export default Home;
