import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
         <a href="/"><img src="/Img/logo.png" alt="TalentSphere Logo" /></a> 
        </div>
        <div className="footer-info">
          <h3>Contact Information</h3>
          <p>Email: info@talentsphere.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="/Img/instagram.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com/talentsphere" target="_blank" rel="noopener noreferrer">
              <img src="/Img/finaltt.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
