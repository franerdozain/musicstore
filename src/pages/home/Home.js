import { useEffect, useState } from "react";
import HomeModal from "./HomeModal";
import { Container } from "react-bootstrap";
import { getCategories } from "../../services/api";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const [subcategories, setSubcategories] = useState(null);

  const [categories, setCategories] = useState();
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories(); 
        setCategories(data);             
      } catch (error) {
        console.log("Error: ", error);
      }      
    }
    fetchData()
    console.log("First connection between frontend and server :D ", categories);
  })
  




    // categories & subCategories array for design 
     const testingData = {
      "categories": [
        {
          "categoryID": 0,
          "categoryName": "Woodwinds",
          "parentID": null
        },
        {
          "categoryID": 1,
          "categoryName": "Saxophones",
          "parentID": 0
        },
        {
          "categoryID": 2,
          "categoryName": "Clarinets",
          "parentID": 0
        },
        {
          "categoryID": 3,
          "categoryName": "Flutes & Piccolos",
          "parentID": 0
        },
        {
          "categoryID": 4,
          "categoryName": "Brass",
          "parentID": null
        },
        {
          "categoryID": 5,
          "categoryName": "trumpets",
          "parentID": 4
        },
        {
          "categoryID": 6,
          "categoryName": "altoAndTenorHorns",
          "parentID": 4
        },
        {
          "categoryID": 7,
          "categoryName": "baritoneHorns",
          "parentID": 4
        },
        {
          "categoryID": 8,
          "categoryName": "frenchHorns",
          "parentID": 4
        },
        {
          "categoryID": 9,
          "categoryName": "flugelhorns",
          "parentID": 4
        },
        {
          "categoryID": 10,
          "categoryName": "euphoniums",
          "parentID": 4
        },
        {
          "categoryID": 11,
          "categoryName": "tubas",
          "parentID": 4
        },
        {
          "categoryID": 12,
          "categoryName": "cornets",
          "parentID": 4
        },
        {
          "categoryID": 13,
          "categoryName": "trombones",
          "parentID": 4
        },
        {
          "categoryID": 14,
          "categoryName": "Keyboards",
          "parentID": null
        },
        {
          "categoryID": 15,
          "categoryName": "digitalPianos",
          "parentID": 14
        },
        {
          "categoryID": 16,
          "categoryName": "synthesizers",
          "parentID": 14
        },
        {
          "categoryID": 17,
          "categoryName": "Drums & Percussion",
          "parentID": null
        },
        {
          "categoryID": 18,
          "categoryName": "acousticDrums",
          "parentID": 17
        },
        {
          "categoryID": 19,
          "categoryName": "electronicDrums",
          "parentID": 17
        },
        {
          "categoryID": 20,
          "categoryName": "worldPercussion",
          "parentID": 17
        },
        {
          "categoryID": 21,
          "categoryName": "tambourines",
          "parentID": 17
        },
        {
          "categoryID": 22,
          "categoryName": "cowbells",
          "parentID": 17
        },
        {
          "categoryID": 23,
          "categoryName": "handDrums",
          "parentID": 17
        },
        {
          "categoryID": 24,
          "categoryName": "jamBlocks",
          "parentID": 17
        },
        {
          "categoryID": 25,
          "categoryName": "handPercussion",
          "parentID": 17
        },
        {
          "categoryID": 26,
          "categoryName": "Guitars",
          "parentID": null
        },
        {
          "categoryID": 27,
          "categoryName": "acousticGuitars",
          "parentID": 26
        },
        {
          "categoryID": 28,
          "categoryName": "electricGuitars",
          "parentID": 26
        },
        {
          "categoryID": 29,
          "categoryName": "Basses",
          "parentID": null
        },
        {
          "categoryID": 30,
          "categoryName": "acousticBasses",
          "parentID": 29
        },
        {
          "categoryID": 31,
          "categoryName": "electricBasses",
          "parentID": 29
        },
        {
          "categoryID": 32,
          "categoryName": "Orchestra Strings",
          "parentID": null
        },
        {
          "categoryID": 33,
          "categoryName": "violins",
          "parentID": 32
        },
        {
          "categoryID": 34,
          "categoryName": "doubleBasses",
          "parentID": 32
        },
        {
          "categoryID": 35,
          "categoryName": "violas",
          "parentID": 32
        },
        {
          "categoryID": 36,
          "categoryName": "cellos",
          "parentID": 32
        },
        {
          "categoryID": 37,
          "categoryName": "Microphones",
          "parentID": null
        },
        {
          "categoryID": 38,
          "categoryName": "Accessories",
          "parentID": null
        },
        {
          "categoryID": 39,
          "categoryName": "woodwindsAccessories",
          "parentID": 38
        },
        {
          "categoryID": 40,
          "categoryName": "brassAccessories",
          "parentID": 38
        },
        {
          "categoryID": 41,
          "categoryName": "keyboardsAccessories",
          "parentID": 38
        },
        {
          "categoryID": 42,
          "categoryName": "drumsAndPercussionAccessories",
          "parentID": 38
        },
        {
          "categoryID": 43,
          "categoryName": "guitarsAccessories",
          "parentID": 38
        },
        {
          "categoryID": 44,
          "categoryName": "bassesAccessories",
          "parentID": 38
        },
        {
          "categoryID": 45,
          "categoryName": "orchestraStringsAccessories",
          "parentID": 38
        },
        {
          "categoryID": 46,
          "categoryName": "microphonesAccessories",
          "parentID": 38
        }
      ]
    }
    
   
    const handleClick = (category) => {
      setModalShow(true)
       // for testing design of home
      const subcategories = testingData.categories.filter(subcategory => category.categoryID === subcategory.parentID)
      setCategorySelected(category.categoryName)
      setSubcategories(subcategories.length ? subcategories : [category])
    }

    // for testing design of home
    const categoriesWithNullParent = testingData.categories.filter((category) => category.parentID === null);

    
  return (
    <Container className="min-vh-100">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4 mb-4">
        {categoriesWithNullParent.map((category, index) => (
          <div key={index} className="col">
            <div className="card" onClick={() => handleClick(category)}>
              <img
                src={`/images/categories/${category.categoryName}.png`}
                className="card-img-top img-fluid object-fit-contain"
                alt={category}
              />
              <h5 className="card-title text-center">{category.categoryName}</h5>
            </div>
          </div>
        ))}
      </div>
      <HomeModal show={modalShow} category={categorySelected} subcategories={subcategories} onHide={() => setModalShow(false)} />
    </Container>
  )
}
export default Home;