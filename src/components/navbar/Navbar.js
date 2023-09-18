import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaUser } from 'react-icons/fa6';
import { GiShoppingCart } from "react-icons/gi";
import { FaDoorOpen, FaDoorClosed, FaIdCardAlt } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { MdOutlineAppRegistration } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import IconButton from '../generalComponents/IconButton';
import AuthModal from './AuthModal';
import { checkUserStatus, logoutUser } from '../../services/api';

const MmNavbar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const { userStatus, setUserStatus } = useAuth();
        
    const handleProfileClick = () => {
        navigate(`profile`)
    };

    const handleLogoutClick = async () => {
        await logoutUser();
        const response = await checkUserStatus();
        setUserStatus({
            isAuthenticated: response.isAuthenticated,
            user: response.user
          });
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

    const handleLoggedIn = async () => {
        const response = await checkUserStatus();
        setUserStatus({
            isAuthenticated: response.isAuthenticated,
            user: response.user
          });
    }

    return (
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-top" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand className='me-0'>
                        Melody Makers
                        <Link to={"/"}>
                            <img
                                src='/mmLogoWhSm.png'
                                className="mmLogo d-inline-block align-top"
                                alt="Melody Makers Logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <SearchBar />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="d-flex flex-row justify-content-end align-items-center" >
                            <IconButton icon={FaHeart} destination="/wishlist" className="FaHeart ms-2" />
                            <IconButton icon={GiShoppingCart} destination="/cart" className="GiShoppingCart ms-3" />
                            <Dropdown className='ms-3 mb-1'>
                                <Dropdown.Toggle variant="dark" id="dropdownMenuButton" className="userDropdownToggle">
                                    <FaUser className='FaUser' size={25} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="custom-dropdown-menu bg-dark">
                                    { userStatus.isAuthenticated ? (
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