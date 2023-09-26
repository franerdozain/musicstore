import * as yup from "yup";

// login and register 
export const registerValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and have at least 6 characters"
        )
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
export const createOrModifySchema = yup.object().shape({
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

// new password
export const newPasswordSchema = yup.object().shape({
    password: yup.string()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and have at least 6 characters"
    )
    .required("Password is required"),
    reEnterPassword: yup.string()
        .required("Please re-enter your password")
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
});

// create category/subcategory
export const createCatOrSubcatSchema = yup.object().shape({
    category: yup.string(),
    subcategory: yup.string(),
    images: yup.mixed().required("Please select one image for the category/subcategory").test(
        "fileSize",
        "File size is too large",
        (value) => {
            if (!value) return false;
            return value.length > 0 && value[0].size <= 10485760;
        }
    ),
}).test({
    name: 'at-least-one-present',
    exclusive: true,
    message: 'Category or Subcategory is required',
    test: function(value) {
        return value.category || value.subcategory;
    }
});

export const modifyUserDetails = yup.object().shape({
    username: yup.string().min(2),
    email: yup.string().email("Invalid email format"),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    shippingAddress: yup.string().required(),
})

// messages
export const contactUsNotLoggedInSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    subject: yup.string(),
    message: yup.string().min(10, "Message must have at least 10 characters").required("Message is required")
});

export const contactUsLoggedInSchema = yup.object().shape({  
    subject: yup.string(),
    message: yup.string().min(10, "Message must have at least 10 characters").required("Message is required")
});

export const answerMessageSchema = yup.object().shape({    
    subject: yup.string().min(2, "Subject must have at least 2 characters").required(),
    message: yup.string().min(10, "Message must have at least 10 characters").required()
});