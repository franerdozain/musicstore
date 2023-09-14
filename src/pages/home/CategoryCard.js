const CategoryCard = ({ category, onClick, images }) => {

const matchingImages = images.filter(image => image.idCategory === category.idCategory); 
const isSubcategory = category.idCategoryParent !== null;  

    return (
        <div className="text-center m-2 p-2 card d-flex flex-column h-100" >
            { category.categoryName !== "Show All" && (
                <img            
                    src={`http://localhost:4000/images/${isSubcategory ? 'subcategories' : 'categories'}/${matchingImages[0]?.imageURL}`}               
                    className="card-img-top img-fluid object-fit-contain category-home-card"
                    alt={`${category.categoryName}`}
                    onClick={onClick}
                />
            )
            }
            <h5
                className={`card-title text-center ${category.categoryName === "Show All" ? "my-auto" : ""} `}
                onClick={onClick} >
                {category.categoryName}
            </h5>
        </div>
    )
}

export default CategoryCard;