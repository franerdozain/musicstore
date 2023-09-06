import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { uploadImages } from "../../services/api";
import { useState } from "react";

const schema = yup.object().shape({
    productName: yup.string().required("Please enter product's name"),
    price: yup
        .number()
        .typeError("Values must be numbers and cannot be empty")
        .positive("Price can't be negative")
        .required("Please Enter Product's Initial Price")
        .min(0.5, "Price must be greater than 0.5")
        .max(1000000, "Price cannot be greater than $ 1,000,000"),
    discount: yup
        .number()
        .typeError("Values must be numbers")
        .transform((value, originalValue) => {
            if (originalValue === null || originalValue === undefined || originalValue === '') {
                return undefined;
            }
            return parseFloat(value);
        })
        .positive()
        .min(0.01, "Discount can't be less than 1% (For 1 % enter 0.01)")
        .max(1, "Discount can't be greater than 100% (For 100 % enter 1)"),
    stock: yup
        .number()
        .typeError("Please enter product's initial stock")
        .positive()
        .integer()
        .required("Please Enter Product's Initial Stock"),
    brand: yup.string(),
    supplier: yup.string(),
    slogan: yup.string(),
    description: yup.string(),
    specifications: yup.string(),
    features: yup.string(),
    images: yup.mixed().required("Please select at least one image").test(
        "fileSize",
        "File size is too large",
        (value) => {
            if (!value) return false;
            return value.length > 0 && value[0].size <= 10485760; 
        }
    ),
})


const ProductForm = ({ buttonName }) => {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const submitForm = async (data) => {   
        // console.log("submitForm", data);    
        // const newData = new FormData();
        // newData.append("hola", "chau")
        // for(let e in data){
        //     console.log("trastorno", data[e]);
        //     newData.append(e, data[e])
        // }
        // console.log("tofu", newData);
        console.log("picolo", data);
        try {
            const response = await uploadImages(data);
            console.log("where am i", response);
        } catch (error) {
            console.log("Error: ", error);
        }

    }

    const placeholders = {
        productName: "Product Name:",
        price: { outer: "Price $:", inner: "XX.xx" },
        discount: { outer: "Discount", inner: "E.g.: for 5 % discount enter 0.05" },
        stock: "Initial Stock:",
        brand: "Brand:",
        supplier: "Supplier:",
        slogan: "Slogan:",
        description: "Description:",
        specifications: "Specifications:",
        features: "Features:",
        images: ""
    };

    return (
        <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleSubmit(submitForm)} enctype="multipart/form-data">
            {Object.keys(schema.fields).map((fieldName) => (
                <Form.Group key={fieldName} controlId={fieldName} className="w-100">
                    <InputGroup className="mb-3">                 
                        <>
                            <InputGroup.Text className="justify-content-center">
                                {placeholders[fieldName].outer || placeholders[fieldName]}
                            </InputGroup.Text>
                                <Controller
                                    name={fieldName}
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Control
                                            {...field}
                                            placeholder={placeholders[fieldName].inner}
                                            type={{
                                                price: 'number',
                                                discount: 'number',
                                                stock: 'number',
                                            }[fieldName] || 'text'}
                                        />
                                    )}
                                />
                        </>

                        <small className="text-danger">{errors[fieldName]?.message}</small>
                    </InputGroup>
                </Form.Group>
            ))}
            <Form.Group controlId="images" className="w-100">
                <InputGroup className="mb-3">
                    <Controller
                        name="images"
                        control={control}
                        render={({ field }) => (
                            <>
                                <input                                
                                    {...field}
                                    name="images"
                                    type="file"
                                    accept="image/*"
                                    multiple                                      
                                    value={field.value?.fieldName}
                                    onChange={e => {                                        
                                        field.onChange(e.target.files)
                                    }}                                                            
                                />
                                <Button variant="primary rounded">
                                    <FaPlus />
                                </Button>
                            </>
                        )}
                    />
                </InputGroup>
            </Form.Group>

            <Button type="submit">
                {buttonName}
            </Button>
        </Form>

    )
}
export default ProductForm;


{/* <><input
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            const selectedFiles = e.target.files;
                            console.log("selected img:", selectedFiles);
                        }} /> */}






                        //     <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
                        //     {Object.keys(schema.fields).map((fieldName) => (
                        //         <Form.Group key={fieldName} controlId={fieldName} className="w-100">
                        //             <InputGroup className="mb-3">                                               
                                    
                                       
                        //                         <InputGroup.Text className="justify-content-center">
                        //                             {placeholders[fieldName].outer || placeholders[fieldName]}
                        //                         </InputGroup.Text>
                        //                         <input
                        //                             {...register(fieldName)} // Registra otros campos usando register
                        //                             placeholder={placeholders[fieldName].inner}
                        //                             type={{
                        //                                 price: 'number',
                        //                                 discount: 'number',
                        //                                 stock: 'number',
                        //                             }[fieldName] || 'text'}
                        //                         />
                                         
                                     
                
                        //                 <small className="text-danger">{errors[fieldName]?.message}</small>
                        //             </InputGroup>
                        //         </Form.Group>
                        //     ))}
                        //      <input
                        //                         {...register("images")}
                        //                             name="images"
                        //                             type="file"
                        //                             accept="image/*"
                        //                             multiple
                        //                             onChange={handleFiles}
                                                   
                        //                         />
                        //                         <Button variant="primary rounded">
                        //                             <FaPlus />
                        //                         </Button>
                                          
                
                        //     <Button type="submit">
                        //         {buttonName}
                        //     </Button>
                        // </Form>