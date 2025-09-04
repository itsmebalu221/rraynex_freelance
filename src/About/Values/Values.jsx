import React from "react";
import "./Values.css";
import {
  FaUserFriends,
  FaLightbulb,
  FaBalanceScale,
  FaHandsHelping,
  FaMedal,
  FaLeaf,
} from "react-icons/fa";

export default function VisionValues() {
  return (
    <section className="vision-values">
      {/* Banner Header */}
      <div className="vv-banner">
        <div className="vv-banner__overlay">
          <h1 className="vv-title">Vision & Values</h1>
          <p className="vv-subtitle">
            At Rraynex, we are dedicated to making a positive impact on healthcare and
            society. Our vision and values guide every decision we make.
          </p>
        </div>
      </div>

      <div className="vv-container">
        {/* Vision Card */}
        <div className="vision-card">
          <h2>Our Vision</h2>
          <p>
            To be a leading global healthcare company that transforms lives by providing
            innovative and accessible healthcare solutions. We believe in improving
            healthcare access and affordability for all, regardless of socioeconomic
            status, geographic location, or disease state.
          </p>
        </div>

        {/* Values Grid */}
        <h2 className="section-heading">Our Core Values</h2>
        <div className="vv-grid">
          <div className="vv-card">
            <FaUserFriends className="vv-icon" />
            <h4>Patient-Centricity</h4>
            <p>
              Our patients are at the heart of everything we do. We are committed to
              putting patients first and addressing their unique challenges.
            </p>
          </div>

          <div className="vv-card">
            <FaLightbulb className="vv-icon" />
            <h4>Innovation</h4>
            <p>
              We drive innovation in healthcare by encouraging creativity, agility, and
              bold solutions that bring new therapies to market.
            </p>
          </div>

          <div className="vv-card">
            <FaBalanceScale className="vv-icon" />
            <h4>Integrity</h4>
            <p>
              We uphold the highest ethical standards by being transparent, honest, and
              accountable in all our actions.
            </p>
          </div>

          <div className="vv-card">
            <FaHandsHelping className="vv-icon" />
            <h4>Collaboration</h4>
            <p>
              We believe in teamwork and partnerships to develop meaningful healthcare
              solutions that meet real-world needs.
            </p>
          </div>

          <div className="vv-card">
            <FaMedal className="vv-icon" />
            <h4>Excellence</h4>
            <p>
              We strive for excellence in the quality of our products, services, and
              relationships with stakeholders.
            </p>
          </div>

          <div className="vv-card">
            <FaLeaf className="vv-icon" />
            <h4>Sustainability</h4>
            <p>
              We take responsibility for our environmental and social impact, working
              towards a sustainable future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
