import { useState } from "react";
import BasicModal from "../../components/generalComponents/BasicModal";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
    // categories array for design 
    const categories= [
        "Keyboards",
        "Drums & Percussion",
        "Woodwinds",
        "Guitars",
        "Basses",
        "Microphones",
        "Brass",
        "Orquestra Strings",
        "Accessories"
    ]

    const handleClick = () => {
      setModalShow(true)
    }
    
    return(
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4">
        {categories.map((category, index) => (
          <div key={index} className="col">
            <div className="card" onClick={handleClick}>
              <img
                src={`/images/categories/${category}.png`}
                className="card-img-top img-fluid object-fit-contain"
                alt={category}
              /> 
                <h5 className="card-title text-center">{category}</h5>
            </div>
          </div>
        ))}
      </div>
      <BasicModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
)
}
export default Home;