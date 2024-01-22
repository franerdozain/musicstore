import { useEffect, useState, useRef } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaMinus, FaPlus } from "react-icons/fa";

import { createProduct } from "../../services/api";
import { createOrModifySchema } from "../../utils/validationSchemas";
import { BiConfused, BiHappyAlt } from "react-icons/bi";

const ProductForm = ({ buttonName, selectedSubcategoryId, productForModify }) => {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [productFormFields, setProductFormFields] = useState(null)

    useEffect(() => {
        if (!productFormFields) {
            const formFields = createFormFields(productForModify)
            setProductFormFields(formFields)
        }

    }, [productForModify])

    const createFormFields = (product) => {
        const fields = [
            { name: "productName", label: "Product Name:" },
            { name: "price", label: { outer: "Price $:", inner: "XX.xx" } },
            { name: "discount", label: { outer: "Discount", inner: "E.g.: for 5 % discount enter 0.05" } },
            { name: "stock", label: "Initial Stock:" },
            { name: "brand", label: "Brand:" },
            { name: "supplier", label: "Supplier:" },
            { name: "slogan", label: "Slogan:" },
            { name: "description", label: "Description:" },
            { name: "images", label: "" }
        ]

        const newFields = (product && product.specifications)
            ? product.specifications.map((specification, index) => ({
                name: `specifications-${index + 1}`,
                label: `Specification ${index + 1}:`,
            }))
            : [];

        return [fields, newFields]
    }

    const addField = (fieldName) => {
        setProductFormFields(prevFields => {
            const isFieldAlreadyAdded = prevFields.some(field => field.name === fieldName);
            const label = fieldName.startsWith("spec") ? "Specification:" : "Feature:";
            return isFieldAlreadyAdded ? prevFields : [...prevFields, { name: `${fieldName}-${Date.now()}`, label }];
        });
    }

    const removeField = (fieldName) => {
        const fieldType = fieldName.split('-')[0];
        const isLastField = productFormFields.filter(field => field.name.startsWith(fieldType)).length === 1;

        if (!isLastField) {
            setProductFormFields(prevFields => prevFields.filter(field => field.name !== fieldName));
        }
    }

    const { control, handleSubmit, setValue, clearErrors, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(createOrModifySchema)
    })

    const submitForm = async (data) => {
        try {
            setErrorMsg("");
            setSuccessMsg("");
            const requestData = { ...data, idCategory: selectedSubcategoryId };
            const response = await createProduct(requestData);
            if (response.message) {
                setSuccessMsg(response.message);
                productFormFields.map(field => setValue(field.name, ""))
            }
            if (response.errorExistingProduct) setErrorMsg(response.errorExistingProduct)
            if (response.errorStoringData) setErrorMsg(response.errorStoringData)
        } catch (error) {
            throw error;
        }
    }

    return (
        <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleSubmit(submitForm)}>
            {productFormFields && productFormFields[0].map((field, i) => (
                field.name !== "images" && (
                    <Form.Group key={field.name} controlId={field.name} className="w-100">
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="justify-content-center">
                                {field.label.outer || field.label}
                            </InputGroup.Text>
                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        defaultValue={productForModify ? productForModify[field.name] : ""}
                                        type={{
                                            price: 'number',
                                            discount: 'number',
                                            stock: 'number',
                                        }[field.name] || 'text'}
                                        step={{
                                            price: '1',
                                            discount: '0.01',
                                            stock: '1'
                                        }[field.name]}
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            clearErrors(field.name);
                                            setErrorMsg("");
                                            setSuccessMsg("");
                                        }}
                                        isInvalid={!!errors[field.name]}
                                    />
                                )}
                            />
                            {field.name.startsWith("specifications") && (
                                <>
                                    <FaPlus type="button" onClick={() => addField('specifications')} />
                                    <FaMinus type="button" onClick={() => removeField(field.name)} />
                                </>
                            )}
                            {field.name.startsWith("features") && (
                                <>
                                    <FaPlus type="button" onClick={() => addField('features')} />
                                    <FaMinus type="button" onClick={() => removeField(field.name)} />
                                </>
                            )}
                            <Form.Control.Feedback type="invalid">{errors[field.name]?.message}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                )
            ))}

            {productFormFields && productFormFields[1].map((field, i) => (
                field.name !== "images" && (
                    <Form.Group key={field.name} controlId={field.name} className="w-100">
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="justify-content-center">
                                {field.label.outer || field.label}
                            </InputGroup.Text>
                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        defaultValue={productForModify.specifications[i]}
                                        type={{
                                            price: 'number',
                                            discount: 'number',
                                            stock: 'number',
                                        }[field.name] || 'text'}
                                        step={{
                                            price: '1',
                                            discount: '0.01',
                                            stock: '1'
                                        }[field.name]}
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            clearErrors(field.name);
                                            setErrorMsg("");
                                            setSuccessMsg("");
                                        }}
                                        isInvalid={!!errors[field.name]}
                                    />
                                )}
                            />
                            {field.name.startsWith("specifications") && (
                                <>
                                    <FaPlus type="button" onClick={() => addField('specifications')} />
                                    <FaMinus type="button" onClick={() => removeField(field.name)} />
                                </>
                            )}
                            {field.name.startsWith("features") && (
                                <>
                                    <FaPlus type="button" onClick={() => addField('features')} />
                                    <FaMinus type="button" onClick={() => removeField(field.name)} />
                                </>
                            )}
                            <Form.Control.Feedback type="invalid">{errors[field.name]?.message}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                )
            ))}
            <Form.Group controlId="images" className="w-100">
                <InputGroup className="mb-3">
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
                    <small className="text-danger">{errors.images?.message}</small>
                </InputGroup>
            </Form.Group>
            {!isSubmitting && successMsg && (
                <small className="text-success">{successMsg}<BiHappyAlt className="text-black" size={25} /></small>
            )}
            {!isSubmitting && errorMsg && (
                <small className="text-danger">{errorMsg}<BiConfused className="text-black" size={25} /></small>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-label="Submitting... Please wait."
                />}
                {buttonName}
            </Button>
        </Form>
    )
}
export default ProductForm;