import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Responsibility", path: "/responsibility" },
  { label: "Products", path: "/products" },
  { label: "Wholesome Curing", path: "/responsibility/uplifting-ecosystem" },
  { label: "Worldwide", path: "/worldwide" },
  { label: "Contact Us", path: "/contact" },
];

const socialLinks = [
  { icon: <FaFacebookF />, label: "Facebook", url: "https://www.facebook.com/rraynex" },
  { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com/rraynex" },
  { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com/rraynex" },
  { icon: <FaLinkedinIn />, label: "LinkedIn", url: "https://www.linkedin.com/company/rraynex" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social" aria-label="Follow us on social media">
        {socialLinks.map(({ icon, label, url }) => (
          <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}>
            {icon}
          </a>
        ))}
      </div>

      <nav className="footer-links" aria-label="Footer navigation">
        {companyLinks.map(({ label, path }, index) => (
          <React.Fragment key={label}>
            <Link to={path}>{label}</Link>
            {index < companyLinks.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </nav>

      <p className="footer-copy">
        Copyright ©{new Date().getFullYear()} Rraynex Pharmaceuticals Private Limited. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
