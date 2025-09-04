import React from "react";
import "./milestones.css";
import {
  FaGlobe,
  FaHandshake,
  FaFileAlt,
  FaUsers,
  FaAward,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";

export default function MilestonesRecognitions() {
  return (
    <section className="milestones">
      {/* Banner */}
      <div className="ms-banner">
        <div className="ms-banner__overlay">
          <h1 className="ms-title">Milestones & Recognitions</h1>
          <p className="ms-subtitle">
            At Rraynex, we are proud of our journey in building a strong global
            distribution network, supporting innovation, and being recognized
            for excellence and impact.
          </p>
        </div>
      </div>

      <div className="ms-container">
        {/* Milestones */}
        <h2 className="section-heading">Our Milestones</h2>
        <div className="ms-grid">
          <div className="ms-card">
            <FaGlobe className="ms-icon" />
            <h4>Global Reach</h4>
            <p>
              Established a robust distribution network across the globe,
              reaching patients even in the most remote locations.
            </p>
          </div>

          <div className="ms-card">
            <FaUsers className="ms-icon" />
            <h4>Supporting Manufacturers</h4>
            <p>
              Onboarded and helped create an ecosystem for smaller manufacturers
              to expand their global reach through our network.
            </p>
          </div>

          <div className="ms-card">
            <FaFileAlt className="ms-icon" />
            <h4>Regulatory Success</h4>
            <p>
              Filed marketing authorizations for products in diverse markets
              worldwide, ensuring safety and compliance.
            </p>
          </div>

          <div className="ms-card">
            <FaHandshake className="ms-icon" />
            <h4>Strong Partnerships</h4>
            <p>
              Built collaborations with healthcare providers, pharma companies,
              and stakeholders to improve patient access.
            </p>
          </div>
        </div>

        {/* Recognitions */}
        <h2 className="section-heading">Our Recognitions</h2>
        <div className="ms-grid">
          <div className="ms-card">
            <FaAward className="ms-icon" />
            <h4>Industry Recognition</h4>
            <p>
              Recognized as a leading healthcare company for innovation,
              patient-centered care, and ethical practices.
            </p>
          </div>

          <div className="ms-card">
            <FaGlobe className="ms-icon" />
            <h4>Featured Publications</h4>
            <p>
              Featured in industry publications for expanding healthcare access
              in underserved communities.
            </p>
          </div>

          <div className="ms-card">
            <FaLeaf className="ms-icon" />
            <h4>Sustainability Commitment</h4>
            <p>
              Honored by organizations for dedication to sustainability and
              corporate responsibility.
            </p>
          </div>

          <div className="ms-card">
            <FaUserTie className="ms-icon" />
            <h4>Thought Leadership</h4>
            <p>
              Ms. Raina Dilip Desai recognized as an industry leader, invited to
              speak at key global pharma conferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
