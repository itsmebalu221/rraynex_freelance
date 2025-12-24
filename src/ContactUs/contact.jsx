import React, { useEffect, useState } from "react";
import { FaBuilding, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./Contact.css";
import Hero from "../Components/Hero/Hero";
import SEO from "../seo/SEO";
import { getPageSEO } from "../seo/seoConfig";

const REGIONAL_OFFICES = [
  {
    id: 1,
    city: "Ankleshwar",
    note: "APIs and Intermediary manufacturing hub serving regulated and semi-regulated markets",
  },
  {
    id: 2,
    city: "Mumbai (Tarapur)",
    note: "Corporate HQ, pellets & granules primary production campus",
  },
];

const BRANCH_OFFICES = [
  {
    id: 4,
    city: "Kolkata",
    note: "#3 Govinda Auddy Road, Kolkata 700027",
  },
  {
    id: 5,
    city: "Ahmedabad",
    note: "13th Floor, Gala Empire, Opp. T. V. Tower, Thaltej, Ahmedabad 380054",
  },
  {
    id: 6,
    city: "New Delhi",
    note: "F-61, First Floor, Manish Global Mall, Sector-22, Dwarka, New Delhi 110077",
  },
];

const MAIL_CONTACTS = [
  { title: "Media & Communications", email: "raina@rraynex.com" },
  { title: "Business Inquiry", email: "communications@rraynex.com" },
  { title: "Global Inquiries", email: "offers@rraynex.com" },
  { title: "Investor Relations", email: "nishit@rraynex.com" },
];

const PRIMARY_CONTACT_EMAIL = "communications@rraynex.com";

export default function Contact() {
  const seo = getPageSEO('contact');
  const [showMap, setShowMap] = useState(false);
  const topContacts = MAIL_CONTACTS.slice(0, 2);
  const bottomContacts = MAIL_CONTACTS.slice(2, 4);
  const [formNotice, setFormNotice] = useState("");

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isHeadless = ua.includes("HeadlessChrome") || ua.includes("PhantomJS");
    if (!isHeadless) setShowMap(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = (data.get("fullName") || "").toString().trim();
    const company = (data.get("company") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const subject = encodeURIComponent(
      `Enquiry from ${fullName || "Rraynex visitor"} — Rraynex Pharma}`
    );

    const bodyLines = [
      `Name: ${fullName || "N/A"}`,
      `Company: ${company || "N/A"}`,
      `Email: ${email || "N/A"}`,
      "",
      message || "(Message not provided)",
    ];

    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailtoUrl = `mailto:${PRIMARY_CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (typeof window !== "undefined") {
      window.location.href = mailtoUrl;
    }

    setFormNotice(
      `Your email client should open with a draft message addressed to ${PRIMARY_CONTACT_EMAIL}. If it does not, please email us directly.`
    );
    form.reset();
  };

  return (
    <main className="contact">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="contact"
      />
      {/* Hero Section */}
      <Hero
        title="Let's Connect"
        subtitle="Reach our teams for partnerships, investor queries, or global distribution support."
        bgImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
        ptitle="Explore Our Products"
        plink="/products"
        stitle="Download Brochure"
        slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
      />

      <div className="ct-container">
        {/* Top Section — Form + Corporate Office */}
        <div className="ct-top">
          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <h2 className="section-heading">Get in Touch</h2>

            <label>
              Full Name
              <input name="fullName" type="text" placeholder="Enter your name" required />
            </label>

            <label>
              Company
              <input name="company" type="text" placeholder="Enter your company name" />
            </label>

            <label>
              Email
              <input name="email" type="email" placeholder="Enter your business email" required />
            </label>

            <label>
              Message
              <textarea name="message" placeholder="Your message..." rows="5" required></textarea>
            </label>

            <button type="submit" className="btn-primary">Send Message</button>
            {formNotice && <p className="form-notice">{formNotice}</p>}
          </form>

          <div className="ct-office">
            <h2 className="section-heading">Corporate Office</h2>
            <div className="office-info">
              <FaBuilding className="ct-icon" />
              <div>
                <p className="office-name">Rraynex Pharmaceuticals Pvt. Ltd.</p>
                <p>
                  J 94 Tarapur M. I. D. C., Boisar - 401506, Maharashtra, India
                </p>
                <p><strong>Phone:</strong> +91 86979 70460</p>
                <p><strong>Email:</strong> communications@rraynex.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Offices */}
        <h2 className="section-heading center">Manufacturing Facilities</h2>
        <div className="hq-row">
          {REGIONAL_OFFICES.map((hq) => (
            <div key={hq.id} className="hq-box">
              <FaMapMarkerAlt className="hq-icon" />
              <div>
                <h4>{hq.city}</h4>
                <p>{hq.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Branch Offices */}
        <h2 className="section-heading center">Branch Offices</h2>
        <div className="hq-row">
          {BRANCH_OFFICES.map((hq) => (
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
        <div className="mail-grid">
          <div className="mail-row">
            {topContacts.map((mail, i) => (
              <div key={`${mail.email}-${i}`} className="mail-card">
                <FaEnvelope className="mail-icon" />
                <div>
                  <h4>{mail.title}</h4>
                  <p>{mail.email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mail-row">
            {bottomContacts.map((mail, i) => (
              <div key={`${mail.email}-${i}`} className="mail-card">
                <FaEnvelope className="mail-icon" />
                <div>
                  <h4>{mail.title}</h4>
                  <p>{mail.email}</p>
                </div>
              </div>
            ))}
          </div>
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
