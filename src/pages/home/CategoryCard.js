const CategoryCard = ({ category, onClick }) => {

    return (
        <div className="text-center m-2 p-2 card d-flex flex-column h-100" >
            <img
                src={`/images/categories/${category}.png`}
                className="card-img-top img-fluid object-fit-contain cursor-pointer"
                alt={`${category} image`}
                onClick={onClick}
            />
            <h5
                className="card-title text-center"
                onClick={onClick} >
                {category}
            </h5>
        </div>
    )
}

export default CategoryCard;