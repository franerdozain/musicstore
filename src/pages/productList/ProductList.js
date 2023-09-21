import { useParams } from "react-router-dom";
import { Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

import CategoriesMenu from "./CategoriesMenu";
import ProductCard from "./ProductCard";
import DropdownSortBy from "./DropdownSortBy";
import useApi from "../../hooks/useApi";
import { getCategoriesData, getProductsList } from "../../services/api";
import { FaBagShopping } from "react-icons/fa6";

const PageSize = 12;

const ProductList = () => {
  const { category, subcategory, id } = useParams();
  const [categories, setCategories] = useState({ categories: [] });
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategoriesData);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.categories);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (category && subcategory && id) {
      const fetchData = async () => {
        const response = await getProductsList(id, currentPage, PageSize, selectedSortBy, subcategory === "all");
        if (response && response.products) {
          setProducts(response.products);
          setTotalPages(response.totalPages);
          setIsLoadingProducts(false);
        }
      };
      fetchData();
    }
  }, [id, category, subcategory, currentPage, selectedSortBy]);

  const handleSortByClick = (sortBy) => {
    setSelectedSortBy(sortBy === "Delete Sorting" ? null : sortBy);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPagesDisplay = totalPages ? totalPages : 1;


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
              <CategoriesMenu categories={categories} setCurrentPage={setCurrentPage} />
            )}
          </>
        )
        }
      </Col>
      <Col xs={6} sm={8} md={7} lg={8} xl={9} xxl={9} className="text-center d-flex flex-column justify-content-between align-items-center">
        {isLoadingProducts ? (
          <div className="d-flex justify-content-center">
            <div className="mt-5">
              {loadingCategoriesAnimation}
            </div>
          </div>
        ) : (products.length === 0 ? (
          <div className="falling-words-container d-flex w-75">
            <div className="mx-1">
              <p className="falling-word1">More</p>
            </div>
            <div className="mx-5">
              <p className="falling-word2">coming</p>
            </div>
            <div className="ms-4 me-2">
              <p className="falling-word3">soon!</p>
            </div>
            <div className="lightComingSoon">
              <FaBagShopping className="comingSoonBag mx-5 mt-0" size={20} />
            </div>
          </div>

        ) : (
          <>
            <ProductCard products={products} setProducts={setProducts} />
            <div className="pagination">
              <button
                className="page-link  p-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FcPrevious size={20} />
              </button>
              {Array.from({ length: totalPagesDisplay }, (_, index) => (
                <button
                  key={index}
                  className={`page-link ${index + 1 === currentPage ? "active" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="page-link p-1"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPagesDisplay}
              >
                <FcNext size={20} />
              </button>
            </div>
          </>
        )
        )}

      </Col>
      <Col md={2} lg={1} xl={1} xxl={1} className="position-absolute end-0">
        <DropdownSortBy handleSortByClick={handleSortByClick} selectedSortBy={selectedSortBy} />
      </Col>
    </div>
  )
}
export default ProductList;