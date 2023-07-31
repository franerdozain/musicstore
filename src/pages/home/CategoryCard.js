const CategoryCard = ({category, index}) => {
    return (
        <div className="text-center m-2 p-2 card">
            <img src={`/images/categories/${category}.png`} className="border m-2 border-dark rounded"/>
        </div>
    )
}

export default CategoryCard;