import React, { useState } from "react";
import "./Worldwide.css";

const REGIONS = {
  ASIA: {
    title: "Asia",
    text: `Looking for a pharmaceutical company with a strong presence in the Asian market? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

Our primary markets include India, Bangladesh, Nepal, Bhutan, Sri Lanka, the Philippines, Myanmar, Vietnam, Cambodia, Hong Kong, Australia, Indonesia, Pakistan, and Afghanistan. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Asian market, we invite you to reach out to us today.`
  },
  AFRICA: {
    title: "Africa",
    text: `Looking for a pharmaceutical company with a strong presence in the Africa region? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

We work all over Africa. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Middle East and North African market, we invite you to reach out to us today.`
  },
  AMERICA: {
    title: "America",
    text: `At Rraynex, we are proud to have a deeply penetrated presence in the Latin American, central and South American market, providing a wide range of healthcare solutions to the region. With our extensive experience in the industry, we have established ourselves as a reliable partner to healthcare providers, offering high-quality semi-finished dosages, finished dosage forms, feeds, veterinary products, and more.

Our commitment to providing the best healthcare solutions has enabled us to secure several product registrations, allowing us to offer an extensive range of products to our clients. Our primary markets include Brazil, Mexico, Argentina, Colombia, Peru, Ecuador, Chile, Venezuela, Guatemala, Caribbean islands, and more.

At RRAYNEX, we believe in maintaining the highest standards of quality, safety, and efficacy in our products. To achieve this, we work closely with regulatory bodies in each country to ensure compliance with local regulations and guidelines.

We understand the importance of delivering products on time and at a competitive cost, which is why we have invested in a robust supply chain network. Our logistics team is equipped to handle complex distribution challenges, ensuring that our products reach our customers promptly.`
  },
  CIS: {
    title: "CIS",
    text: `Looking for a pharmaceutical company with a strong presence in the CIS region? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

Our primary markets include Russia, Kazakhstan, Uzbekistan, Azerbaijan, Belarus and more. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the CIS region, we invite you to reach out to us today.`
  },
  MENA: {
    title: "MENA",
    text: `Looking for a pharmaceutical company with a strong presence in the MENA region? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

Our primary markets include Saudi Arabia, UAE, Iran, Iraq, Jordan, Algeria, and Egypt, among others. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Middle East and North African market, we invite you to reach out to us today.`
  }
};

const WorldWide = () => {
  const [active, setActive] = useState("ASIA");

  return (
    <div className="worldwide">
      {/* Banner */}
      <div className="worldwide-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">Worldwide Presence</h1>
          <p className="banner-subtitle">
            Our presence spans across the globe, delivering high-quality healthcare solutions.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs">
          {Object.keys(REGIONS).map((region) => (
            <button
              key={region}
              className={`tab-btn ${active === region ? "active" : ""}`}
              onClick={() => setActive(region)}
              onMouseEnter={() => setActive(region)}
            >
              {REGIONS[region].title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="tab-content">
          <h2>{REGIONS[active].title}</h2>
          <p>{REGIONS[active].text}</p>
        </div>
      </div>
    </div>
  );
};

export default WorldWide;
