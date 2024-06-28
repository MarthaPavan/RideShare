import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './routes/AuthContext';
import './App.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { token} = useAuth();

  return (
    <header className="text-bg-dark">
      <div className="container-fluid mb-container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" style={{ height: '65px', width: '65px' }} />
            </Link>
            <ul className="nav col-lg-auto justify-content-start">
              <li>
                <Link to="/" className="nav-link text-white fs-5 mr-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" className="nav-link text-white fs-5 mr-2">
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!token && (
            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => navigate('/Login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => navigate('/GetStarted')}
              >
                Sign-up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
