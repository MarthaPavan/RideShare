import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from './routes/AuthContext';
import { toast } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className=" custom-navbar" style={{margin:0,padding:1}}>
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
          {token && (
            <div className='d-flex'>
            <button className='button-42 mb-1' onClick={()=>{
              if(localStorage.getItem('role')==='driver'){
                navigate('/EmployeeDashboard')
              }
              else if(localStorage.getItem('role')==='user'){
                navigate('/UserDashboard')
              }
              else if(localStorage.getItem('role')==='admin'){
                navigate('/AdminDashboard')
              }
              else{
                toast.error("Please login to continue");
                navigate('/Login')
              }
            }}>Go to dashboard</button>
            </div>
          //   <div className='d-flex justify-content-center mt-4'>
          //   <Button
          //     variant='warning'
          //     className='custom-button mb-2'
          //     onClick={() => {
          //       const role = localStorage.getItem('role');
          //       if (role === 'driver') {
          //         navigate('/EmployeeDashboard');
          //       } else if (role === 'user') {
          //         navigate('/UserDashboard');
          //       } else if (role === 'admin') {
          //         navigate('/AdminDashboard');
          //       } else {
          //         toast.error("Please login to continue");
          //         navigate('/Login');
          //       }
          //     }}
          //   >
          //     Go to Dashboard
          //   </Button>
          // </div>
          )}
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
