import { useState } from "react";
import { Button, Carousel, Container, Image, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import DropdownQuantity from "./DropdownQuantity";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [itemCart, setItemCart] = useState(null)

    const handleQuantitySelect = (selectedQuantity) => {
        setQuantity(selectedQuantity);
    };

    const handleInputValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCheckClick = () => {
        setQuantity(inputValue ? inputValue : 1);
        setInputValue("");
    };

    const handleAddClick = () => {
        setItemCart()
    }

    // after req to the db based on the productID
    const product = {
        "product": [
            {
                "productID": 0,
                "productName": "Takamine EF360SC-TT Thermal Top Acoustic Guitar Gloss Natural",
                "price": 2299.99,
                "slogan": `Classic tone from the first strum thanks to special, pre-aged "Thermal" top.`,
                "description": `The voice of true vintage, played-in tone is yours from the first note with the EF360S-TT. The pre-aged properties of the Takamine EF360SC-TT solid Thermal Top Acoustic-Electric with solid American rosewood back and sides deliver an extra measure of low-end horsepower with this classic non-cutaway dreadnought. Grained ivoroid binding and faux tortoiseshell pickguard, Gotoh tuners and understated 'T' logo appropriately accentuate the wide-open vintage tone of this killer instrument. Add Takamine's CT4B II preamp with 3-band EQ and tuner, and you own an acoustic guitar with the sound you've always dreamed of with electronics that can accurately translate to an audience of fifty or fifty thousand.
    
                Includes case.`,
                "stock": 250,
                "brand": "Takamine",
                "specifications": {
                    "Body": ["Body type: Dreadnought DreadnoughtreadnoughtDreadnoughtDreadnought Dreadnought Dreadnought Dreadnought DreadnoughtDreadnought", "Cutaway: Single", "Top wood: Solid thermal spruce top", "Back and sides: Solid Indian rosewood", "Bracing pattern: Not specified", "Body finish: Gloss Natural", "Orientation: Right handed"],
                    "Neck": ["Neck shape: Not specified", "Nut width: 1.675 in. (42.5 mm)", "Fingerboard: Ebony", "Neck wood: Mahogany", "Scale length: 24.9 in.", "Number of frets: 20", "Neck finish: Open pore"],
                    "Electronics": ["Pickup/preamp: Yes", "Brand: Takamine", "Configuration: Undersaddle piezo", "Preamp EQ: 3-band", "Feedback filter: No", "Tuner: Yes"],
                    "Other": ["Headstock overlay: Rosewood", "Tuning machines: Gotoh", "Bridge: Rosewood", "Saddle and nut: Bone", "Number of strings: 6", "Special features: None", "Case: Hardshell case", "Accessories: None", "Country of origin: Japan"]
                },
                "features": ["Matte-finished solid Sitka spruce top, layered sapele back and sides",
                    "Hard rock maple neck, genuine West African ebony fingerboard and bridge",
                    "Chrome tuners with chrome buttons",
                    "Taylor Expression System 2 Professional Audio-Grade electronics"],
                "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/K46236000001000-00-720x720.jpg",
                "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/K46236000001000-01-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/K46236000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/K46236000001000-03-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/K46236000001000-04-720x720.jpg"],
                "categoryID": 27,
            }
        ]
    }

    return (
        <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-3">
            <Carousel interval={null} className="w-75" data-bs-theme="dark">
                {product.product[0].galleryImagesURL.map((image, index) => (
                    <Carousel.Item key={index} >
                        <Image
                            className="d-block w-100"
                            src={image}
                            alt=""
                            style={{ objectFit: "contain", maxHeight: "80vh" }}
                        />
                    </Carousel.Item>
                ))
                }
            </Carousel>
            <h2>{product.product[0].productName}</h2>
            <h2>$ {product.product[0].price}</h2>

            {product.product[0].features && (
                <div>
                    <h4 className="text-center">Features</h4>
                    <ul>
                        {product.product[0].features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="d-flex w-25 justify-content-evenly">
                <DropdownQuantity
                    quantity={quantity}
                    handleQuantitySelect={handleQuantitySelect}
                    handleInputValueChange={handleInputValueChange}
                    handleCheckClick={handleCheckClick}
                    inputValue={inputValue}
                />
                <Button onClick={handleAddClick}>Add To Cart</Button>
            </div>

            {product.product[0].slogan && (
                <h5>{product.product[0].slogan}</h5>
            )}

            {product.product[0].description && (
                <span>{product.product[0].description}</span>

            )}

            <div className="w-100">
                {product.product[0].specifications &&
                    Object.entries(product.product[0].specifications).map(
                        ([specCategory, specList], index) => (
                            <div className="table-responsive" key={index} >
                                <span className="fw-bold">{specCategory}</span>
                                <Table striped borderless variant="light">
                                    <tbody>
                                        {specList.map((spec, specIndex) => (
                                            <tr key={specIndex}>
                                                <td>{spec}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    )}
            </div>

        </Container>
    )
}
export default ProductDetails;