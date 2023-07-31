const Home = () => {
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
    return(
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4">
        {categories.map((category, index) => (
          <div key={index} className="col">
            <div className="card">
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
    </div>
)
}
export default Home;