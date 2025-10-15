import React, { useState, useEffect } from "react";
import "./home.css";
import InfoCard from "../Components/Card/card";
import EcosystemSection from "../Components/Ecosystem/eco";
import image4 from "./image1.png";
import GrowTogether from "../Components/GrowTogeather/grow";
import { BulbOutlined, RiseOutlined, HeartOutlined } from "@ant-design/icons";
import TrustedBy from "../Components/TrustedBy/TrustedBy";
import { Helmet } from "react-helmet-async";
import HeroCarousel from "../Components/ImgSlide/herocar";
import H1Underline from "../Components/H1/H1Underline";
import WelcomeOverlay from "../Components/Welcome"; // <-- NEW overlay import

export default function Home() {
  const [overlayClosed, setOverlayClosed] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const handleOverlayClose = () => {
    setOverlayClosed(true);
    setTimeout(() => setHeroVisible(true), 300);
  };

  // skip overlay if user has visited
  useEffect(() => {
    if (localStorage.getItem("hasVisitedRraynex")) {
      setOverlayClosed(true);
      setHeroVisible(true);
    }
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary meta */}
        <title>Delivering Quality Healthcare — Rraynex Pharmaceuticals</title>
        <meta
          name="description"
          content="Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries. Research & development, compliant manufacturing and global partnerships."
        />
        <link rel="canonical" href="https://rraynex.com/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Delivering Quality Healthcare — Rraynex Pharmaceuticals"
        />
        <meta
          property="og:description"
          content="Rraynex Pharmaceuticals — research, manufacturing, and global health partnerships across regulated and emerging markets."
        />
        <meta property="og:url" content="https://myapp.com/" />
        <meta property="og:image" content="https://myapp.com/og-image.jpg" />
        <meta property="og:image:alt" content="Rraynex logo and team" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourhandle" />
        <meta
          name="twitter:title"
          content="Delivering Quality Healthcare — Rraynex Pharmaceuticals"
        />
        <meta
          name="twitter:description"
          content="Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries."
        />
        <meta name="twitter:image" content="https://myapp.com/twitter-image.jpg" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rraynex Pharmaceuticals Private Limited",
            url: "https://myapp.com/",
            logo: "https://myapp.com/path-to-logo.png",
            sameAs: [
              "https://www.facebook.com/yourpage",
              "https://www.linkedin.com/company/yourpage",
              "https://twitter.com/yourhandle",
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "customer service",
                areaServed: "IN",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Overlay */}
      {!overlayClosed && <WelcomeOverlay onClose={handleOverlayClose} />}

      {/* Hero / Carousel */}
      <div
        className={`hero-carousel-wrapper ${
          heroVisible ? "hero-fade-in" : "hero-fade-out"
        }`}
      >
        <HeroCarousel />
      </div>

      {/* Second Section */}
      <div className="second-section">
        <h1>Delivering Quality Healthcare</h1>
        <div className="card-container">
          <InfoCard
            className="info-card"
            icon={<BulbOutlined style={{ fontSize: "50px" }} />}
            title="Innovation"
            description="Manufacturing pharmaceutical pellets, granules, APIs, and intermediaries with cutting-edge technology. We blend local expertise with global standards, ensuring world-class quality at every production stage. #LocalToGlobal"
            buttonText="Know More"
          />

          <InfoCard
            className="info-card"
            title="Value"
            icon={<HeartOutlined style={{ fontSize: "50px" }} />}
            description="Quality is our unwavering commitment from inception to delivery. Every raw material, every manufacturing process, and every finished product undergoes rigorous quality assurance, ensuring that we deliver nothing but excellence to our global partners."
            buttonText="Know More"
          />

          <InfoCard
            className="info-card"
            title="Growth"
            icon={<RiseOutlined style={{ fontSize: "50px" }} />}
            description="Beyond pharmaceuticals, Rraynex is diversifying into complementary sectors including engineering solutions and real estate development. We are strategically positioning ourselves to enter the energy sector, creating a robust, multi-dimensional enterprise."
            buttonText="Know More"
          />
        </div>
      </div>

      {/* Trusted By */}
      <div>
        <TrustedBy />
      </div>

      {/* Ecosystem Section */}
      <div className="third-section">
        <div className="selection-container">
          <EcosystemSection />
        </div>
      </div>

      {/* Grow Together Section */}
      <div className="fifth-section">
        <GrowTogether />
      </div>
    </>
  );
}
