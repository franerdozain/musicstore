import { useState } from "react";
import { Col, Image } from "react-bootstrap";
import { FaCircleMinus } from "react-icons/fa6";

const Wishlist = () => {
    
    const wishlist = {
        "wishlist": [
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
            },
            {
                "productID": 1,
                "productName": "Taylor AD11e Grand Theater Acoustic Guitar Black",
                "price": 1799.00,
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
                // "mainImageURL": "https://media.musicarts.com/is/image/MMGS7/L92120000001000-01-720x720.jpg",
                "galleryImagesURL": ["https://media.musicarts.com/is/image/MMGS7/L92120000001000-02-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-04-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-05-720x720.jpg", "https://media.musicarts.com/is/image/MMGS7/L92120000001000-07-720x720.jpg"],
                "categoryID": 27,
            }, 
            {
                "productID": 2,
                "productName": "Martin Special X Style 000 Cutaway Acoustic-Electric Guitar Black",
                "price": 589.99,
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
            }
        ]
      };

      const [updatedWishlist, setUpdatedWishlist] = useState(wishlist.wishlist)
      
      const handleClick = (productID) => {
        const newWishlist = updatedWishlist.filter(item => item.productID !== productID )        
        setUpdatedWishlist(newWishlist)  
      }

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} xxl={4} className="mb-3">
          <h1 className="text-center bg-secondary text-white rounded mt-3">Wishlist</h1>
        </Col>
        <div className="d-flex flex-column">
          {updatedWishlist.map((product) => (
            <div key={product.productID} className="my-3">
              <div className="d-flex align-items-center justify-content-center">
                <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
                  <Image
                    src={product.mainImageURL}
                    alt={`${product.productName} image`}
                    className="float-start img-fluid img-thumbnail"
                  />
                  </Col>
                      <Col xs={8} sm={8} md={8} lg={6} xl={4} xxl={4}>
                          <div className="flex-grow-1 ms-4">
                              <h6>{product.productName}</h6>
                              <div>$ {product.price}</div>
                          </div>
                      </Col>
                      <div>
                  <FaCircleMinus onClick={() => handleClick(product.productID)} style={{cursor:"pointer"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}
export default Wishlist;