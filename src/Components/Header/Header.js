import React, { useContext } from 'react';
import { Form, Nav, Navbar, Button, FormControl, NavDropdown } from 'react-bootstrap';
import './Header.css';
import { Link, useHistory } from "react-router-dom"
import { UseContext } from '../../App';
import Data from '../../FackeData.json';

const riderName = Data.map(data => data.name);

const Header = () => {

    const [logInUser, setLogInUser] = useContext(UseContext);

    let history = useHistory();
    function handleClick() {
        history.push("/register");
    }

    const style = {
        fontSize: " 21px",
        color: "tomato ",
        marginTop: " 9px",
        fontWeight: 700,
        backgroundColor: "#12fa4f",
        borderRadius: "3px",
        padding: "5px"
    }

    return (
        <div className="bg-light">
            <div className="container">
                <Navbar collapseOnSelect expand="lg   " >
                    <Navbar.Brand className="dream-riders" href="#home">BD Riders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto nav-list">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/register">Destination</Nav.Link>
                            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

                            {
                                logInUser.name ? <h3 style={style}>{logInUser.name}</h3> : <button onClick={handleClick} className="btn btn-danger ms-auto">LogIn</button>
                            }

                        </Nav>
                        <Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        </div>
    );
};

export default Header;


