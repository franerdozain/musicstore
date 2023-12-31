import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import CategoryCard from './CategoryCard';

const HomeModal = ({ onHide, show, subcategories, category, images }) => {
    const navigate = useNavigate();

    const handleClick = (subcategory) => {
        subcategory === "All" ?
            navigate(`/categories/${category}/all/${subcategories[0].idCategoryParent}`) :
            navigate(`/categories/${category}/${subcategory.categoryName}/${subcategory.idCategory}`);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <img
                    src='/mmLogoBL.png'
                    alt="Music Makers Logo"
                    className="logo-modal float-start me-2 img-fluid"
                />
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4">
                        {subcategories && subcategories.map((subcategory, index) => (
                            <div key={index} className="col">
                                <CategoryCard category={subcategory} onClick={() => handleClick(subcategory)} images={images} />
                            </div>
                        ))}
                        <div className="col">                            
                            <CategoryCard category={{categoryName: "Show All"}} onClick={() => handleClick("All")} images={images} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HomeModal;
