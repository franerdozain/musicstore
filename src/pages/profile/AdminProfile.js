import { useEffect, useState } from "react";
import { Col, Container, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import useApi from "../../hooks/useApi";
import { formatDate } from "../../utils/formatDate";
import ProductForm from "./ProductForm";
import AnswerModal from "./AnswerModal";
import CategorySelector from "./CategorySelector";
import CreateCatOrSubcatForm from "./CreateCatOrSubcatForm";
import { deleteCategoryOrSubcategory, getCategories, getMessages, getProduct, getProductsListForModify } from "../../services/api";
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
    const [selectedCategoryIdForDelete, setSelectedCategoryIdForDelete] = useState(null);
    const [subcategoriesForDelete, setSubcategoriesForDelete] = useState([]);
    const { data: messagesData, loading: loadingMessages, LoadingAnimation: loadingMessagesAnimation } = useApi(getMessages);
    const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);
    const [deletedOkMsg, setDeletedOkMsg] = useState("");
    const categoryToDelete = selectedCategoryForDelete !== "Category" ? selectedCategoryForDelete : "";
    const subcategoryToDelete = selectedSubcategoryForDelete !== "Subcategory" && selectedSubcategoryForDelete !== "All" ? selectedSubcategoryForDelete : "";
    const deleteText = `Delete ${subcategoryToDelete ? "Subcategory" : categoryToDelete ? "Category" : ""} ${subcategoryToDelete || categoryToDelete}`;
    const [products, setProducts] = useState([]);
    const [productForModify, setProductForModify] = useState(null);
    const [selectedCategoryForCreate, setSelectedCategoryForCreate] = useState();
    const [loading, setLoading] = useState(false);

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
        setSelectedSubcategoryForModify("Subcategory");
        setSelectedCategoryForModify(category.categoryName);
        const filteredCategories = categories.categories.filter((subcategory) => subcategory.idCategoryParent === category.idCategory);
        setSubcategoriesForModify(filteredCategories);
    };

    const handleSubcategoryClickForModify = async (subcategory) => {
        setSelectedSubcategoryForModify(subcategory.categoryName);
        setLoading(true);
        try {
            setProductForModify(null);
            const response = await getProductsListForModify(subcategory.idCategory);
            if (response.products) {
                setProducts(response.products)
            }
        } catch (error) {
            console.log('Error', error)
        } finally {
            setLoading(false);
        }
    };

    const handleProductClick = async (idProduct) => {
        setLoading(true);
        try {
            const response = await getProduct(idProduct);
            if (response.product) {
                setProductForModify(response.product)
            }
        } catch (error) {
            console.log("Error: ", error)
        } finally {
            setLoading(false)
        }
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
        if (filteredCategories.length > 0) {
            const subcategoriesWithAll = [...filteredCategories, {
                categoryName: "All",
                idCategoryParent: filteredCategories[0].idCategoryParent
            }]
            setSubcategoriesForDelete(subcategoriesWithAll);
        } else {
            setSubcategoriesForDelete({
                categoryName: "All",
                idCategoryParent: category.idCategory
            })
        }
        setSelectedCategoryIdForDelete(category.idCategory)
    };

    const handleSubcategoryClickForDelete = subcategory => {
        setSelectedSubcategoryForDelete(subcategory.categoryName)
        setSelectedSubcategoryIdForDelete(subcategory.idCategory)
        setSelectedCategoryIdForDelete(null)
    }

    const handleDeleteCategoryOrSubcategory = async () => {
        try {
            setErrorMsg("");
            setMsgSendOk("");
            const response = await deleteCategoryOrSubcategory(selectedCategoryIdForDelete || selectedSubcategoryIdForDelete)
            if (response.deletedOk) {
                setMsgSendOk(response.deletedOk)
                const responseGetCategories = await getCategories();
                setCategories(responseGetCategories);
                setSelectedCategoryForDelete("Category");
                setSelectedSubcategoryForDelete("Subcategory");
            } else if (response.errorDeleting) {
                setErrorMsg(response.errorDeleting);
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
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
    }, [errorMsg, msgSendOk, deletedOkMsg]);

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
                    {loading ? (
                        <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-label="Submitting... Please wait."
                        />
                    ) : (
                        !productForModify && products.length > 0 && (
                            <select className="form-select text-center" multiple aria-label="multiple select product" size={5}>
                                {products.map((product, idx) => (
                                    <option
                                        key={idx}
                                        value={product.productName}
                                        role='button'
                                        style={{ backgroundColor: (idx % 2 === 0) ? '#e5e6e7' : '#FFF', borderRadius: '0.5em' }}
                                        onMouseOver={e => { e.target.style.backgroundColor = '#0d6efd'; e.target.style.color = '#FFF' }}
                                        onMouseOut={e => { e.target.style.backgroundColor = (idx % 2 === 0) ? '#e5e6e7' : '#FFF'; e.target.style.color = '#000' }}
                                        onClick={e => handleProductClick(product.idProduct)}
                                        className="text-wrap"
                                    >
                                        {product.productName}
                                    </option>
                                ))
                                }
                            </select>
                        )
                    )
                    }
                    <div className="d-flex flex-wrap w-100">
                        {productForModify && <ProductForm productForModify={productForModify} buttonName={"Modify Product"} />}
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
                        handleDeleteCategoryOrSubcategory={handleDeleteCategoryOrSubcategory}
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