import { Button, Form, InputGroup } from "react-bootstrap";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { uploadImages } from "../../services/api";
import { CreateOrModifySchema } from "../../utils/validationSchemas";

const ProductForm = ({ buttonName }) => {

    const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(CreateOrModifySchema)
    })

    const submitForm = async (data) => {
        try {     
            //change it to await createOrModifyProduct
            // const response = await uploadImages(data);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const productFormFields = [
        { name: "productName", label: "Product Name:" },
        { name: "price", label: { outer: "Price $:", inner: "XX.xx" } },
        { name: "discount", label: { outer: "Discount", inner: "E.g.: for 5 % discount enter 0.05" } },
        { name: "stock", label: "Initial Stock:" },
        { name: "brand", label: "Brand:" },
        { name: "supplier", label: "Supplier:" },
        { name: "slogan", label: "Slogan:" },
        { name: "description", label: "Description:" },
        { name: "specifications", label: "Specifications:" },
        { name: "features", label: "Features:" },
        { name: "images", label: "" }
    ];

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