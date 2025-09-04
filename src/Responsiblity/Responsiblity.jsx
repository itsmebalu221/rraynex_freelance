import React from "react";
import "./Responsiblity.css";
import { FaLeaf, FaHandsHelping, FaShieldAlt, FaGlobe } from "react-icons/fa";

const Responsibility = () => {
  return (
    <div className="responsibility">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero__inner">
          <h1 className="about-title">Responsibility</h1>
          <p className="about-lead">
            Rraynex where we share our commitment to creating a better world. Our responsibility to society and the environment is at the core of everything we do. We believe that by operating responsibly, we can make a positive impact on people’s lives and protect our planet for future generations.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <div className="resp-container">
        <h2 className="section-heading">Our Key Commitments</h2>
        <div className="resp-grid">
          <div className="resp-card">
            <FaHandsHelping className="resp-icon" />
            <h2>CSR</h2>
            <p>
              We focus on education, healthcare, and environmental
              sustainability through impactful initiatives to uplift the
              communities we serve.
            </p>
          </div>
          <div className="resp-card">
            <FaLeaf className="resp-icon" />
            <h2>Sustainability</h2>
            <p>
              From reducing our carbon footprint to adopting renewable energy,
              we strive to minimize our environmental impact every day.
            </p>
          </div>
          <div className="resp-card">
            <FaShieldAlt className="resp-icon" />
            <h2>EHS</h2>
            <p>
              Safety and health are at the core of our policies, ensuring a safe
              workplace for employees and minimal impact on the environment.
            </p>
          </div>
          <div className="resp-card">
            <FaGlobe className="resp-icon" />
            <h2>Uplifting the Ecosystem</h2>
            <p>
              We empower smaller manufacturers, fostering ethical and
              responsible practices while helping them expand globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responsibility;
