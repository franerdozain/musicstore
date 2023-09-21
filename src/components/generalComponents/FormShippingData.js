import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { modifyUserDetails, registerValidationSchema } from "../../utils/validationSchemas";
import { checkUserStatus, deleteUser, logoutUser, updateUserData } from "../../services/api";


const FormShippingData = () => {
  const navigate = useNavigate();
  const { userStatus, setUserStatus } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [initialUserData, setInitialUserData] = useState({
    email: { value: userStatus.user.email, label: "Email", isDisabled: true },
    username: { value: userStatus.user.username, label: "Username", isDisabled: true },
    country: { value: userStatus.user.country, label: "Country", isDisabled: true },
    state: { value: userStatus.user.state, label: "State", isDisabled: true },
    city: { value: userStatus.user.city, label: "City", isDisabled: true },
    zip: { value: userStatus.user.zip, label: "Zip", isDisabled: true },
    shippingAddress: { value: userStatus.user.shippingAddress, label: "Shipping Address", isDisabled: true },
  });
  const location = useLocation();
  const [isFieldDisabled, setIsFieldDisabled] = useState({
    email: true,
    username: true,
    country: true,
    state: true,
    city: true,
    zip: true,
    shippingAddress: true,
  });

  const handleEditClick = (field) => {
    setIsFieldDisabled(prevState => ({
      ...prevState,
      [field]: false
    }));
  };

  const handleSaveClick = (field) => {
    setIsFieldDisabled(prevState => ({
      ...prevState,
      [field]: true
    }));
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
       if(response.userDeleted) {
        await logoutUser();
        const response = await checkUserStatus();
        setUserStatus({
            isAuthenticated: response.isAuthenticated,
            user: response.user
          });
        navigate("/");                             
       }
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  };

  const { control, handleSubmit, clearErrors, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(modifyUserDetails)
  });

  const submitForm = async (form) => {
    const modifiedFields = {};
    for (const key in form) {
      if (form[key] !== initialUserData[key]) {
        modifiedFields[key] = form[key];
      }
    }
    try {
      const responseUpdate = await updateUserData(userStatus.user.idUser, modifiedFields)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  };
  const a = true
  return (
    <div className="border rounded mt-4 w-100">
      <h2 className="text-center bg-secondary rounded p-1 text-white">
        {location.pathname === "/cart" ? "Shipping Details" : "Account & Shipping Details"}
      </h2>
      <Form className="d-flex flex-column align-items-center mx-auto" onSubmit={handleSubmit(submitForm)}>
        {Object.keys(initialUserData).map((field) => (
          <Form.Group key={field} controlId={field} className="w-100" >
            <InputGroup className="mb-3" >
              <InputGroup.Text className="justify-content-center" >
                {initialUserData[field].label}
              </InputGroup.Text>
              <Controller

                name={field}
                control={control}
                defaultValue={initialUserData[field].value}
                render={({ field }) => (
                  <Form.Control

                    type='text'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      clearErrors(field.name);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    isInvalid={!!errors[field.name]}
                    disabled={isFieldDisabled[field]}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">{errors[field]?.message}</Form.Control.Feedback>
              {field !== "email" && isFieldDisabled[field] && (
                <Button variant="secondary" onClick={() => handleEditClick(field)} className="ms-2">
                  <BiEdit />
                </Button>
              )}
              {field !== "email" && !isFieldDisabled[field] && (
                <Button variant="danger" onClick={() => handleSaveClick(field)} className="ms-2">
                  <FaCircleCheck />
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        ))}
        <div className="d-flex flex-column w-100 align-items-center">
          <Button type="submit" variant="primary" className="my-2">Submit Changes</Button>
          { location.pathname === "/profile" && (
            <Button variant="danger" className="mt-1 mb-3" onClick={() => handleDeleteUser(userStatus.user.idUser)}>Delete Account</Button>            
          )            
          }
        </div>
      </Form>
    </div>
  );
};

export default FormShippingData;

// const { userStatus } = useAuth();
//   const [shoppingHistory, setShoppingHistory] = useState([]);

//   useEffect(() => {
//     if (userStatus.isAuthenticated) {
//       const fetchOrders = async () => {
//         try {
//           const response = await getOrders(userStatus);
//           if (response.orders) {
//             setShoppingHistory(response.orders);
//           }
//         } catch (error) {
//           console.log(`Error: ${error}`)
//         }
//       }
//       fetchOrders();
//     }
//   }, [])

//return
{/* <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-3">
{userStatus.user === null ? (
  <Spinner
    animation="border"
    size="lg"
    role="status"
    aria-label="Submitting... Please wait."
  />
) : (
  <>
    {!userStatus.isAuthenticated ? (
      <p>"Please create an account or login"</p>
    ) : (
      <div className="min-vh-100 d-flex flex-wrap">
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <div className="mx-1 mx-md-4">
                <FormShippingData userDetails={userStatus.user} />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mt-4 border rounded me-4">
                <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">Shopping History</h2>
                {shoppingHistory ? (
                  <div className="table-responsive">
                    <Table striped borderless variant="light mb-0">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shoppingHistory.map((order) => (
                          <tr key={order.idOrder}>
                            <td>{order.dateAndTime}</td>
                            <td>{order.idOrder}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>${order.unitPrice.toFixed(2)}</td>
                            <td>${(order.unitPrice * order.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )}
  </>
)}
</Container> */}