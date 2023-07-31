import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import Button from '../generalComponents/Button';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { GiShoppingCart } from "react-icons/gi";

const MmNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className='me-0'>
                    Melody Makers
                    <Link to={"/"}>
                        <img
                            src='/images/mmLogoWhSm.png'
                            className="mmLogo d-inline-block align-top"
                            alt="Melody Makers Logo"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <SearchBar />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="d-flex flex-row justify-content-end me-2" >
                        <Button icon={FaHeart} destination="/wishlist" className="FaHeart ms-2" />
                        <Button icon={GiShoppingCart} destination="/cart" className="GiShoppingCart ms-2" />
                        <Button icon={FaUser} className="FaUser ms-2" />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MmNavbar;