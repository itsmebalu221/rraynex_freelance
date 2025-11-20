import React, { useState, useEffect } from "react";
import "./home.css";
import InfoCard from "../Components/Card/card";
import EcosystemSection from "../Components/Ecosystem/eco";
import GrowTogether from "../Components/GrowTogeather/grow";
import { BulbOutlined, RiseOutlined, HeartOutlined } from "@ant-design/icons";
import TrustedBy from "../Components/TrustedBy/TrustedBy";
import { Helmet } from "react-helmet-async";
import HeroCarousel from "../Components/ImgSlide/herocar";
import WelcomeOverlay from "../Components/Welcome"; // overlay component
import homeSeo from "../seo/home.seo.json";

// Corrected Home.jsx
// Key fixes applied:
// 1. dynamic canonical URL (safeCanonical) so non-home routes don't get hard-coded canonical
// 2. organization.logo points to an actual image path fallback
// 3. enhanced Product JSON-LD (offers, image)
// 4. added og:image width/height meta tags where image exists
// 5. preload LCP image if present (og.image) to help LCP
// 6. preserved original markup and component wiring

export default function Home() {
  // sessionStorage-safe overlay control
  const getOverlayClosed = () => {
    try {
      if (typeof window === "undefined" || typeof sessionStorage === "undefined") return false;
      return sessionStorage.getItem("welcomeOverlayClosed") === "true";
    } catch (e) {
      return false;
    }
  };

  const [overlayClosed, setOverlayClosed] = useState(getOverlayClosed);
  const [heroVisible, setHeroVisible] = useState(() => (getOverlayClosed() ? true : false));

  const handleOverlayClose = () => {
    setOverlayClosed(true);
    try {
      if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("welcomeOverlayClosed", "true");
      }
    } catch (e) {
      // ignore
    }
    setTimeout(() => setHeroVisible(true), 300);
  };

  useEffect(() => {
    if (overlayClosed) setHeroVisible(true);
  }, [overlayClosed]);

  // Primary keyword selection logic (safe and explicit)
  const primaryKeyword =
    (homeSeo && homeSeo.primary) ||
    (Array.isArray(homeSeo?.keywords) && (homeSeo.keywords.find((k) => /pellet/i.test(k)) || homeSeo.keywords[0])) ||
    "pharmaceutical pellets manufacturers in india";

  const metaTitle = homeSeo?.title ? homeSeo.title : `${primaryKeyword} — Rraynex Pharmaceuticals`;

  const metaDescription =
    homeSeo?.description ||
    "Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries. Research & development, compliant manufacturing and global partnerships.";

  // safeCanonical: prefer explicit canonical in JSON, else derive from runtime if available, else fallback to site root
  const safeCanonical =
    homeSeo?.canonical ||
    (typeof window !== "undefined" ? window.location.origin + window.location.pathname : "https://rraynex.com/");

  // organization logo fallback should point to a real image
  const orgLogo =
    homeSeo?.organization?.logo && homeSeo.organization.logo !== "https://rraynex.com/"
      ? homeSeo.organization.logo
      : `${safeCanonical.replace(/\/$/, "")}/images/rraynex-logo.png`;

  // OG / Twitter image handling
  const ogImage = homeSeo?.og?.image || homeSeo?.twitter?.image || null;
  const ogImageAlt = homeSeo?.og?.imageAlt || "Rraynex Pharmaceuticals - Enteric Coated & Sustained Release Pellets Manufacturers India";

  // Product JSON-LD values
  const productName = /pellet/i.test(primaryKeyword) ? "Pharmaceutical Pellets & Granules" : primaryKeyword;
  const productImage = ogImage || `${safeCanonical.replace(/\/$/, "")}/images/product-hero.jpg`;

  return (
    <>
      <Helmet>
        {/* Primary meta */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Optional keywords: keep for internal use but not relied upon for ranking */}
        {Array.isArray(homeSeo?.keywords) && homeSeo.keywords.length > 0 && (
          <meta name="keywords" content={homeSeo.keywords.join(", ")} />
        )}

        {/* Dynamic canonical */}
        <link rel="canonical" href={safeCanonical} />
        <meta name="robots" content="index, follow" />

        {/* Preload LCP image (if set) to improve LCP */}
        {ogImage && <link rel="preload" as="image" href={ogImage} />}

        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={homeSeo?.og?.title || metaTitle} />
        <meta property="og:description" content={homeSeo?.og?.description || metaDescription} />
        <meta property="og:url" content={homeSeo?.og?.url || safeCanonical} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:alt" content={ogImageAlt} />}
        {ogImage && <meta property="og:image:width" content="1200" />}
        {ogImage && <meta property="og:image:height" content="630" />}

        {/* Twitter Card */}
        <meta name="twitter:card" content={homeSeo?.twitter?.card || "summary_large_image"} />
        {homeSeo?.twitter?.site && <meta name="twitter:site" content={homeSeo.twitter.site} />}
        <meta name="twitter:title" content={homeSeo?.twitter?.title || metaTitle} />
        <meta name="twitter:description" content={homeSeo?.twitter?.description || metaDescription} />
        {homeSeo?.twitter?.image && <meta name="twitter:image" content={homeSeo.twitter.image} />}

        {/* Organization JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals Private Limited",
            url: homeSeo?.organization?.url || safeCanonical,
            logo: orgLogo,
            sameAs: homeSeo?.organization?.sameAs || [],
            contactPoint:
              homeSeo?.organization?.contactPoint && homeSeo.organization.contactPoint.length
                ? homeSeo.organization.contactPoint.map((cp) => ({
                    "@type": "ContactPoint",
                    telephone: cp.telephone,
                    contactType: cp.contactType,
                    areaServed: cp.areaServed,
                  }))
                : [
                    {
                      "@type": "ContactPoint",
                      telephone: "+91-8697970460",
                      contactType: "customer service",
                      areaServed: "IN",
                    },
                  ],
          })}
        </script>

        {/* WebSite JSON-LD (optional) */}
        {Array.isArray(homeSeo?.keywords) && homeSeo.keywords.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals",
              url: safeCanonical,
              keywords: homeSeo.keywords.join(", "),
            })}
          </script>
        )}

        {/* Enhanced Product JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: productName,
            description: metaDescription,
            brand: { "@type": "Brand", name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals" },
            url: safeCanonical,
            image: productImage,
            sku: "RRTX-HOME-001",
            offers: {
              "@type": "Offer",
              url: safeCanonical,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>
      </Helmet>

      {/* Overlay (renders only on client) */}
      {!overlayClosed && <WelcomeOverlay onClose={handleOverlayClose} />}

      {/* Hero / Carousel */}
      <div className={`hero-carousel-wrapper ${heroVisible ? "hero-fade-in" : "hero-fade-out"}`}>
        <HeroCarousel />
      </div>

      {/* Second Section */}
      <section className="second-section" id="second-section">
        {/* H1: ensure this exists in DOM for crawlers even if overlay visible */}
        <h1>{homeSeo?.h1 || "Delivering Quality Healthcare"}</h1>

        <p>
          As a WHO-GMP and ISO 9001:2015 certified pharmaceutical manufacturer in Mumbai, we specialize in
          advanced drug delivery systems including enteric-coated pellets, sustained-release formulations, and
          pharmaceutical granules, serving healthcare partners across 58+ countries.
        </p>

        <div style={{ textAlign: "center" }}>
          <h2>Why Choose Rraynex for Pharmaceutical Pellets & Granules Manufacturing</h2>
        </div>

        <div className="card-container">
          <InfoCard
            className="info-card"
            icon={<BulbOutlined style={{ fontSize: "50px" }} />}
            title="Innovation in Pharmaceutical Manufacturing"
            description={
              "Advanced pharmaceutical pellets and granules manufacturing with cutting-edge multiparticulate drug delivery technology. We specialize in enteric-coated, sustained-release, and immediate-release formulations, ensuring world-class quality standards for global healthcare partners."
            }
            buttonText="Know More"
            buttonLink="/about/vision-and-values"
          />

          <InfoCard
            className="info-card"
            title="WHO-GMP Certified Quality Assurance"
            icon={<HeartOutlined style={{ fontSize: "50px" }} />}
            description="ISO 9001:2015 and WHO-GMP certified manufacturing facility in Pune with stringent quality control at every stage. From raw material sourcing to final pharmaceutical pellets production, our regulatory compliance ensures international pharmaceutical standards for APIs, pellets, and granules."
            buttonText="Know More"
            buttonLink="/about/vision-and-values"
          />

          <InfoCard
            className="info-card"
            title="Global Pharmaceutical Export Excellence"
            icon={<RiseOutlined style={{ fontSize: "50px" }} />}
            description="Trusted pharmaceutical pellets and granules supplier to 58+ countries worldwide. Beyond pharmaceuticals, Rraynex is expanding into complementary sectors including engineering and real estate, while strategically positioning in the energy sector for sustainable growth."
            buttonText="Know More"
            buttonLink="/responsibility/uplifting-ecosystem"
          />
        </div>
      </section>

      {/* Trusted By */}
      <section>
        <TrustedBy />
      </section>

      {/* Ecosystem Section */}
      <section className="third-section">
        <div className="selection-container">
          <EcosystemSection />
        </div>
      </section>

      {/* Grow Together Section */}
      <section className="fifth-section">
        <GrowTogether />
      </section>
    </>
  );
}
