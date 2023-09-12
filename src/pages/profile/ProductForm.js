import { Button, Form, InputGroup } from "react-bootstrap";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { createProduct } from "../../services/api";
import { createOrModifySchema } from "../../utils/validationSchemas";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

const ProductForm = ({ buttonName }) => {

    const [productFormFields, setProductFormFields] = useState([
        { name: "productName", label: "Product Name:" },
        { name: "price", label: { outer: "Price $:", inner: "XX.xx" } },
        { name: "discount", label: { outer: "Discount", inner: "E.g.: for 5 % discount enter 0.05" } },
        { name: "stock", label: "Initial Stock:" },
        { name: "brand", label: "Brand:" },
        { name: "supplier", label: "Supplier:" },
        { name: "slogan", label: "Slogan:" },
        { name: "description", label: "Description:" },
        { name: "specifications-1", label: "Specification:" },
        { name: "features-1", label: "Feature:" },
        { name: "images", label: "" }
    ]);

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

    const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(createOrModifySchema)
    })

    const submitForm = async (data) => {
        try {
            const response = await createProduct(data);
            console.log("response in front end:", response)
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleSubmit(submitForm)}>
            {productFormFields.map((field) => (
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
                                        // {...field}                                  
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

            <Button type="submit">
                {buttonName}
            </Button>
        </Form>
    )
}
export default ProductForm;