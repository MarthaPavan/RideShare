import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from './routes/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar" style={{margin:0,padding:0}}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src="/images/logo.svg" alt="logo" style={{ height: '65px', width: '65px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fs-5 custom-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/About" className="fs-5 custom-nav-link">
              About
            </Nav.Link>
          </Nav>
          {!token && (
            <div className="d-flex">
              <Button
                variant="outline-light"
                className="me-2"
                onClick={() => navigate('/Login')}
              >
                Login
              </Button>
              <Button
                variant="warning"
                onClick={() => navigate('/GetStarted')}
              >
                Sign-up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
