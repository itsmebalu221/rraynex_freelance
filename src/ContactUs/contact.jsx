import React, { useEffect, useState } from "react";
import "./Contact.css";
import { FaBuilding, FaUsers, FaEnvelope, FaGlobe } from "react-icons/fa";

const Contact = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isHeadless = ua.includes("HeadlessChrome");
    if (!isHeadless) {
      setShowMap(true);
    }
  }, []);

  return (
    <div className="contact">
      {/* HERO */}
      <section className="products-hero">
        <div className="products-hero-content">
          <h1 className="products-hero-title">Contact Us</h1>
          <p className="products-hero-lead">Your feedback is essential to us, so please do not hesitate to contact us if you have any comments or suggestions.</p>
         
        </div>
      </section>

      {/* Content */}
      <div className="ct-container">
        {/*<h2 className="section-heading">Get in Touch</h2>*/}

        {/* Intro cards */}
        {/* <div className="ct-grid">
          <div className="ct-card">
            <FaUsers className="ct-icon" />
            <h4>Discover your potential with us</h4>
            <p>
              Join our team today!{" "}
              <button
                type="button"
                className="ct-link"
                onClick={() => {
                  // TODO: Add navigation or modal logic here
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Click Here
              </button>
            </p>
          </div>

          <div className="ct-card">
            <FaEnvelope className="ct-icon" />
            <h4>Adverse Event Reporting</h4>
            <p>
              Report any adverse events or undesirable experiences (side
              effects) associated with the use of our medicines.
            </p>
          </div>

          <div className="ct-card">
            <FaEnvelope className="ct-icon" />
            <h4>Product Quality Complaint Form</h4>
            <p>Report any complaints regarding the quality of our medicines.</p>
          </div>
        </div> */}

        {/* Offices */}
        <h2 className="section-heading">Our Offices</h2>
        <div className="ct-grid">
          <div className="ct-card">
            <FaBuilding className="ct-icon" />
            <h4>Registered Office</h4>
            <p>
              Westgate, 100 Feet Road, 4, SG Hwy Service Rd, Makarba,
              Ahmedabad, Gujarat 380015
            </p>
            <p>📞 +91 8697970460</p>
            <p>✉️ communications@rraynex.com</p>
          </div>

          <div className="ct-card">
            <FaBuilding className="ct-icon" />
            <h4>Corporate Office</h4>
            <p>
              Leela Business Park, Andheri (East) Mumbai, Maharashtra:
              400059
            </p>
            <p>📞 +91 9748400667</p>
            <p>✉️ communications@rraynex.com</p>
          </div>
        </div>

        {/* Investors */}
        <h2 className="section-heading">Investors</h2>
        <div className="ct-grid">
          <div className="ct-card">
            <FaUsers className="ct-icon" />
            <h4>Individual Investor</h4>
            <p>Ms. Raina Dilip Desai</p>
            <p>✉️ raina@rraynex.com</p>
          </div>

          <div className="ct-card">
            <FaUsers className="ct-icon" />
            <h4>Institutional Investor</h4>
            <p>Mr. Nishit Gupta</p>
            <p>✉️ nishit@rraynex.com</p>
          </div>
        </div>

        {/* Other Contacts */}
        <h2 className="section-heading">Other Contacts</h2>
        <div className="ct-grid">
          <div className="ct-card">
            <FaEnvelope className="ct-icon" />
            <h4>Media Contacts</h4>
            <p>communications@rraynex.com</p>
          </div>
          <div className="ct-card">
            <FaEnvelope className="ct-icon" />
            <h4>Business Development</h4>
            <p>info@rraynex.com</p>
          </div>
          <div className="ct-card">
            <FaGlobe className="ct-icon" />
            <h4>Worldwide Info</h4>
            <p>info@rraynex.com</p>
          </div>
        </div>

        {/* Map */}
        <h2 className="section-heading">Find Us</h2>
        <div className="map-container">
          {showMap ? (
            <iframe
              title="Rraynex Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7508.163945970745!2d72.75121871023883!3d19.794121481487025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71f005d81a1f7%3A0x3472d693bdd3a913!2sRraynex%20pharmaceutical%20Pvt.%20Ltd!5e0!3m2!1sen!2sus!4v1756640830152!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="map-placeholder">
              Interactive map loads on the live site.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
