import { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { FaCircleMinus } from "react-icons/fa6";
import { deleteFromWishlist, getWishlist } from "../../services/api";
const imagePath = process.env.REACT_APP_PRODUCT_IMAGES_PATH;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist()
        if (response.wishlist) {
          setWishlist(response.wishlist)
        }
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }
    fetchWishlist();
  }, [])
    
      // const [updatedWishlist, setUpdatedWishlist] = useState(wishlist.wishlist)
      
      // const handleClick = (productID) => {
      //   const newWishlist = updatedWishlist.filter(item => item.productID !== productID )        
      //   setUpdatedWishlist(newWishlist)  
      // }

  const handleDelete = async (idProduct, idx) => {
    try {
      const response = await deleteFromWishlist(idProduct);

      if (response.deleteOk) {
        wishlist.splice(idx, 1)
        setWishlist(prev => [...wishlist])
      }
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
      

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} xxl={4} className="mb-3">
          <h1 className="text-center bg-secondary text-white rounded mt-3">Wishlist</h1>
        </Col>
        <div className="d-flex flex-column">
          {wishlist.map((product, idx) => (
            <div key={product.idProduct} className="my-3">
              <div className="d-flex align-items-center justify-content-center">
                <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
                  <Image                  
                    src={`${imagePath}/${product.imageURL}`}
                    alt={`${product.productName}`}
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
                  <FaCircleMinus onClick={() => handleDelete(product.idProduct, idx)} type="button" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}
export default Wishlist;