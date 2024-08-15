import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        Crafted with passion by <span className="footer-name">Madhuna</span>
      </p>
      <div className="footer-links">
        <a href="https://github.com/Madhuna-skcet" target="_blank" rel="noopener noreferrer" className="footer-link">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="footer-icon" />
        </a>
        <a href="https://linkedin.com/in/madhuna" target="_blank" rel="noopener noreferrer" className="footer-link">
          <img src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMy0xMC5wbmc.png" alt="LinkedIn" className="footer-icon" />
        </a>
        <a href="https://twitter.com/madhuna" target="_blank" rel="noopener noreferrer" className="footer-link">
          <img src="https://cdn3.iconfinder.com/data/icons/basicolor-reading-writing/24/077_twitter-512.png" alt="Twitter" className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
