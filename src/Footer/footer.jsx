import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Icons */}
      <div className="footer-social">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedinIn /></a>
      </div>

      {/* Navigation Links */}
      <div className="footer-links">
        <a href="#">About Us</a>
        <span>/</span>
        <a href="#">Responsibility</a>
        <span>/</span>
        <a href="#">Products</a>
        <span>/</span>
        <a href="#">Wholesome Curing</a>
        <span>/</span>
        <a href="#">Worldwide</a>
        <span>/</span>
        <a href="#">Contact Us</a>
      </div>

      {/* Copyright */}
      <p className="footer-copy">
        Copyright ©{new Date().getFullYear()} Rraynex Pharmaceuticals Private Limited. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
