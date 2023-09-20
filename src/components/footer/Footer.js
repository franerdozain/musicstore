import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-2 mt-auto" id="mmFooter">
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <span>
                            <strong>Melody Makers</strong> -{" "}
                            <em>Giving the Instruments to Unleash Your Musical Potential since 2023</em>
                        </span>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center align-items-center">
                        <Button variant="primary" className="me-2">
                            Contact Us
                        </Button>
                        <Button variant="primary">About Us</Button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={12} md={6}>
                        <Nav className="flex-row d-flex">
                            <Nav.Link href="https://facebook.com" target="_blank" className="FaFacebookF">
                                <FaFacebookF size={20} />
                            </Nav.Link>
                            <Nav.Link href="https://youtube.com" target="_blank" className="FaYoutube">
                                <FaYoutube size={25} />
                            </Nav.Link>
                            <Nav.Link href="https://instagram.com" target="_blank" className="FaInstagram">
                                <img src='/logoInstagram.png' className="logoInstagram" alt="Instagram Logo" />
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center mt-md-0 mt-2">
                        <span>©2023 Melody Makers. All rights reserved - Terms of Service</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
export default Footer;