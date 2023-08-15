const AccountInfo = () => {
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
    )
}