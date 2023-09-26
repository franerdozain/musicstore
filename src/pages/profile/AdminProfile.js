import { useEffect, useState } from "react";
import { Col, Container, Table } from "react-bootstrap";
import { SiMinutemailer } from "react-icons/si";

import useApi from "../../hooks/useApi";
import { getCategories, getMessages } from "../../services/api";
import ProductForm from "./ProductForm";
import CategorySelector from "./CategorySelector";
import CreateCatOrSubcatForm from "./CreateCatOrSubcatForm";
import AnswerModal from "./AnswerModal";

const AdminProfile = () => {
    const [messages, setMessages] = useState([]);
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
    const { data: messagesData, loading: loadingMessages, LoadingAnimation: loadingMessagesAnimation } = useApi(getMessages);
    const { data: categoriesData, loading: loadingCategories, LoadingAnimation: loadingCategoriesAnimation } = useApi(getCategories);

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

    // Messages 
    const handleAnswerClick = (idMessages) => {
        const userMsgToAnswer = messages.filter(msg => msg.idMessages === idMessages);
        setMessageToBeAnswered(userMsgToAnswer);
        setShowAnswerModal(true);
    }

    return (
        <div className="min-vh-100">
            <Container className="d-flex flex-wrap" fluid>
                {/* Messages */}
                <Col xs={12} md={6}>
                    <div className="mt-4 border rounded me-4 w-100">
                        <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">User's Messages</h2>
                        <div className="table-responsive">
                            <Table striped borderless variant="light mb-0">
                                <thead>
                                    <tr>
                                        {["Date & Time", "Message ID", "Subject", "Message", "User Id or Email", "Answer"].map(th => (
                                            <th key={th} rowSpan="3" className="bg-primary text-white">{th}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingMessages ? (
                                        <tr>
                                            <td>{loadingMessagesAnimation}</td>
                                        </tr>

                                    ) : (
                                        messages.map((msg) => (
                                            <tr key={msg.idMessages}>
                                                <td>{msg.dateAndTime}</td>
                                                <td>{msg.idMessages}</td>
                                                <td>{msg.subject}</td>
                                                <td>{msg.message}</td>
                                                <td>{msg.idSenderUser || msg.emailSender}</td>
                                                <td className="text-center">
                                                    <SiMinutemailer
                                                        size={30}
                                                        onClick={() => handleAnswerClick(msg.idMessages)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
                {showAnswerModal && (
                    <AnswerModal
                        showAnswerModal={showAnswerModal}
                        setShowAnswerModal={setShowAnswerModal}
                        messageToBeAnswered={messageToBeAnswered}
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
            </Container>
        </div>
    );
}

export default AdminProfile;