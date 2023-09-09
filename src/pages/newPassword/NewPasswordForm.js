import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { newPasswordSchema } from "../../utils/validationSchemas";

const NewPasswordForm = ({ onSubmit, tokenEpired, loading, setLoading, updatedMsg, disabled, errorMsg }) => {

    const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(newPasswordSchema)
    });

    const fields = [
        { name: "password", label: "Password: " },
        { name: "reEnterPassword", label: "Re Enter Password: " },
    ]

    return (
        <Form className="d-flex flex-column w-100 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <Form.Group key={field.name} className="mb-4">
                    <InputGroup>
                        <InputGroup.Text>{field.label}</InputGroup.Text>
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field }) => (
                                <Form.Control
                                    type="password"
                                    value={field.value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                        clearErrors("password");
                                        clearErrors("reEnterPassword");
                                    }}
                                    isInvalid={!!errors[field.name]}
                                    autoFocus={field.name === fields[0].name}
                                />
                            )}
                        />
                        <Form.Control.Feedback type="invalid">{errors[field.name]?.message}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            ))
            }
            {tokenEpired && <small className="text-danger">{tokenEpired}</small>}
            {updatedMsg && <small className="text-success">{updatedMsg}</small>}
            {errorMsg && <small className="text-danger text-center">{errorMsg}</small>}
            <Button
                type="submit"
                className="w-75 align-self-center"
                disabled={disabled}
                onClick={() => {
                    setLoading(true);
                    setLoading(false);
                    handleSubmit(onSubmit)();
                }}
            >
                {loading && (
                    <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-label="Submitting... Please wait."
                    />
                )}
                Submit
            </Button>
        </Form>
    )
}

export default NewPasswordForm;