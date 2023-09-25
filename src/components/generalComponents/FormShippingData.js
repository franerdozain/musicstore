import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { modifyUserDetails } from "../../utils/validationSchemas";
import { deleteUser, logoutUser, updateUserData, checkUserStatus } from "../../services/api";

const FormShippingData = () => {
  const navigate = useNavigate();
  const { userStatus, setUserStatus } = useAuth();
  const location = useLocation();

  const { control, handleSubmit, getValues, setValue, clearErrors, formState: { errors } } = useForm({
    resolver: yupResolver(modifyUserDetails),
  });

  useEffect(() => {
    setValue('username', userStatus.user.username);
    setValue('country', userStatus.user.country);
    setValue('state', userStatus.user.state);
    setValue('city', userStatus.user.city);
    setValue('zip', userStatus.user.zip);
    setValue('shippingAddress', userStatus.user.shippingAddress);
  }, []);

  const [isEditing, setIsEditing] = useState({
    username: false,
    country: false,
    state: false,
    city: false,
    zip: false,
    shippingAddress: false
  });

  const handleEditClick = (field) => {
    setIsEditing(prevState => ({
      ...prevState,
      [field]: true
    }));
  };

  const handleSaveClick = async (field) => {
    setIsEditing(prevState => ({
      ...prevState,
      [field]: false
    }));

    try {
      const modifiedFields = {
        [field]: getValues(field)
      };
      const responseUpdate = await updateUserData(userStatus.user.idUser, modifiedFields);
      if (responseUpdate && responseUpdate.updatedValues) {
        const newUserStatus = await checkUserStatus();

        setUserStatus({
          isAuthenticated: newUserStatus.isAuthenticated,
          user: newUserStatus.user
        });
      } else {
        console.error('Error updating user data:', responseUpdate);
      }

    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.userDeleted) {
        await logoutUser();
        const response = await checkUserStatus();
        setUserStatus({
          isAuthenticated: response.isAuthenticated,
          user: response.user
        });
        navigate("/");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="border rounded mt-4 w-100">
      <h2 className="text-center bg-secondary rounded p-1 text-white">
        {location.pathname === "/cart" ? "Shipping Details" : "Account & Shipping Details"}
      </h2>
      <Form className="d-flex flex-column align-items-center mx-auto" onSubmit={handleSubmit()}>
        {Object.keys(userStatus.user).map((field, idx) => (
          field !== "email" && field !== "idUser" && field !== "role" ? (
            <Form.Group key={field} controlId={idx} className="w-100">
              <InputGroup className="mb-3">
                <InputGroup.Text className="justify-content-center">
                  {field}
                </InputGroup.Text>
                <Controller
                  name={field}
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type='text'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        clearErrors(field.name);
                      }}
                      isInvalid={!!errors[field.name]}
                      disabled={!isEditing[field.name]}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">{errors[field]?.message}</Form.Control.Feedback>
                {!isEditing[field] && (
                  <Button variant="secondary" onClick={() => handleEditClick(field)} className="ms-2">
                    <BiEdit />
                  </Button>
                )}
                {isEditing[field] && (
                  <Button variant="danger" onClick={() => handleSaveClick(field)} className="ms-2">
                    <FaCircleCheck />
                  </Button>
                )}
              </InputGroup>
            </Form.Group>
          ) : null
        )
        )}
        {location.pathname === "/profile" && (
          <Button variant="danger" className="mt-1 mb-3" onClick={() => handleDeleteUser(userStatus.user.idUser)}>Delete Account</Button>
        )}
      </Form>

    </div>
  );
};

export default FormShippingData;
