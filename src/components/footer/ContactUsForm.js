import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, InputGroup, Spinner, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { contactUsLoggedInSchema, contactUsNotLoggedInSchema } from "../../utils/validationSchemas";
import { useAuth } from "../../contexts/AuthContext";

const ContactUsForm = ({ submitContactUsForm, errorMsg, clearErrorMsg, successMsg }) => {
    const { userStatus } = useAuth();
    const schema = userStatus.isAuthenticated ? contactUsLoggedInSchema : contactUsNotLoggedInSchema;

    const { handleSubmit, control, clearErrors, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });
    const formFields = userStatus.isAuthenticated ?
    [{ name: "subject", label: "Subject" }, { name: "message", label: "Message" }] :
    [{ name: "email", label: "Email" }, { name: "subject", label: "Subject" }, { name: "message", label: "Message" }];

    return (
        <Form control={control} className="d-flex flex-column" onSubmit={handleSubmit(submitContactUsForm)}>
            {formFields.map((field) => (
                <Form.Group key={field.name} controlId={field.name}>
                    <Col xs={12} sm={11} md={11} lg={7} className="mx-auto">
                        <InputGroup className="mb-3 w-100">
                            <InputGroup.Text className="justify-content-center">
                                {field.label}
                            </InputGroup.Text>
                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        as={field.name === 'message' ? 'textarea' : 'input'}
                                        type={field.name === 'email' ? 'email' : 'text'}
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            clearErrors();
                                            clearErrorMsg();
                                        }}
                                        isInvalid={!!errors[field.name]}
                                        disabled={isSubmitting}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">{errors[field.name]?.message}</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>
            ))}
            {errorMsg && (
                <Form.Text className="text-danger align-self-center">{errorMsg}</Form.Text>
            )}
            {successMsg && (
                <Form.Text className="text-success">{successMsg}</Form.Text>
            )}
            <Button
                variant="primary"
                type="submit"
                className="w-50 align-self-center"
                disabled={isSubmitting}>
                {isSubmitting && (
                    <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-label="Submitting... Please wait."
                    />
                )}
                Send
            </Button>
        </Form>
    );
}

export default ContactUsForm;