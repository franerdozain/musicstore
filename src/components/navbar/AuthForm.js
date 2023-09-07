import React from "react";
import { Form, Button, Spinner, InputGroup } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginValidationSchema, registerValidationSchema } from "../../utils/validationSchemas";

const AuthForm = ({ submitAuthForm, isSubmitting, errorMsg, clearErrorMsg, successMsg, formType }) => {
    const validationSchema = formType === "registration" ? registerValidationSchema : loginValidationSchema;

    const { handleSubmit, control, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const registerFormFields = [
        { name: "email", label: "Email: " },
        { name: "username", label: "Username: " },
        { name: "password", label: "Password: " },
        { name: "reEnterPassword", label: "Re-enter Password: " },
        { name: "country", label: "Country: " },
        { name: "state", label: "State: " },
        { name: "city", label: "City: " },
        { name: "zip", label: "Zip: " },
        { name: "shippingAddress", label: "Shipping Address: " }
    ];

    const loginFormFields = [
        { name: "email", label: "Email: " },
        { name: "password", label: "Password: " },
    ]

    const formFields = formType === "registration" ? registerFormFields : loginFormFields;

    return (
        <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleSubmit(submitAuthForm)}>
            {formFields.map((field) => (
                <Form.Group key={field.name} controlId={field.name}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="justify-content-center">
                            {field.label}
                        </InputGroup.Text>
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field }) => (
                                <Form.Control
                                    type={{
                                        email: 'email',
                                        password: 'password',
                                        reEnterPassword: 'password'
                                    }[field.name] || 'text'}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                        clearErrors("password");
                                        clearErrors("reEnterPassword");
                                        if ((formType === "registration" && field.name === "email") || (formType === "login")) {
                                            clearErrorMsg();
                                        }
                                    }}
                                    isInvalid={!!errors[field.name]}
                                />
                            )}
                        />
                        <Form.Control.Feedback type="invalid">{errors[field.name]?.message}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            ))}
            {errorMsg && (
                <Form.Text className="text-danger">{errorMsg}</Form.Text>
            )}
            {successMsg && (
                <Form.Text className="text-success">{successMsg}</Form.Text>
            )}
            <Button
                variant="primary"
                type="submit"
                className="w-50"
                disabled={isSubmitting}>
                {isSubmitting && (
                    <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-label="Submitting... Please wait."
                    />
                )}
                {formType === "login" ? "Login" : "Create Account"}
            </Button>
        </Form>
    );
};

export default AuthForm;