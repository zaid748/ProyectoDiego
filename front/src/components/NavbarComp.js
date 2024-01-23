import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {BrowserRouter as  Route, Link, Outlet} from "react-router-dom";


const NavbarComp = ()=> {
    
    return (
        <div>
            <Navbar bg="#ffffff" expand="lg" className="App-menu">
                <Container className="App-menu">
                    <Navbar.Brand className="App-swarm" as={Link} to="/Log">
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='menuRight'>
                    {/* <Nav className="menuRight">
                        <Nav.Link className='textMenu' id='About' as={Link} to="/About">About</Nav.Link>
                        <Nav.Link className='textMenu selected' id='Login' as={Link} to="/Log">Log In</Nav.Link>
                    </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </div>        
    );
}

export default NavbarComp;