import React from 'react';
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer  mt-auto py-3 bg-dark text-light">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <br />
            <h5>About RideShare</h5>
            <p>RideShare is a leading carpooling service that connects drivers and passengers who share similar routes.</p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <br />
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="/home" className="nav-link text-white mr-2">Home</Link></li>
              <li><Link href="/home" className="nav-link text-white mr-2">About</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-3">
            <br />
            <h5>Follow Us</h5>
            <Link to="https://facebook.com" className="nav-link text-white mr-2"><i className="fab fa-facebook"></i> Facebook</Link><br />
            <Link href="https://twitter.com" className="nav-link text-white mr-2"><i className="fab fa-twitter"></i> Twitter</Link><br />
            <Link href="https://instagram.com" className="nav-link text-white mr-2"><i className="fab fa-instagram"></i> Instagram</Link><br />
            <Link href="https://linkedin.com" className="nav-link text-white mr-2"><i className="fab fa-linkedin"></i> LinkedIn</Link>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center mt-3">
            <span className="text-muted">RideShare &copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
