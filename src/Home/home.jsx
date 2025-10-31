import React, { useState, useEffect } from "react";
import "./home.css";
import InfoCard from "../Components/Card/card";
import EcosystemSection from "../Components/Ecosystem/eco";
import GrowTogether from "../Components/GrowTogeather/grow";
import { BulbOutlined, RiseOutlined, HeartOutlined } from "@ant-design/icons";
import TrustedBy from "../Components/TrustedBy/TrustedBy";
import { Helmet } from "react-helmet-async";
import HeroCarousel from "../Components/ImgSlide/herocar";
import WelcomeOverlay from "../Components/Welcome"; // <-- NEW overlay import
import homeSeo from "../seo/home.seo.json";

export default function Home() {
  const getOverlayClosed = () => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
      return false;
    }
    return sessionStorage.getItem("welcomeOverlayClosed") === "true";
  };

  const [overlayClosed, setOverlayClosed] = useState(getOverlayClosed);
  const [heroVisible, setHeroVisible] = useState(() => (getOverlayClosed() ? true : false));

  const handleOverlayClose = () => {
    setOverlayClosed(true);
    if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("welcomeOverlayClosed", "true");
    }
    setTimeout(() => setHeroVisible(true), 300);
  };

  useEffect(() => {
    if (overlayClosed) {
      setHeroVisible(true);
    }
  }, [overlayClosed]);

  return (
    <>
      <Helmet>
        {/* Primary meta */}
        <title>{homeSeo?.title || "Delivering Quality Healthcare — Rraynex Pharmaceuticals"}</title>
        <meta
          name="description"
          content={
            homeSeo?.description ||
            "Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries. Research & development, compliant manufacturing and global partnerships."
          }
        />
        {/* Optional keywords meta (low SEO weight; mainly for internal reference) */}
        {Array.isArray(homeSeo?.keywords) && homeSeo.keywords.length > 0 && (
          <meta name="keywords" content={homeSeo.keywords.join(", ")} />
        )}
        <link rel="canonical" href={homeSeo?.canonical || "https://rraynex.com/"} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={homeSeo?.og?.title || "Delivering Quality Healthcare — Rraynex Pharmaceuticals"}
        />
        <meta
          property="og:description"
          content={
            homeSeo?.og?.description ||
            "Rraynex Pharmaceuticals — research, manufacturing, and global health partnerships across regulated and emerging markets."
          }
        />
        <meta property="og:url" content={homeSeo?.og?.url || homeSeo?.canonical || "https://myapp.com/"} />
        {homeSeo?.og?.image && <meta property="og:image" content={homeSeo.og.image} />}
        {homeSeo?.og?.imageAlt && <meta property="og:image:alt" content={homeSeo.og.imageAlt} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content={homeSeo?.twitter?.card || "summary_large_image"} />
        {homeSeo?.twitter?.site && <meta name="twitter:site" content={homeSeo.twitter.site} />}
        <meta
          name="twitter:title"
          content={homeSeo?.twitter?.title || homeSeo?.title || "Delivering Quality Healthcare — Rraynex Pharmaceuticals"}
        />
        <meta
          name="twitter:description"
          content={homeSeo?.twitter?.description || homeSeo?.description || "Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries."}
        />
        {homeSeo?.twitter?.image && <meta name="twitter:image" content={homeSeo.twitter.image} />}

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals Private Limited",
            url: homeSeo?.organization?.url || homeSeo?.canonical || "https://myapp.com/",
            logo: homeSeo?.organization?.logo || "https://myapp.com/path-to-logo.png",
            sameAs: homeSeo?.organization?.sameAs || [
              "https://www.facebook.com/yourpage",
              "https://www.linkedin.com/company/yourpage",
              "https://twitter.com/yourhandle",
            ],
            contactPoint: homeSeo?.organization?.contactPoint || [
              {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "customer service",
                areaServed: "IN",
              },
            ],
          })}
        </script>
        {/* Optional WebSite JSON-LD with keywords */}
        {Array.isArray(homeSeo?.keywords) && homeSeo.keywords.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals",
              url: homeSeo?.canonical || "https://rraynex.com/",
              keywords: homeSeo.keywords.join(", "),
            })}
          </script>
        )}
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
      <div className="second-section" id="second-section">
        <h1>{homeSeo?.h1 || "Delivering Quality Healthcare"}</h1>
        <div className="card-container">
          <InfoCard
            className="info-card"
            icon={<BulbOutlined style={{ fontSize: "50px" }} />}
            title="Innovation"
            description="Manufacturing pharmaceutical pellets, granules, APIs, and intermediaries with cutting-edge technology. We blend local expertise with global standards, ensuring world-class quality at every production stage. #LocalToGlobal"
            buttonText="Know More"
            buttonLink="/about/vision-and-values"
          />

          <InfoCard
            className="info-card"
            title="Value"
            icon={<HeartOutlined style={{ fontSize: "50px" }} />}
            description="Quality is our unwavering commitment from inception to delivery. Every raw material, every manufacturing process, and every finished product undergoes rigorous quality assurance, ensuring that we deliver nothing but excellence to our global partners."
            buttonText="Know More"
            buttonLink="/about/vision-and-values"
          />

          <InfoCard
            className="info-card"
            title="Growth"
            icon={<RiseOutlined style={{ fontSize: "50px" }} />}
            description="Beyond pharmaceuticals, Rraynex is diversifying into complementary sectors including engineering solutions and real estate development. We are strategically positioning ourselves to enter the energy sector, creating a robust, multi-dimensional enterprise."
            buttonText="Know More"
            buttonLink="/responsibility/uplifting-ecosystem"
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
