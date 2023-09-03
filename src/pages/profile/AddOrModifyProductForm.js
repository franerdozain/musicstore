import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

import InputField from "../../components/navbar/InputField";

const AddOrModifyProductForm = ({ handleCreateProduct, handleInputChange, productDetail, buttonName  }) => {
    return (
        <Form className="d-flex flex-column align-items-center w-75 mx-auto" onSubmit={handleCreateProduct}>
            {Object.keys(productDetail).map((detail, idx) => (
              <div key={idx} className="w-100">
              {detail === "Images" ? (
                  <InputField
                      typeInput="file"
                      textInput={detail}
                      name={detail}
                      value={undefined} 
                      onChange={(e) => handleInputChange(detail, e)}
                      marginBottom={"mb-0"}
                      multiple 
                  />
              ) : (
                <>
                  <InputField
                      typeInput={productDetail[detail].type || "textarea"}
                      textInput={detail}
                      name={detail}
                      value={productDetail[detail].value}
                      onChange={(e) => handleInputChange(detail, e)}
                      marginBottom={"mb-0"}
                  />
                  {(detail === "Specification" || detail === "Feature") && (
                    <FaPlus />
                )}
                </>
              )}
          </div>             
            ))
            }
            <Button>
                {buttonName}
            </Button>
        </Form>

    )
}
export default AddOrModifyProductForm;