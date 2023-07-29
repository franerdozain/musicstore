import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHeart } from 'react-icons/fa6';
import { GiShoppingCart } from "react-icons/gi";
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';


const MmNavbar = () => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate("/cart");
    }

    const handleWishlistClick = () => {
        navigate("/wishlist");
    }
    
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
            Melody Makers
        <img
              src='/images/mmLogoBL.png'              
              className="mmLogo d-inline-block align-top"
              alt="Melody Makers Logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <SearchBar />         
            <GiShoppingCart onClick={handleCartClick}/>            
            <FaHeart onClick={handleWishlistClick}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MmNavbar;