import { useEffect, useState } from "react";
import { Button, Form, InputGroup, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaQuestionCircle } from "react-icons/fa";
import { BiConfused, BiHappyAlt } from 'react-icons/bi';

import { createCatOrSubcatSchema } from "../../utils/validationSchemas";
import { createCategoryOrSubcategory, getCategories } from "../../services/api";

const CreateCatOrSubcatForm = ({ title, categoriesWithNullParent, selectedCategoryForCreate, handleCategorySelectionClick }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [updatedCategoriesWithNullParent, setUpdatedCategoriesWithNullParent] = useState(categoriesWithNullParent)

    useEffect(() => {
        setUpdatedCategoriesWithNullParent(categoriesWithNullParent)
    }, [categoriesWithNullParent])

    const { control, handleSubmit, setValue, clearErrors, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(createCatOrSubcatSchema)
    });
    const submitForm = async (data) => {
        try {
            setErrorMessage("");
            setSuccessMessage("");
            // await new Promise(r => setTimeout(r, 2000));
            const { category, subcategory, images } = data;
            let requestData = {};

            if (selectedCategoryForCreate) {
                requestData = {
                    categoryName: subcategory,
                    idCategoryParent: selectedCategoryForCreate.idCategory,
                    images: images
                };
            } else {
                requestData = {
                    categoryName: category,
                    images: images
                };
            }
            const response = await createCategoryOrSubcategory(requestData);
            if (response.message) {
                setSuccessMessage(response.message);
                setValue("category", "");
                setValue("subcategory", "");
                getCategories().then((data) => {
                    if (data && data.categories) {
                        setUpdatedCategoriesWithNullParent(data.categories.filter((category) => category.idCategoryParent === null));
                    }
                });
            }
            if (response.errorExistingCategory) {
                setErrorMessage(response.errorExistingCategory)
            }
        } catch (error) {
            throw error;
        }
    }

    const createCatOrSubcatFields = [
        { name: "category", label: "Category:" },
        { name: "subcategory", label: "Subcategory" }
    ]

    return (
        <div className="mt-4 border rounded me-4 d-flex flex-column w-100">
            <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">{title}</h2>
            <div className="d-flex flex-wrap">
                <Form className="d-flex flex-column align-items-center w-100 mx-auto" onSubmit={handleSubmit(submitForm)}>
                    {createCatOrSubcatFields.map((field) => (
                        <Form.Group key={field.name} controlId={field.name} className="w-100">
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="justify-content-center">
                                    {field.label}
                                </InputGroup.Text>
                                <Controller
                                    name={field.name}
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Control
                                            type='text'
                                            value={field.name === "category" && selectedCategoryForCreate ? selectedCategoryForCreate.categoryName : field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                clearErrors("");
                                                setSuccessMessage("");
                                                setErrorMessage("");
                                            }}
                                            isInvalid={!!errors[field.name]}
                                            disabled={(field.name === "category" && selectedCategoryForCreate) || (field.name === "subcategory" && !selectedCategoryForCreate) ? true : false}
                                        />
                                    )}
                                />
                                <OverlayTrigger
                                    key="top"
                                    placement="top"
                                    trigger={"click"}
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            {(field.name === "category" && selectedCategoryForCreate) ?
                                                "To create a category select 'Create A Category' from the select menu" :
                                                (field.name === "category" && !selectedCategoryForCreate) ?
                                                    "Enter the category name that you want to create" : ""}
                                            {(field.name === "subcategory" && selectedCategoryForCreate) ?
                                                "Enter the subcategory name that you want to create" :
                                                (field.name === "subcategory" && !selectedCategoryForCreate) ?
                                                    "To create a subcategory first choose a category from the select menu or create a new one" : ""}
                                        </Tooltip>}
                                    rootClose
                                >
                                    <div>
                                        <FaQuestionCircle type="button" className="mx-1" />
                                    </div>
                                </OverlayTrigger>
                            </InputGroup>
                        </Form.Group>
                    ))}

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                onChange={(e) => {
                                    handleCategorySelectionClick(e.target.value, updatedCategoriesWithNullParent)
                                    if (e.target.value === "" || e.target.value === "Create A Category") {
                                        setValue("subcategory", "");
                                    }
                                    if (e.target.value === "" || categoriesWithNullParent.some(option => option.categoryName === e.target.value)) {
                                        setValue("category", "")
                                    }
                                    setSuccessMessage("");
                                    setErrorMessage("");
                                }}>
                                <option value="">Select Category</option>
                                <option value="">Create A Category</option>
                                {updatedCategoriesWithNullParent && updatedCategoriesWithNullParent.map((option) => (
                                    <option key={option.categoryName} value={option.categoryName}>
                                        {option.categoryName}
                                    </option>
                                ))}
                            </select>
                        )}
                    />

                    <Form.Group controlId="images" className="w-100">
                        <InputGroup className="my-3">
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        name="images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        value={field.value?.field}
                                        onChange={e => {
                                            field.onChange(e.target.files)
                                        }}

                                    />
                                )}
                            />
                        </InputGroup>
                    </Form.Group>
                    {<small className="text-danger">{errors.images?.message}</small>}
                    {<small className="text-danger">{errors[""]?.message}</small>}
                    {!isSubmitting && successMessage && (
                        <small className="text-success">{successMessage}<BiHappyAlt className="text-black" size={25} /></small>
                    )}
                    {!isSubmitting && errorMessage && (
                        <small className="text-danger">{errorMessage}<BiConfused className="text-black" size={25} /></small>
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-label="Submitting... Please wait."
                        />}
                        {`Create ${selectedCategoryForCreate ? "Subcategory" : "Category"}`}
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default CreateCatOrSubcatForm;