import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const HomeModal = ({ onHide, show, subcategories, category }) => { 
    const navigate = useNavigate();

    const handleClick = (categoryID) => { 
        const subcatSelected = subcategories.filter(category => category.categoryID === categoryID)             
        navigate(`/categories/${category}/${subcatSelected[0] ? subcatSelected[0].categoryName : "All"}`)
    }
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
                    src='/images/mmLogoBL.png'
                    alt="Music Makers Logo"
                    className="logo-modal float-start me-2 img-fluid"
                />
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4">
                        {subcategories && subcategories.map((subcategory, index) => (
                            <div key={index} className="col">
                                <div className="card" onClick={() => handleClick(subcategory.categoryID)}>
                                    <img
                                        src={`/images/categories/${subcategory.categoryName}.png`}
                                        className="card-img-top img-fluid object-fit-contain"
                                        alt={subcategory.categoryName}
                                    />
                                    <h5 className="card-title text-center">{subcategory.categoryName}</h5>
                                </div>
                            </div>
                        ))
                        }
                        <div className="card" onClick={() => handleClick("All")}>
                        <h5 className="card-title text-center">Show All</h5>
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