import { useParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import CategoriesMenu from "./CategoriesMenu";
import ProductCard from "./ProductCard";
import DropdownSortBy from "./DropdownSortBy";
import useApi from "../../hooks/useApi";
import { getCategoriesData, getSubcategoryProductsList } from "../../services/api";

const PageSize = 12;

const ProductList = () => {
  const { category, subcategory, id } = useParams();
  const [categories, setCategories] = useState({ categories: [] });
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategoriesData);
  const { data: categoryProducts } = useApi(getSubcategoryProductsList, id)
  const [selectedSortBy, setSelectedSortBy] = useState(null);

  // maybe separate in 2 useEffect to avoid the update of all categories on each req for subcategory
  useEffect(() => {
    if (categoryProducts) {
      setProducts(categoryProducts.products)
    }
    if (categoriesData) {
      setCategories(categoriesData.categories);
    }
  }, [categoriesData, categoryProducts]);

  // pagination
  //  const [currentPage, setCurrentPage] = useState(1);

  // const startIndex = (currentPage - 1) * PageSize;

  // const visibleProducts = products.length > 0 && products.slice(
  //   startIndex,
  //   startIndex + PageSize
  // );

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // const totalPages = Math.ceil(products.length > 0 && products.length / PageSize);
  // end pagination

  const handleSortByClick = (sortBy) => {
    setSelectedSortBy(sortBy === "Delete Sorting" ? null : sortBy);
  }

  return (
    <div className="d-flex min-vh-100">
      <Col xs={3} sm={2} md={3} lg={3} xl={2} xxl={2} className="text-center">
        {loadingCategories ? (
          <div className="d-flex justify-content-center">
            <div className="mt-5">
              {loadingCategoriesAnimation}
            </div>
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <CategoriesMenu categories={categories} />
            )}
          </>
        )
        }
      </Col>
      <Col xs={6} sm={8} md={7} lg={8} xl={9} xxl={9} className="text-center d-flex flex-column justify-content-between align-items-center">
        <ProductCard products={products} />
        <div className="pagination">
          {/* {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-link ${index + 1 === currentPage ? "active" : ""
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))} */}
        </div>
      </Col>
      <Col xl={1} xxl={1} className="position-absolute end-0">
        <DropdownSortBy handleSortByClick={handleSortByClick} selectedSortBy={selectedSortBy} />
      </Col>
    </div>
  )
}
export default ProductList;