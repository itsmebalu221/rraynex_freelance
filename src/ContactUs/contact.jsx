import React, { useEffect, useState } from "react";
import { FaBuilding, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./Contact.css";
import Hero from "../Components/Hero/Hero";

const HQ_CITIES = [
  { id: 1, city: "Ankleshwar", note: "Manufacturing & Packaging Hub" },
  { id: 2, city: "Vadodara", note: "Formulation & APIs" },
  { id: 3, city: "Baddi", note: "Regulated Manufacturing Zone" },
  { id: 4, city: "Hyderabad", note: "Biotech & API Cluster" },
  { id: 5, city: "Chennai", note: "Southern Operations" },
  { id: 6, city: "Kolkata", note: "Eastern Commercial Hub" },
];

const MAIL_CONTACTS = [
  { title: "Media & Communications", email: "communications@rraynex.com" },
  { title: "Business Development", email: "info@rraynex.com" },
  { title: "Global Inquiries", email: "global@rraynex.com" },
];

export default function Contact() {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isHeadless = ua.includes("HeadlessChrome") || ua.includes("PhantomJS");
    if (!isHeadless) setShowMap(true);
  }, []);

  return (
    <main className="contact">
      {/* Hero Section */}
      <Hero
                      title="Pioneering Quality, Powering Global Trust"
                      subtitle="Precision in every process — delivering scientifically assured, globally compliant healthcare solutions."
                      bgImage="https://www.pexels.com/photo/person-holding-white-plastic-straw-8450516/"
                      ptitle="Explore Our Products"
                      plink="/products"
                      stitle="Download Brochure"
                      slink="/assets/Rraynex_Brochure.pdf"
                    />

      <div className="ct-container">
        {/* Top Section — Form + Corporate Office */}
        <div className="ct-top">
          <form className="ct-form">
            <h2 className="section-heading">Get in Touch</h2>

            <label>
              Full Name
              <input type="text" placeholder="Enter your name" required />
            </label>

            <label>
              Company
              <input type="text" placeholder="Enter your company name" />
            </label>

            <label>
              Email
              <input type="email" placeholder="Enter your business email" required />
            </label>

            <label>
              Message
              <textarea placeholder="Your message..." rows="5" required></textarea>
            </label>

            <button type="submit" className="btn-primary">Send Message</button>
          </form>

          <div className="ct-office">
            <h2 className="section-heading">Corporate Office</h2>
            <div className="office-info">
              <FaBuilding className="ct-icon" />
              <div>
                <p className="office-name">Rraynex Pharmaceuticals Pvt. Ltd.</p>
                <p>
                  Leela Business Park, Andheri (East), Mumbai,<br />
                  Maharashtra 400059
                </p>
                <p><strong>Phone:</strong> +91 97484 00667</p>
                <p><strong>Email:</strong> communications@rraynex.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Headquarters Section */}
        <h2 className="section-heading center">Headquarters & Regional Offices</h2>
        <div className="hq-row">
          {HQ_CITIES.map((hq) => (
            <div key={hq.id} className="hq-box">
              <FaMapMarkerAlt className="hq-icon" />
              <div>
                <h4>{hq.city}</h4>
                <p>{hq.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mail Contacts */}
        <h2 className="section-heading center">Key Contacts</h2>
        <div className="mail-row">
          {MAIL_CONTACTS.map((mail, i) => (
            <div key={i} className="mail-card">
              <FaEnvelope className="mail-icon" />
              <div>
                <h4>{mail.title}</h4>
                <p>{mail.email}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <h2 className="section-heading center">Locate Us</h2>
        <div className="map-container">
          {showMap ? (
            <iframe
              title="Rraynex Corporate Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7508.163945970745!2d72.75121871023883!3d19.794121481487025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71f005d81a1f7%3A0x3472d693bdd3a913!2sRraynex%20pharmaceutical%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1756640830152!5m2!1sen!2sin"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="map-placeholder">Interactive map loads on live site</div>
          )}
        </div>
      </div>
    </main>
  );
}
