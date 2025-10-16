import { Building2, Mail, Phone, MapPin, Linkedin, Facebook, Twitter,Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logot from '../Header/logot.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <img src={logot} alt="Rraynex Logo" />
            </div>
            <p className="footer-desc">
              Delivering quality healthcare across 58+ countries with excellence in pharmaceutical manufacturing and innovation.
            </p>
            <div className="footer-socials">
              <a href="https://in.linkedin.com/company/rraynex-pharmaceuticals-pvt-ltd" className="social-link"><Linkedin className="social-icon" /></a>
              <a href="https://x.com/rraynex" className="social-link"><Twitter className="social-icon" /></a>
              <a href="https://www.instagram.com/rraynex_pharmaceuticals/" className="social-link"><Instagram className="social-icon" /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-list">
              <li><Link to="/products/categories/pellets" className="footer-link">Pharmaceutical Pellets</Link></li>
              <li><Link to="/products/categories/granules" className="footer-link">Pharmaceutical Granules</Link></li>
              <li><Link to="/products/categories/apis-intermediaries" className="footer-link">APIs & Intermediaries</Link></li>
              <li><Link to="/products/categories/rraynex-luxe" className="footer-link">Rraynex LUXE</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-list">
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/manufacturing" className="footer-link">Our Facilities</a></li>
              <li><a href="/about/quality" className="footer-link">Quality & Compliance</a></li>
              <li><a href="/careers" className="footer-link">Careers</a></li>
              <li><a href="/news" className="footer-link">News & Updates</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li className="contact-item">
                <MapPin className="contact-icon" />
                <span>
                  J 94 Tarapur M. I. D. C.,<br /> Boisar - 401506, Maharashtra, India
                </span>
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" />
                <a href="tel:+918697970460" className="footer-link">+91-86979-70460</a>
              </li>
              <li className="contact-item">
                <Mail className="contact-icon" />
                <a href="mailto:communications@rraynex.com" className="footer-link">communications@rraynex.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rraynex Pharmaceuticals Private Limited. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
