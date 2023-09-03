import { useEffect, useState } from "react";
import { Col, Container, Table } from "react-bootstrap";

import useApi from "../../hooks/useApi";
import { getCategories } from "../../services/api";
import AddOrModifyProductForm from "./AddOrModifyProductForm";
import CategorySelector from "./CategorySelector";
import ImagesForUploadSpan from "./ImagesForUploadSpan";

const AdminProfile = () => {
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [categories, setCategories] = useState([]);
    const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState("Subcategory");
    const [productDetail, setProductDetail] = useState({
        "Product Name": { value: "", type: "text" },
        "$": { value: "", type: "number" },
        "Stock": { value: "", type: "number" },
        "Brand": { value: "", type: "text" },
        "Supplier": { value: "", type: "text" },
        "Slogan": { value: "", type: "text" },
        "Description": { value: "", type: "textarea" },
        "Specification": [{ value: "", type: "textarea" }],
        "Feature": [{ value: "", type: "textarea" }],
        "Images": { value: [], type: "file" }
    });

    const [selectedCategoryForModify, setSelectedCategoryForModify] = useState("Category");
    const [subcategoriesForModify, setSubcategoriesForModify] = useState([]);
    const [selectedSubcategoryForModify, setSelectedSubcategoryForModify] = useState("Subcategory");
    const [productDetailForModify, setProductDetailForModify] = useState({
        "Product Name": { value: "", type: "text" },
        "$": { value: "", type: "number" },
        "Stock": { value: "", type: "number" },
        "Brand": { value: "", type: "text" },
        "Supplier": { value: "", type: "text" },
        "Slogan": { value: "", type: "text" },
        "Description": { value: "", type: "textarea" },
        "Specification": [{ value: "", type: "textarea" }],
        "Feature": [{ value: "", type: "textarea" }],
        "Images": { value: [], type: "file" }
    });

    // replace the fake data with useApi custom hook to fetch products from db
    const [products, setProducts] = useState(["product 1", "product 2", "product 3", "product 4", "product 5", "product 6", "product 7"])
    const [productForModify, setProductForModify] = useState(null);

    const [selectedCategoryForCreate, setSelectedCategoryForCreate] = useState("Category");
    const [selectedSubcategoryForCreate, setSelectedSubcategoryForCreate] = useState("Subcategory");
    const [subcategoriesForCreate, setSubcategoriesForCreate] = useState([]);


    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData)
        }
    }, [categoriesData]);

    const categoriesWithNullParent = categories.filter(
        (category) => category.idCategoryParent === null
    );

    // Create Product
    const handleCategoryClick = category => {
        setSelectedCategory(category.categoryName);
        const filteredCategories = categories.filter(subcategory => subcategory.idCategoryParent === category.idCategory)
        setSubcategories(filteredCategories);
    }

    const handleSubcategoryClick = subcategory => {
        setSelectedSubcategory(subcategory.categoryName)
    }

    const handleInputChange = (detail, e) => {
        if (detail === "Images") {
            const selectedFiles = Array.from(e.target.files);
            const existingFiles = productDetail.Images.value || [];
            const allSelectedFiles = [...existingFiles, ...selectedFiles];
            const fileNames = allSelectedFiles.map(file => file.name);

            setProductDetail((prevProductDetail) => ({
                ...prevProductDetail,
                [detail]: {
                    value: allSelectedFiles,
                    fileNames: fileNames,
                    type: "file",
                },
            }));
        } else {
            setProductDetail((prevProductDetail) => ({
                ...prevProductDetail,
                [detail]: {
                    ...prevProductDetail[detail],
                    value: e.target.value,
                },
            }));
        }
    };

    const handleCreateProduct = () => {

    }
    
    // Modify Product
    const handleCategoryClickForModify = (category) => {
        setSelectedCategoryForModify(category.categoryName);
        const filteredCategories = categories.filter((subcategory) => subcategory.idCategoryParent === category.idCategory);
        setSubcategoriesForModify(filteredCategories);
    };

    const handleSubcategoryClickForModify = (subcategory) => {
        setSelectedSubcategoryForModify(subcategory.categoryName);
    };

    const handleProductClick = (product) => {
        setProductForModify(product)
    }

    const handleModifyInputChange = (detail, e) => {
        if (detail === "Images") {
            const selectedFiles = Array.from(e.target.files);
            const existingFiles = productDetailForModify.Images.value || [];
            const allSelectedFiles = [...existingFiles, ...selectedFiles];
            const fileNames = allSelectedFiles.map(file => file.name);

            setProductDetailForModify((prevProductDetail) => ({
                ...prevProductDetail,
                [detail]: {
                    value: allSelectedFiles,
                    fileNames: fileNames,
                    type: "file",
                },
            }));
        } else {
            setProductDetailForModify((prevProductDetail) => ({
                ...prevProductDetail,
                [detail]: {
                    ...prevProductDetail[detail],
                    value: e.target.value,
                },
            }));
        }
    }

    const handleModifyProduct = () => {

    }

    // Create Category/Subcategory
    const handleCategoryCreationClick = () => {
        
    }
    
    const handleSubcategoryCreateClick = () => {
        
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
                                        <th rowSpan="3" className="bg-primary text-white">Date</th>
                                        <th rowSpan="3" className="bg-primary text-white">Message ID</th>
                                        <th rowSpan="3" className="bg-primary text-white">Title</th>
                                        <th rowSpan="3" className="bg-primary text-white">Message</th>
                                        <th rowSpan="3" className="bg-primary text-white">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* msg data */}
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
                            <AddOrModifyProductForm
                                productDetail={productDetail}
                                handleInputChange={handleInputChange}
                                handleCreateProduct={() => handleCreateProduct()}
                                buttonName={"Create Product"}
                            />
                        )
                        }
                        {productDetail.Images.fileNames && productDetail.Images.fileNames.length > 0 && (
                            <ImagesForUploadSpan productDetail={productDetail} />
                        )}
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
                        {productForModify && <AddOrModifyProductForm
                            productDetail={productDetailForModify}
                            handleInputChange={handleModifyInputChange}
                            handleCreateProduct={() => handleModifyProduct()}
                            buttonName={"Modify Product"}
                        />}
                        {productDetailForModify.Images.fileNames && productDetailForModify.Images.fileNames.length > 0 && (
                            <ImagesForUploadSpan productDetail={productDetailForModify} />
                        )}
                    </div>
                </Col>

                {/* Create Category/Subcategory */}
                <Col xs={12} md={6}>
                    <CategorySelector
                        title={"Create Category/Subcategory"}
                        selectedCategory={selectedCategoryForCreate}
                        loadingCategories={loadingCategories}
                        loadingCategoriesAnimation={loadingCategoriesAnimation}
                        handleCategoryClick={handleCategoryCreationClick}
                        categoriesWithNullParent={categoriesWithNullParent}
                        selectedSubcategory={selectedSubcategoryForCreate}
                        subcategories={subcategoriesForCreate}
                        handleSubcategoryClick={handleSubcategoryCreateClick}
                    />
                </Col>
            </Container>
        </div>
    );
}

export default AdminProfile;