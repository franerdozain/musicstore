import { Button, Form, InputGroup } from "react-bootstrap";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { createCatOrSubcatSchema } from "../../utils/validationSchemas";

const CreateCatOrSubcatForm = ({ title, categoriesWithNullParent, selectedCategoryForCreate, handleCategorySelectionClick }) => {

    const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(createCatOrSubcatSchema)
    });

    const submitForm = async (data) => {
        try {

        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const createCatOrSubcatFields = [
        { name: "category", label: "Category:" },
        { name: "subcategory", label: "Subcategory" }
    ]

    return (
        <div className="mt-4 border rounded me-4 d-flex flex-column">
            <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">{title}</h2>
            <div className="d-flex flex-wrap">
                <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleSubmit(submitForm)}>
                    {createCatOrSubcatFields.map((field) => (
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
                                            type='text'
                                            value={field.name === "category" && selectedCategoryForCreate ? selectedCategoryForCreate : field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                clearErrors(field.name);
                                            }}
                                            isInvalid={!!errors[field.name]}
                                            disabled={(field.name === "category" && selectedCategoryForCreate) || (field.name === "subcategory" && !selectedCategoryForCreate) ? true : false}
                                        />
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">{errors[field.name]?.message}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    ))}

                    <label>For Subcategory Select First A Category</label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <select {...field} onChange={(e) => handleCategorySelectionClick(e.target.value)}>
                                <option value="">Select Category</option>
                                {categoriesWithNullParent.map((option) => (
                                    <option key={option.categoryName} value={option.categoryName}>
                                        {option.categoryName}
                                    </option>
                                ))}
                            </select>
                        )}
                    />

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
                        {`Create ${selectedCategoryForCreate ? "Subcategory" : "Category"}`}
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default CreateCatOrSubcatForm;
