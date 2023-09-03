import { useState } from "react";
import { Button, Col, Table, Image, Form, InputGroup } from "react-bootstrap";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";

import FormShippingData from "../../components/generalComponents/FormShippingData";
import CheckoutModal from "./CheckoutModal";

const Cart = () => {
    const [modalShow, setModalShow] = useState(false);

    const handleClick = () => {
        setModalShow(true)
    }

    // for design purposes
    const cart = {
        "product": [
            {
                "productID": 0,
                "productName": "Takamine EF360SC-TT Thermal Top Acoustic Guitar Gloss Natural",
                "price": 2299.99,
                "quantity": 1,
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
            },
            {
                "productID": 1,
                "productName": "Taylor AD11e Grand Theater Acoustic Guitar Black",
                "price": 1799.00,
                "quantity": 3,
                "slogan": "Grand Theater acoustic with spruce top and ES2 pickup",
                "description": `Taylor has added a fresh look and sound to the compact GT (Grand Theater) in the form of a this AD11e Grand Theater spruce edition featuring solid American walnut back and sides. Inside, C-Class bracing dials up more power in the bass range, producing a surprisingly rich low end for a smaller guitar. The player-friendly body of the AD11e Grand Theater includes chamfered edges, while the comfortable 24-1/8" scale length creates a relaxed handfeel that makes fretting chords and bending notes easy. Other notable features include comfortable chamfered body edges, a contrasting maple/black rosette, Italian acrylic dot fretboard inlays, a thin matte-finish body with a black top, a black pickguard and Taylor Mini nickel tuners. The AD11e Grand Theater also features onboard ES2 electronics and ships with Taylor's popular AeroCase for sturdy protection at an exceptionally lightweight.`,
                "stock": 250,
                "brand": "Taylor",
                "specifications": {
                    "Body": ["Body type: Non-Cutaway", "Top wood: Spruce", "Back & sides: Walnut", "Bracing pattern: C-Class"],
                    "Neck": ["Neck shape: GT Carve", "Nut width: 1-23/32” (43.6 mm)", "Fingerboard: Smoked eucalyptus", "Neck wood: Mahogany", 'Scale length: 24.125"', "Number of frets: 20", "Neck finish: Matte", "Bridge: Smoked eucalyptus", "Saddle & nut: Mircata/TUSQ"],
                    "Electronics": ["Pickup/preamp: Behind-the-saddle transducer with Adjustable Sensors"],
                    "Other": ["Tuning machines: Taylor Mini tuners", "Orientation: Right-handed", "Number of strings: 6 String", "Case: AeroCase", "Country of origin: United States"]
                },
                "features": ["Spruce top and walnut body", "Mahogany neck", "Smoked eucalyptus fingerboard and bridge", "Expression System 2 Professional Audio-Grade pickup"],
                "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/L92120000001000-01-720x720.jpg",
                "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/L92120000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-04-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-05-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-07-720x720.jpg"],
                "categoryID": 27,
            },
            {
                "productID": 1,
                "productName": "Taylor AD11e Grand Theater Acoustic Guitar Black",
                "price": 1799.00,
                "quantity": 1,
                "slogan": "Grand Theater acoustic with spruce top and ES2 pickup",
                "description": `Taylor has added a fresh look and sound to the compact GT (Grand Theater) in the form of a this AD11e Grand Theater spruce edition featuring solid American walnut back and sides. Inside, C-Class bracing dials up more power in the bass range, producing a surprisingly rich low end for a smaller guitar. The player-friendly body of the AD11e Grand Theater includes chamfered edges, while the comfortable 24-1/8" scale length creates a relaxed handfeel that makes fretting chords and bending notes easy. Other notable features include comfortable chamfered body edges, a contrasting maple/black rosette, Italian acrylic dot fretboard inlays, a thin matte-finish body with a black top, a black pickguard and Taylor Mini nickel tuners. The AD11e Grand Theater also features onboard ES2 electronics and ships with Taylor's popular AeroCase for sturdy protection at an exceptionally lightweight.`,
                "stock": 250,
                "brand": "Taylor",
                "specifications": {
                    "Body": ["Body type: Non-Cutaway", "Top wood: Spruce", "Back & sides: Walnut", "Bracing pattern: C-Class"],
                    "Neck": ["Neck shape: GT Carve", "Nut width: 1-23/32” (43.6 mm)", "Fingerboard: Smoked eucalyptus", "Neck wood: Mahogany", 'Scale length: 24.125"', "Number of frets: 20", "Neck finish: Matte", "Bridge: Smoked eucalyptus", "Saddle & nut: Mircata/TUSQ"],
                    "Electronics": ["Pickup/preamp: Behind-the-saddle transducer with Adjustable Sensors"],
                    "Other": ["Tuning machines: Taylor Mini tuners", "Orientation: Right-handed", "Number of strings: 6 String", "Case: AeroCase", "Country of origin: United States"]
                },
                "features": ["Spruce top and walnut body", "Mahogany neck", "Smoked eucalyptus fingerboard and bridge", "Expression System 2 Professional Audio-Grade pickup"],
                "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/L92120000001000-01-720x720.jpg",
                "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/L92120000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-04-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-05-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-07-720x720.jpg"],
                "categoryID": 27,
            },
            {
                "productID": 1,
                "productName": "Taylor AD11e Grand Theater Acoustic Guitar Black",
                "price": 1799.00,
                "quantity": 1,
                "slogan": "Grand Theater acoustic with spruce top and ES2 pickup",
                "description": `Taylor has added a fresh look and sound to the compact GT (Grand Theater) in the form of a this AD11e Grand Theater spruce edition featuring solid American walnut back and sides. Inside, C-Class bracing dials up more power in the bass range, producing a surprisingly rich low end for a smaller guitar. The player-friendly body of the AD11e Grand Theater includes chamfered edges, while the comfortable 24-1/8" scale length creates a relaxed handfeel that makes fretting chords and bending notes easy. Other notable features include comfortable chamfered body edges, a contrasting maple/black rosette, Italian acrylic dot fretboard inlays, a thin matte-finish body with a black top, a black pickguard and Taylor Mini nickel tuners. The AD11e Grand Theater also features onboard ES2 electronics and ships with Taylor's popular AeroCase for sturdy protection at an exceptionally lightweight.`,
                "stock": 250,
                "brand": "Taylor",
                "specifications": {
                    "Body": ["Body type: Non-Cutaway", "Top wood: Spruce", "Back & sides: Walnut", "Bracing pattern: C-Class"],
                    "Neck": ["Neck shape: GT Carve", "Nut width: 1-23/32” (43.6 mm)", "Fingerboard: Smoked eucalyptus", "Neck wood: Mahogany", 'Scale length: 24.125"', "Number of frets: 20", "Neck finish: Matte", "Bridge: Smoked eucalyptus", "Saddle & nut: Mircata/TUSQ"],
                    "Electronics": ["Pickup/preamp: Behind-the-saddle transducer with Adjustable Sensors"],
                    "Other": ["Tuning machines: Taylor Mini tuners", "Orientation: Right-handed", "Number of strings: 6 String", "Case: AeroCase", "Country of origin: United States"]
                },
                "features": ["Spruce top and walnut body", "Mahogany neck", "Smoked eucalyptus fingerboard and bridge", "Expression System 2 Professional Audio-Grade pickup"],
                "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/L92120000001000-01-720x720.jpg",
                "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/L92120000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-04-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-05-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-07-720x720.jpg"],
                "categoryID": 27,
            },
            {
                "productID": 1,
                "productName": "Taylor AD11e Grand Theater Acoustic Guitar Black",
                "price": 1799.00,
                "quantity": 1,
                "slogan": "Grand Theater acoustic with spruce top and ES2 pickup",
                "description": `Taylor has added a fresh look and sound to the compact GT (Grand Theater) in the form of a this AD11e Grand Theater spruce edition featuring solid American walnut back and sides. Inside, C-Class bracing dials up more power in the bass range, producing a surprisingly rich low end for a smaller guitar. The player-friendly body of the AD11e Grand Theater includes chamfered edges, while the comfortable 24-1/8" scale length creates a relaxed handfeel that makes fretting chords and bending notes easy. Other notable features include comfortable chamfered body edges, a contrasting maple/black rosette, Italian acrylic dot fretboard inlays, a thin matte-finish body with a black top, a black pickguard and Taylor Mini nickel tuners. The AD11e Grand Theater also features onboard ES2 electronics and ships with Taylor's popular AeroCase for sturdy protection at an exceptionally lightweight.`,
                "stock": 250,
                "brand": "Taylor",
                "specifications": {
                    "Body": ["Body type: Non-Cutaway", "Top wood: Spruce", "Back & sides: Walnut", "Bracing pattern: C-Class"],
                    "Neck": ["Neck shape: GT Carve", "Nut width: 1-23/32” (43.6 mm)", "Fingerboard: Smoked eucalyptus", "Neck wood: Mahogany", 'Scale length: 24.125"', "Number of frets: 20", "Neck finish: Matte", "Bridge: Smoked eucalyptus", "Saddle & nut: Mircata/TUSQ"],
                    "Electronics": ["Pickup/preamp: Behind-the-saddle transducer with Adjustable Sensors"],
                    "Other": ["Tuning machines: Taylor Mini tuners", "Orientation: Right-handed", "Number of strings: 6 String", "Case: AeroCase", "Country of origin: United States"]
                },
                "features": ["Spruce top and walnut body", "Mahogany neck", "Smoked eucalyptus fingerboard and bridge", "Expression System 2 Professional Audio-Grade pickup"],
                "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/L92120000001000-01-720x720.jpg",
                "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/L92120000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-04-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-05-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-07-720x720.jpg"],
                "categoryID": 27,
            }
        ]
    }
     // for designing purposes
  const initialUser = {
    "user": [
      {
        "Address": "742 Evergreen Terrace",
        "Country": "Israel",
        "City": "Haifa",
        "State": "Haifa",
        "Zip": 33000,
        "Email": "sample@gmail.com",
        "Password": "happyTunes48"
      }
    ]
  };

  const filteredUserDetailsForCart = initialUser.user.map( user => {
    const {Email, Password, ...shippingData} = user;
    return {...shippingData}
  });  
    

    const [cartItems, setCartItems] = useState(cart.product);

    const handleInputChange = (event, index) => {
        const newValue = parseInt(event.target.value);
        updateQuantity(index, newValue >= 1 ? newValue : 1);
    };

    const handleDecreaseClick = (index) => {
        const updatedValue = cartItems[index].quantity > 1 ? cartItems[index].quantity - 1 : 1;
        updateQuantity(index, updatedValue);
    };

    const handleIncreaseClick = (index) => {
        const updatedValue = cartItems[index].quantity < cartItems[index].stock ? cartItems[index].quantity + 1 : cartItems[index].quantity;
        updateQuantity(index, updatedValue);
    };

    const updateQuantity = (index, value) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = value;
        setCartItems(updatedCartItems);
    };

    return (
        <div className="d-flex flex-column flex-lg-row">
            <div className="flex-grow-1">
                <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8} className="min-vh-100 table-responsive mx-auto mt-2">
                <h2 className="text-center bg-secondary rounded text-white p-1 mt-3">Your Cart:</h2>
                    <Table striped borderless variant="light">
                        <tbody>
                            {cartItems.length > 0 ? (
                                cartItems.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Image src={product.mainImageURL} fluid rounded style={{ maxHeight: "10vh", maxWidth: "fit-content" }} />
                                        </td>
                                        <td>{product.productName}</td>
                                        <td>
                                            <div className="d-flex flex-column align-items-center align-items-md-start">
                                                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                                    <BsDashCircle
                                                        style={{ cursor: "pointer", color: "blue", margin: "0.2em" }}
                                                        onClick={() => handleDecreaseClick(index)}
                                                    />

                                                    <InputGroup className="w-50">
                                                        <Form.Control
                                                            className="rounded-bottom rounded-top text-center"                                                            
                                                            onClick={(e) => e.preventDefault()}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                            value={product.quantity}
                                                            isInvalid={product.quantity < 1 || product.quantity > product.stock}
                                                            min="1"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {`Maximum Available Quantity: ${product.stock}`}
                                                        </Form.Control.Feedback>
                                                    </InputGroup>

                                                    <BsPlusCircle
                                                        style={{ cursor: "pointer", color: "blue", margin: "0.2em" }}
                                                        onClick={() => handleIncreaseClick(index)}
                                                    />
                                                </div>
                                                <h6 className="mt-2 mt-md-0 align-self-center">${(product.price * product.quantity).toFixed(2)}</h6>
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                    <h1>Your Cart Is Empty! :(</h1>
                                )}
                        </tbody>
                    </Table>
                </Col>
            </div>

            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={5}>
                <div className="mx-1 mx-md-4">
                    <FormShippingData details={filteredUserDetailsForCart} />
                    <div className="mx-1 mx-md-4 mt-4 border rounded text-center">
                        <h2>Order Summary</h2>
                        <h3>Total: ${cartItems.length > 0 && cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</h3>
                        <Button variant="danger" className="my-2" onClick={handleClick}>Checkout</Button>
                    </div>
                </div>
            </Col>
            { cartItems.length > 0 && (
                <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} image={cart.product[0].mainImageURL} cartQuantity={cart.product.length} />                
            )                
            }
        </div>

    )
}
export default Cart;