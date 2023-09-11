import { useEffect, useState } from "react";
import { Col, Container, Table } from "react-bootstrap";

import useApi from "../../hooks/useApi";
import { getCategories } from "../../services/api";
import ProductForm from "./ProductForm";
import CategorySelector from "./CategorySelector";
import CreateCatOrSubcatForm from "./CreateCatOrSubcatForm";

const AdminProfile = () => {
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [categories, setCategories] = useState({ images: [], categories: [] });
    const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState("Subcategory");
    const [selectedCategoryForModify, setSelectedCategoryForModify] = useState("Category");
    const [subcategoriesForModify, setSubcategoriesForModify] = useState([]);
    const [selectedSubcategoryForModify, setSelectedSubcategoryForModify] = useState("Subcategory");
    

    // replace the fake data with useApi custom hook to fetch products from db
    const [products, setProducts] = useState(["product 1", "product 2", "product 3", "product 4", "product 5", "product 6", "product 7"])
    const [productForModify, setProductForModify] = useState(null);

    const [selectedCategoryForCreate, setSelectedCategoryForCreate] = useState();

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData)
        }
    }, [categoriesData]);

    const categoriesWithNullParent = categories.categories.filter(
        (category) => category.idCategoryParent === null
    );

    // Create Product
    const handleCategoryClick = category => {
        setSelectedCategory(category.categoryName);
        const filteredCategories = categories.categories.filter(subcategory => subcategory.idCategoryParent === category.idCategory)
        setSubcategories(filteredCategories);
    }

    const handleSubcategoryClick = subcategory => {
        setSelectedSubcategory(subcategory.categoryName)
    }

    const handleCreateProduct = () => {

    }

    // Modify Product
    const handleCategoryClickForModify = (category) => {
        setSelectedCategoryForModify(category.categoryName);
        const filteredCategories = categories.categories.filter((subcategory) => subcategory.idCategoryParent === category.idCategory);
        setSubcategoriesForModify(filteredCategories);
    };

    const handleSubcategoryClickForModify = (subcategory) => {
        setSelectedSubcategoryForModify(subcategory.categoryName);
    };

    const handleProductClick = (product) => {
        setProductForModify(product)
    }

    const handleModifyProduct = () => {

    }

    // Create Category/Subcategory
    const handleCategorySelectionClick = (category, updatedCategoriesWithNullParent) => {
        const selectedCategory = updatedCategoriesWithNullParent.find(cat => cat.categoryName === category);
        setSelectedCategoryForCreate(selectedCategory);
    }

    return (
        <div className="min-vh-100">
            <Container className="d-flex flex-wrap" fluid>
                {/* Messages */}
                <Col xs={12} md={6}>
                    <div className="mt-4 border rounded me-4">
                        <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">User's Messages</h2>
                        <div className="table-responsive">
                            <Table striped borderless variant="light mb-0">
                                <thead>
                                    <tr>
                                        {["Date", "Message ID", "Title", "Message", "User"].map(th => (
                                            <th key={th} rowSpan="3" className="bg-primary text-white">{th}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* msgs data */}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>

                {/* Create Product */}
                <Col xs={12} md={6} className="flex-grow-1">
                    <CategorySelector
                        title={"Create Product"}
                        selectedCategory={selectedCategory}
                        loadingCategories={loadingCategories}
                        loadingCategoriesAnimation={loadingCategoriesAnimation}
                        handleCategoryClick={handleCategoryClick}
                        categoriesWithNullParent={categoriesWithNullParent}
                        selectedSubcategory={selectedSubcategory}
                        subcategories={subcategories}
                        handleSubcategoryClick={handleSubcategoryClick}

                    />
                    <div className="d-flex flex-wrap w-100">
                        {selectedSubcategory !== "Subcategory" && (
                            <ProductForm buttonName={"Create Product"} />
                        )
                        }
                    </div>
                </Col>

                {/* Modify Product */}
                <Col xs={12} md={6}>
                    <CategorySelector
                        title={"Modify Product"}
                        withSearchBar={true}
                        selectedCategory={selectedCategoryForModify}
                        loadingCategories={loadingCategories}
                        loadingCategoriesAnimation={loadingCategoriesAnimation}
                        handleCategoryClick={handleCategoryClickForModify}
                        categoriesWithNullParent={categoriesWithNullParent}
                        selectedSubcategory={selectedSubcategoryForModify}
                        subcategories={subcategoriesForModify}
                        handleSubcategoryClick={handleSubcategoryClickForModify}
                    />
                    {!productForModify && (<select className="form-select" multiple aria-label="multiple select product" size={5}>
                        {products.length > 0 && (
                            products.map((product, idx) => (
                                <option key={idx} value={product} role='button' onClick={event => handleProductClick(event.target.innerText)}>{product}</option>
                            ))
                        )}
                    </select>
                    )}
                    <div className="d-flex flex-wrap w-100">
                        {productForModify && <ProductForm buttonName={"Modify Product"} />}
                    </div>
                </Col>

                {/* Create Category/Subcategory */}
                <Col xs={12} md={6}>
                    <CreateCatOrSubcatForm
                        title={"Create Category/Subcategory"}
                        selectedCategoryForCreate={selectedCategoryForCreate}
                        categoriesWithNullParent={categoriesWithNullParent}
                        selectedSubcategory={selectedSubcategory}
                        handleCategorySelectionClick={handleCategorySelectionClick}                       
                    />
                </Col>
            </Container>
        </div>
    );
}

export default AdminProfile;