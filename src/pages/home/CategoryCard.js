const CategoryCard = ({ category, onClick }) => {


    return (
        <div className="text-center m-2 p-2 card d-flex flex-column h-100" >
            <img
                src={category.imageURL}
                className="card-img-top img-fluid object-fit-contain cursor-pointer"
                alt={`${category.categoryName} image`}
                onClick={onClick}
            />
            <h5
                className="card-title text-center"
                onClick={onClick} >
                {category.categoryName}
            </h5>
        </div>
    )
}

export default CategoryCard;