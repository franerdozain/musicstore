import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";


const FormShippingData = () => {
  
  // for designing purposes
  const initialUser = {
    "user": [
      {
        "Address": "742 Evergreen Terrace",
        "Country": "Israel",
        "City": "Haifa",
        "State": "Haifa",
        "Zip": 33000
      }
    ]
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(-1);

  const handleEditClick = (index) => {
    setIsEditing(index);
  };
  
  const handleSaveClick = () => {
    setIsEditing(-1);
  };
  
  const handleChange = (event, field) => {
    const updatedUser = { ...user };
    updatedUser.user[0][field] = event.target.value;
    setUser(updatedUser);
  };

  return (
    <div className="border rounded mt-4">
      <h2 className="text-center">Shipping Details</h2>
      {Object.keys(user.user[0]).map((fieldName, index) => (
        <InputGroup key={index} className="mt-3">
          <InputGroup.Text aria-describedby="basic-addon1" className="w-25 justify-content-center">
            {fieldName}
          </InputGroup.Text>
          <Form.Control
            type="text"
            disabled={isEditing !== index}
            placeholder={`Enter ${fieldName}`}
            aria-label={`User's ${fieldName}`}
            aria-describedby="basic-addon2"
            value={user.user[0][fieldName]}
            onChange={(event) => handleChange(event, fieldName)}
          />
          <Button variant={`${isEditing === index ? "danger" : "secondary"}`}>
            {isEditing === index ? (
              <FaCircleCheck onClick={handleSaveClick} className="mb-1" />
            ) : (
              <BiEdit onClick={() => handleEditClick(index)} className="mb-1" />
            )}
          </Button>
        </InputGroup>
      ))}
    </div>
  );
};

export default FormShippingData;
