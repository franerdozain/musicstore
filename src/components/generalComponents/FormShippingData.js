import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { useLocation } from "react-router-dom";


const FormShippingData = ({details}) => {

  const [user, setUser] = useState(details[0]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const location = useLocation();
  
  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    setEditingIndex(-1);
  };
  
  const handleChange = (event, field) => {
    const updatedUser = { ...user };
    updatedUser[field] = event.target.value;
    setUser(updatedUser);
  };

  return (
    <div className="border rounded mt-4">
      {
        <h2 className="text-center bg-secondary rounded p-1 text-white">
          {location.pathname === "/cart" ?
            "Shipping Details" :
            "Account & Shipping Details"}
        </h2>
      }     
      {Object.keys(user).map((fieldName, index) => (
        <InputGroup key={index} className="mt-3">
          <InputGroup.Text aria-describedby="basic-addon1" className="w-25 justify-content-center">
            {fieldName}
          </InputGroup.Text>
          <Form.Control
            type="text"
            className="text-center"
            disabled={editingIndex !== index}
            placeholder={`Enter ${fieldName}`}
            aria-label={`User's ${fieldName}`}
            aria-describedby="basic-addon2"
            value={user[fieldName]}
            onChange={(event) => handleChange(event, fieldName)}
          />
          {fieldName !== "Email" && (
            <Button variant={`${editingIndex === index ? "danger" : "secondary"}`}>
              {editingIndex === index ? (
                <FaCircleCheck onClick={handleSaveClick} className="mb-1" />
              ) : (
                <BiEdit onClick={() => handleEditClick(index)} className="mb-1" />
              )}
            </Button>
          )
          }
        </InputGroup>
      ))}
    </div>
  );
};

export default FormShippingData;
