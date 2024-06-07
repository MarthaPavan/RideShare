import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <header className="text-bg-dark">
            <div className="container-fluid mb-container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center atstart">
                        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-car-front-fill slide-in" viewBox="0 0 16 16">
                                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                            </svg>
                            <h1 className="ms-2 display-6 title">RideShare</h1>
                        </Link>

                        <ul className="nav col-lg-auto justify-content-start">
                            <li><Link to="/" className="nav-link text-white fs-5 mr-2">Home</Link></li>
                            <li><Link to="/About" className="nav-link text-white fs-5 mr-2">About</Link></li>
                        </ul>
                    </div>
                    { !JSON.parse(localStorage.getItem("status")) &&
                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2" onClick={() => navigate("/Login")}>
                            Login
                        </button>
                        <button type="button" className="btn btn-warning" onClick={() => navigate("/GetStarted")}>
                            Sign-up
                        </button>
                    </div>}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
