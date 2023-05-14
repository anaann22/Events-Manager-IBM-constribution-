import React from 'react';
import '../../Style/Footer.css';
import insta from '../../Images/instagram.png'
import link from '../../Images/linkedin.png'
import fb from '../../Images/facebook.png'

const Footer = () => {
  return (
      <div className="container">
        <ul className="footer-links">
          <a>Contact: </a>
          <a>Felea Irina </a>
          <a>Berindeie Adrian </a>
          <a>Burlacu Ana </a>
          <a>Cojocari Alexandra </a>
        </ul>
      </div>
  );
};

export default Footer;
