import { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import useApi from "../../hooks/useApi";
import { formatDate } from "../../utils/formatDate";
import ProductForm from "./ProductForm";
import AnswerModal from "./AnswerModal";
import CategorySelector from "./CategorySelector";
import CreateCatOrSubcatForm from "./CreateCatOrSubcatForm";
import { getCategories, getMessages } from "../../services/api";
import Messages from "./Messages";
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
    const [messages, setMessages] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [msgSendOk, setMsgSendOk] = useState("")
    const [subcategories, setSubcategories] = useState([]);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [messageToBeAnswered, setMessageToBeAnswered] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
    const [subcategoriesForModify, setSubcategoriesForModify] = useState([]);
    const [categories, setCategories] = useState({ images: [], categories: [] });
    const [selectedSubcategory, setSelectedSubcategory] = useState("Subcategory");
    const [selectedCategoryForModify, setSelectedCategoryForModify] = useState("Category");
    const [selectedSubcategoryForModify, setSelectedSubcategoryForModify] = useState("Subcategory");
    const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState("Category");
    const [selectedSubcategoryForDelete, setSelectedSubcategoryForDelete] = useState("Subcategory");
    const [selectedSubcategoryIdForDelete, setSelectedSubcategoryIdForDelete] = useState(null);
    const [subcategoriesForDelete, setSubcategoriesForDelete] = useState([]);
    const { data: messagesData, loading: loadingMessages, LoadingAnimation: loadingMessagesAnimation } = useApi(getMessages);
    const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);

    const categoryToDelete = selectedCategoryForDelete !== "Category" ? selectedCategoryForDelete : "";
    const subcategoryToDelete = selectedSubcategoryForDelete !== "Subcategory" && selectedSubcategoryForDelete !== "All" ? selectedSubcategoryForDelete : "";
    const deleteText = `Delete ${subcategoryToDelete ? "Subcategory" : categoryToDelete ? "Category" : ""} ${subcategoryToDelete || categoryToDelete}`;

    // replace the fake data with useApi custom hook to fetch products from db
    const [products, setProducts] = useState(["product 1", "product 2", "product 3", "product 4", "product 5", "product 6", "product 7"])
    const [productForModify, setProductForModify] = useState(null);

    const [selectedCategoryForCreate, setSelectedCategoryForCreate] = useState();

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData)
        }
    }, [categoriesData]);

    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData)
        }
    }, [messagesData]);

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
        setSelectedSubcategoryId(subcategory.idCategory)
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

    // Delete Category/Subcategory
    const handleCategoryClickForDelete = (category) => {
        setSelectedCategoryForDelete(category.categoryName);
        setSelectedSubcategoryForDelete("Subcategory");

        const filteredCategories = categories.categories.filter((subcategory) => subcategory.idCategoryParent === category.idCategory);
        const subcategoriesWithAll = [...filteredCategories, {
            categoryName: "All",
            idCategoryParent: filteredCategories[0].idCategoryParent}]

        setSubcategoriesForDelete(subcategoriesWithAll);
    };

    const handleSubcategoryClickForDelete = subcategory => {
        setSelectedSubcategoryForDelete(subcategory.categoryName)
        setSelectedSubcategoryIdForDelete(subcategory.idCategory)
    }

    // Messages 
    const handleAnswerClick = (idMessages) => {
        const userMsgToAnswer = messages.filter(msg => msg.idMessages === idMessages);
        setMessageToBeAnswered(userMsgToAnswer);
        setErrorMsg("");
        setMsgSendOk("");
        setShowAnswerModal(true);
    }

useEffect(() => {
    notify();
}, [errorMsg, msgSendOk]);

const notify = () => {
    if (errorMsg !== "") {
      toast.warning(`${errorMsg}`)
    } else if (msgSendOk !== "") {
      toast.success(`${msgSendOk}`)
    };
  };

    return (
        <div className="min-vh-100">
            <Container className="d-flex flex-wrap" fluid>
                {/* Messages */}
                <Messages
                 loadingMessages={loadingMessages}
                 loadingMessagesAnimation={loadingMessagesAnimation}
                 messages={messages}
                 handleAnswerClick={handleAnswerClick}
                 formatDate={formatDate}
                 />
                {showAnswerModal && (
                    <AnswerModal
                        showAnswerModal={showAnswerModal}
                        setShowAnswerModal={setShowAnswerModal}
                        messageToBeAnswered={messageToBeAnswered}
                        setErrorMsg={setErrorMsg}
                        setMsgSendOk={setMsgSendOk}
                        notify={notify}
                    />
                )}

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
                            <ProductForm buttonName={"Create Product"} selectedSubcategoryId={selectedSubcategoryId} />
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
                                <option
                                    key={idx}
                                    value={product}
                                    role='button'
                                    onClick={event => handleProductClick(event.target.innerText)}
                                >
                                    {product}
                                </option>
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

                {/* Delete Category/Subcategory */}
                <Col xs={12} md={6}>
                    <CategorySelector
                        title={"Delete Category/Subcategory"}
                        selectedCategory={selectedCategoryForDelete}
                        loadingCategories={loadingCategories}
                        loadingCategoriesAnimation={loadingCategoriesAnimation}
                        handleCategoryClick={handleCategoryClickForDelete}
                        categoriesWithNullParent={categoriesWithNullParent}
                        selectedSubcategory={selectedSubcategoryForDelete}
                        subcategories={subcategoriesForDelete}
                        handleSubcategoryClick={handleSubcategoryClickForDelete}
                        selectedCategoryForDelete={selectedCategoryForDelete}
                        selectedSubcategoryForDelete={selectedSubcategoryForDelete}
                        deleteText={deleteText}
                        withDeleteButton                    
                    />
                </Col>
            </Container>
            <ToastContainer 
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />   
        </div>
    );
}

export default AdminProfile;