import React from "react";
import "./innovation.css";
import { FaTablets, FaCapsules, FaSyringe, FaBalanceScale } from "react-icons/fa";
import SEO from "../../seo/SEO";
import { getPageSEO } from "../../seo/seoConfig";
import diagram from "./innovation-diagram.jpg"; // replace with your image path

export default function Innovation() {
  const seo = getPageSEO('innovation');
  
  return (
    <section className="innovation">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="innovation"
      />
      {/* Banner */}
      <div className="inno-banner">
        <div className="inno-overlay">
          <h1 className="inno-title">Innovation</h1>
          <p className="inno-subtitle">
            Breaking Barriers with Scientific Innovation — Our Commitment to
            Transformative Research & Development
          </p>
        </div>
      </div>

      {/* Diagram + Text */}
      <div className="inno-container">
        <div className="inno-grid">
          <div className="inno-diagram">
            <img src={diagram} alt="Innovation diagram" />
          </div>
          <div className="inno-text">
            <p>
              At <b>Rraynex Pharmaceuticals Private Limited</b>, we are
              committed to driving innovation in the industry through
              cutting-edge Research and Development. Our experts conduct
              extensive research on new products and employ state-of-the-art
              drug delivery platforms to ensure optimal patient outcomes.
            </p>
            <p>
              We continuously push scientific boundaries to deliver
              next-generation healthcare solutions that transform lives.
            </p>
          </div>
        </div>
      </div>

      {/* Dosage Forms */}
      <div className="inno-container">
        <h2 className="section-heading">Dosage Forms R&D</h2>
        <div className="inno-dosage">
          <div className="dosage-card">
            <FaTablets className="dosage-icon" />
            <h4>Immediate Release Tablets</h4>
            <ul>
              <li>Mouth Dissolving</li>
              <li>Uncoated</li>
              <li>Dispersible</li>
              <li>Film Coated</li>
              <li>Chewable</li>
              <li>Bi-Layered</li>
            </ul>
          </div>

          <div className="dosage-card">
            <FaCapsules className="dosage-icon" />
            <h4>Capsules</h4>
            <ul>
              <li>Hard Gelatine</li>
              <li>Powder Filled</li>
              <li>Pellets in Capsules</li>
              <li>Tablet in Capsules</li>
            </ul>
          </div>

          <div className="dosage-card">
            <FaSyringe className="dosage-icon" />
            <h4>Parenterals</h4>
            <ul>
              <li>LVP</li>
              <li>SVP</li>
              <li>PFS</li>
              <li>FFS</li>
              <li>Bags</li>
              <li>Emulsions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="inno-container ipr">
        <h2 className="section-heading">Intellectual Property R&D</h2>
        <div className="ipr-box">
          <FaBalanceScale className="ipr-icon" />
          <p>
            We acknowledge that a <b>robust patent portfolio</b> is essential to
            our success. We are committed to obtaining enforceable patent
            protection and using in-house innovations to create a comprehensive
            portfolio that strengthens our position in the global
            pharmaceutical industry.
          </p>
        </div>
      </div>
    </section>
  );
}
