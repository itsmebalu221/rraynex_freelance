import React from "react";
import { FaCheckCircle, FaAward, FaMicroscope } from "react-icons/fa";
import "./quality.css";

const Quality = () => {
  return (
    <div className="quality">
      {/* Banner */}
      <div className="ql-banner">
        <div className="ql-banner__overlay">
          <h1 className="ql-title">Quality</h1>
          <p className="ql-subtitle">
            At Rraynex, we are committed to ensuring the highest quality standards 
            across our products and operations.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="ql-container">
        <h2 className="section-heading">Our Quality Commitment</h2>
        <p className="ql-intro">
          We understand the importance of quality in healthcare and are dedicated 
          to meeting or exceeding regulatory requirements and industry standards 
          for quality, safety, and efficacy. 
        </p>

        {/* Cards */}
        <div className="ql-grid">
          <div className="ql-card">
            <FaMicroscope className="ql-icon" />
            <h4>Quality Management</h4>
            <p>
              Our Quality Management System (QMS) follows ICH guidelines and is 
              regularly audited to ensure compliance with the latest standards.
            </p>
          </div>

          <div className="ql-card">
            <FaCheckCircle className="ql-icon" />
            <h4>Continuous Improvement</h4>
            <p>
              We invest in modern technologies, quality training, and continuous 
              improvement programs to maintain excellence in every product.
            </p>
          </div>

          <div className="ql-card">
            <FaAward className="ql-icon" />
            <h4>Global Recognition</h4>
            <p>
              Our dedication to quality has earned us certifications and awards, 
              showcasing our commitment to safe, effective, and reliable healthcare.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
