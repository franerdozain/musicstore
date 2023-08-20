import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../generalComponents/Button';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { GiShoppingCart } from "react-icons/gi";
import { FaDoorOpen, FaDoorClosed, FaIdCardAlt } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { MdOutlineAppRegistration } from "react-icons/md";
import { useState } from 'react';
import LoginButton from './LoginButton';
import AuthModal from './AuthModal';

const MmNavbar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [accessGranted, setAccessGranted] = useState(false);

    const handleProfileClick = () => {
        navigate("profile")
    };

    const handleLogoutClick = () => {
        setAccessGranted(false);
        navigate("");
    }

    const handleLoginClick = () => {
        setModalType("login");
        setShowModal(true);
    }

    const handleRegistrationClick = () => {
        setModalType("registration");
        setShowModal(true);
    }

    const handleLoggedIn = () => {
        setAccessGranted(true);
    }

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
                    <Nav className="d-flex flex-row justify-content-end align-items-center" >
                        <Button icon={FaHeart} destination="/wishlist" className="FaHeart ms-2" />
                        <Button icon={GiShoppingCart} destination="/cart" className="GiShoppingCart ms-3" />
                        <Dropdown className='ms-3 mb-1'>
                            <Dropdown.Toggle variant="dark" id="dropdownMenuButton" className="userDropdownToggle">
                                <FaUser className='FaUser' size={25} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu bg-dark">
                                {accessGranted ? (
                                    <>
                                        <LoginButton Icon={FaIdCardAlt} text={"Profile"} onClick={handleProfileClick} />
                                        <LoginButton Icon={FaDoorClosed} text={"Logout"} onClick={handleLogoutClick} />
                                    </>
                                ) : (
                                    <>
                                        <LoginButton Icon={FaDoorOpen} text={"Login"} onClick={handleLoginClick} />
                                        <LoginButton Icon={MdOutlineAppRegistration} text={"Registration"} onClick={handleRegistrationClick} />
                                        <AuthModal show={showModal} onHide={() => setShowModal(false)} modalType={modalType} handleLoggedIn={() => handleLoggedIn()} />
                                    </>
                                )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MmNavbar;