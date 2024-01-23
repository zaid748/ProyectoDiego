import axios from 'axios';
import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {BrowserRouter as Route, Link, Outlet } from "react-router-dom";

const NavbarAdmin = ()=> {
    const logout = async ()=>{
        await axios.get(`${process.env.REACT_APP_HOST}/User/logout`, {withCredentials: true});
        window.location.href = '/';
    }
    
    return (
        <div>
            <Navbar bg="#ffffff" expand="lg" className="App-menu">
                <Container className="App-menu">
                    <Navbar.Brand className="App-swarm" as={Link} to="/Log">
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='menuRight'>
                    <Nav className="oh-flex jusSpace">
                        <img className='imgNav' src="/img/Logo-TecNM 3.png" alt="imagen del tec" />
                        <div className='menuRight'>
                            <Nav.Link className='textMenu' as={Link} to="/Home">Empresas</Nav.Link>
                            <Nav.Link className='textMenu' as={Link} to="/Form/Agregar">Agregar empresa</Nav.Link>
                            <Nav.Link className='textMenu' as={Link} to="/Tables/Users">Usuarios</Nav.Link>
                            <Nav.Link className='textMenu' id='Login' onClick={logout}>Log out</Nav.Link>
                        </div>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </div>        
    );
}

export default NavbarAdmin;