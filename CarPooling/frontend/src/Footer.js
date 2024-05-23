import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">RideShare &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
