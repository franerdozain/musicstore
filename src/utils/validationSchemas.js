import * as yup from "yup";

// login and register 
export const registerValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .oneOf([yup.ref("reEnterPassword"), null], "Passwords must match")
        .required("Password is required"),
    reEnterPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Re-enter password is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    zip: yup.string().required("Zip is required"),
    shippingAddress: yup.string().required("Shipping Address is required"),
});

export const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required"),
})

// create and modify product
export const CreateOrModifySchema = yup.object().shape({
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
        .min(0.01, "Discount can't be less than 1% (For 1 % enter 0.01)")
        .max(1, "Discount can't be greater than 100% (For 100 % enter 1)")
        .typeError("Values must be numbers")
        .transform((value, originalValue) => {
            if (originalValue === null || originalValue === undefined || originalValue === '') {
                return undefined;
            }
            return parseFloat(value);
        }),
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