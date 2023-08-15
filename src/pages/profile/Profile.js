import { Col, Table, Row, Container } from "react-bootstrap";
import FormShippingData from "../../components/generalComponents/FormShippingData";

const Profile = () => {
  // for designing purposes
  const initialUser = {
    "user": [
      {
        "Email": "sample@gmail.com",
        "Address": "742 Evergreen Terrace",
        "Country": "Israel",
        "City": "Haifa",
        "State": "Haifa",
        "Zip": 33000,
        "Password": "happyTunes48"
      }
    ]
  };
  const shoppingHistory = {
    "orders": [
      {
        "Date": "23.06.2023",
        "Order ID": 59,
        "Products": [
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
              "Body": ["Body type: Dreadnought", "Cutaway: Single", "Top wood: Solid thermal spruce top", "Back and sides: Solid Indian rosewood", "Bracing pattern: Not specified", "Body finish: Gloss Natural", "Orientation: Right handed"],
              "Neck": ["Neck shape: Not specified", "Nut width: 1.675 in. (42.5 mm)", "Fingerboard: Ebony", "Neck wood: Mahogany", "Scale length: 24.9 in.", "Number of frets: 20", "Neck finish: Open pore"],
              "Electronics": ["Pickup/preamp: Yes", "Brand: Takamine", "Configuration: Undersaddle piezo", "Preamp EQ: 3-band", "Feedback filter: No", "Tuner: Yes"],
              "Other": ["Headstock overlay: Rosewood", "Tuning machines: Gotoh", "Bridge: Rosewood", "Saddle and nut: Bone", "Number of strings: 6", "Special features: None", "Case: Hardshell case", "Accessories: None", "Country of origin: Japan"]
            },
            "features": "",
            "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/K46236000001000-00-720x720.jpg",
            "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/K46236000001000-01-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/K46236000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/K46236000001000-03-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/K46236000001000-04-720x720.jpg"],
            "categoryID": 27,
          },
          {
            "productID": 1,
            "productName": "Taylor AD11e Grand Theater Acoustic Guitar Black",
            "price": 1799.00,
            "quantity": 2,
            "slogan": "Grand Theater acoustic with spruce top and ES2 pickup",
            "description": `Taylor has added a fresh look and sound to the compact GT (Grand Theater) in the form of a this AD11e Grand Theater spruce edition featuring solid American walnut back and sides. Inside, C-Class bracing dials up more power in the bass range, producing a surprisingly rich low end for a smaller guitar. The player-friendly body of the AD11e Grand Theater includes chamfered edges, while the comfortable 24-1/8" scale length creates a relaxed handfeel that makes fretting chords and bending notes easy. Other notable features include comfortable chamfered body edges, a contrasting maple/black rosette, Italian acrylic dot fretboard inlays, a thin matte-finish body with a black top, a black pickguard and Taylor Mini nickel tuners. The AD11e Grand Theater also features onboard ES2 electronics and ships with Taylor's popular AeroCase for sturdy protection at an exceptionally lightweight.`,
            "stock": 250,
            "brand": "Taylor",
            "specificications": {
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
            "productID": 2,
            "productName": "Martin Special X Style 000 Cutaway Acoustic-Electric Guitar Black",
            "price": 589.99,
            "quantity": 4,
            "slogan": "Environmentally friendly in a comfortable body design",
            "description": `Part of Martin's X Series, this Special X Style 000 cutaway acoustic-electric guitar combines world-famous Martin sound with the contemporary playability of an electric guitar. The body is constructed with Martin's forest-friendly Jett Black HPL to give you an attractive visual look. This guitar was crafted to be a "player's dream."
    
                The Special X Style 000 cutaway acoustic-electric guitar features a very playable laminate birch neck with a High Performance Neck shape. This precision-cut neck has fast FSC Certified Richlite fingerboard, and a 1-3/4" nut width, to give you a comfortable spacing between the strings. 
                
                Looking for electronics? This Special X Style 000 cutaway guitar comes complete with an onboard Fishman MX preamp. This soundhole-mounted-preamp features easy-to-use rotary controls for Volume and Tone. The controls are mounted conveniently under the soundhole for easy access while you are performing. All you need to do is plug in and play. You'll have a studio-quality sound right out of the box.
                
                This guitar is everything yo've come to expect from Martin, at a price that just about anyone can afford. Pick one up. You'll love the sound and playability of this fine instrument.
                
                This Special X Style 000 cutaway acoustic-electric comes with a soft gig bag`,
            "stock": 100,
            "brand": "Martin",
            "specifications": {
              "Body": ["Body type: 000/Auditorium", "Cutaway: Single cutaway", "Top wood: Jett Black HPL", "Back & sides: Jett Black HPL", "Bracing pattern: Scalloped X", "Body finish: Hand-rubbed Satin", "Orientation: Right handed"],
              "Neck": ["Neck shape: Performing Artist taper", "Nut width: 1-3/4” (43.6 mm)", "Fingerboard: FSC Certified Richlite", "Neck wood: Birch Laminate", "Scale length: 25.4\"", "Number of frets: 20", "Neck finish: Hand-rubbed Satin"],
              "Electronics": ["Pickup/preamp: Yes", "Brand: Fishman MX", "Configuration: Soundhole mounted preamp", "Preamp EQ: Not applicable", "Feedback filter: Not applicable", "Tuner: Not applicable"],
              "Other": ["Headstock overlay: Jett Black HPL", "Tuning machines: Chrome", "Bridge: FSC Certified Richlite", "Saddle & nut: Black Corian, Compensated black tusq", "Number of strings: 6-string", "Special features: Tonewoods", "Case: Sold separately", "Accessories: None", "Country of origin: Mexico"]
            }
          }]
      },
      {
        "Date": "14.02.2023",
        "Order ID": 14,
        "Quantity": 2,
        "Products": [
          {
            "productID": 3,
            "productName": "Kremona Kremona M15 OM-Style Acoustic Guitar Natural",
            "price": 799.00,
            "quantity": 5,
            "slogan": "",
            "description": `The orchestral-bodied guitar was first introduced in 1929 with its hallmark 14-fret-to-mahogany-body construction. With proud roots in the storied Markneukirchen lutherie tradition, Kremona brings this dovetail classic into their current mix.  
  
              The meticulously select mahogany, neatly-grained solid spruce and European expertise ensure crispness in response, singing midrange and focused musicality.  Understated herringbone appointments and brushed nickel machines are the perfect compliment. An impact resistant polyfoam case comes standard.`,
            "stock": 25,
            "brand": "Kremona",
            "specifications": [
              "Solid European spruce top",
              "African mahogany back & sides",
              "Matte finish",
              "African mahogany neck",
              "Indian rosewood fingerboard & bridge",
              "Nut width: 1.8\" (45mm)",
              "Scale length: 25.38\" (644.5mm)",
              "Wood binding",
              "Vintage-style brushed nickel machines",
              "Dual action truss rod",
              "Clear teardrop pickguard",
              "Front and rear strap pins",
              "D'addario EXP strings",
              "Lightweight impact-resistant polyfoam case"
            ],
            "features": "",
            "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/L63876000001000-00-720x720.jpg",
            "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/L63876000001000-01-720x720.jpg"],
            "categoryID": 27
          }]
      }
    ]
  }

  return (
    <div className="min-vh-100">
      <Container fluid>
        <Row>
          <Col xs={12} md={6}>
            <div className="mx-1 mx-md-4">
              <FormShippingData details={initialUser.user} />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="mt-4 border rounded me-4">
              <h2 className="text-center bg-secondary text-white p-1 mb-0 rounded-top">Shopping History</h2>
              {shoppingHistory && (
                <div className="table-responsive">
                  <Table striped borderless variant="light mb-0">
                    <thead>
                      <tr>
                        <th rowSpan="3" className="bg-primary text-white">Date</th>
                        <th rowSpan="3" className="bg-primary text-white">Order ID</th>
                        <th rowSpan="3" className="bg-primary text-white">Product</th>
                        <th rowSpan="3" className="bg-primary text-white">Quantity</th>
                        <th rowSpan="3" className="bg-primary text-white">Price</th>
                        <th rowSpan="3" className="bg-primary text-white">Total Price</th>
                        <th colSpan="2" className="bg-primary text-white">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shoppingHistory.orders.map((order, orderIndex) => {
                        const totalOrderPrice = order.Products.reduce(
                          (total, product) => total + product.price * product.quantity,
                          0
                        );
                        return order.Products.map((product, productIndex) => (
                          <tr key={`${orderIndex}-${productIndex}`}>
                            {productIndex === 0 && (
                              <>
                                <td rowSpan={order.Products.length}>{order.Date}</td>
                                <td rowSpan={order.Products.length}>{order["Order ID"]}</td>
                              </>
                            )}
                            <td>{product.productName}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>${(product.price * product.quantity).toFixed(2)}</td>
                            {productIndex === 0 && (
                              <>
                                <td rowSpan={order.Products.length}>${totalOrderPrice.toFixed(2)}</td>
                                <td rowSpan={order.Products.length}></td>
                              </>
                            )}
                          </tr>
                        ));
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Profile;