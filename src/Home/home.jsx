// Home.jsx
// Changelog:
// - Injected SEO meta tags from ../seo/home.seo.json (title, description, canonical, og, twitter).
// - Added Organization JSON-LD and optional WebSite JSON-LD (keywords included for internal signalling).
// - Added Product JSON-LD fallback that picks a sensible primary keyword (first 'pellet' match) — edit as needed.
// - Added inline comments marking exact keyword placements and guidance.
// Design preservation: no classnames, markup structure, component props or CSS were modified.

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

/**
 * Keyword strategy notes (quick):
 * - Primary keyword used in <title>, H1, and Product JSON-LD.
 * - Secondary/long-tail keywords used across H2/H3 and body copy (add naturally in content).
 * - Avoid bulk-stuffing: keep keywords human-readable and intent-focused.
 *
 * If you want to change the primary keyword: update the selection logic below or
 * set `homeSeo.primary` in your JSON and this component will prefer that.
 */

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

  /**
   * Primary keyword selection logic:
   * - If you add "primary" in homeSeo JSON (e.g., homeSeo.primary = "pharma pellets manufacturers in india"),
   *   that will be used.
   * - Otherwise, pick the first keyword that contains 'pellet' or 'pellets' (practical for Rraynex).
   * - Fallback to the first keyword in the list.
   *
   * Edit this logic if you want a different primary selection rule.
   */
  const primaryKeyword =
    (homeSeo && homeSeo.primary) ||
    (Array.isArray(homeSeo?.keywords) &&
      (homeSeo.keywords.find((k) => /pellet/i.test(k)) || homeSeo.keywords[0])) ||
    "pharmaceutical pellets manufacturers in india";

  const metaTitle = homeSeo?.title
    ? homeSeo.title
    : `${primaryKeyword} — Rraynex Pharmaceuticals`;

  const metaDescription = homeSeo?.description
    ? homeSeo.description
    : "Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries. Research & development, compliant manufacturing and global partnerships.";

  const canonical = homeSeo?.canonical || "https://rraynex.com/";

  return (
    <>
      <Helmet>
        {/* Primary meta */}
        {/* Place primary keyword near the start of <title> for best impact */}
        <title>{metaTitle}</title>

        {/* Meta description: include primary keyword + 1-2 secondaries naturally (do not stuff). */}
        <meta name="description" content={metaDescription} />

        {/* The 'keywords' meta tag is optional and low-weight; kept for internal/reference use.
            If you'd rather not expose this tag, remove the block below. */}
        {Array.isArray(homeSeo?.keywords) && homeSeo.keywords.length > 0 && (
          <meta name="keywords" content={homeSeo.keywords.join(", ")} />
        )}

        {/* Canonical (critical to avoid duplicate content issues) */}
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (social previews) */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={homeSeo?.og?.title || metaTitle} />
        <meta property="og:description" content={homeSeo?.og?.description || metaDescription} />
        <meta property="og:url" content={homeSeo?.og?.url || canonical} />
        {homeSeo?.og?.image && <meta property="og:image" content={homeSeo.og.image} />}
        {homeSeo?.og?.imageAlt && <meta property="og:image:alt" content={homeSeo.og.imageAlt} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content={homeSeo?.twitter?.card || "summary_large_image"} />
        {homeSeo?.twitter?.site && <meta name="twitter:site" content={homeSeo.twitter.site} />}
        <meta name="twitter:title" content={homeSeo?.twitter?.title || metaTitle} />
        <meta name="twitter:description" content={homeSeo?.twitter?.description || metaDescription} />
        {homeSeo?.twitter?.image && <meta name="twitter:image" content={homeSeo.twitter.image} />}

        {/* JSON-LD: Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals Private Limited",
            url: homeSeo?.organization?.url || canonical,
            logo: homeSeo?.organization?.logo || `${canonical}images/logo.png`,
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

        {/* Optional WebSite JSON-LD — includes the 'keywords' field as an internal signal (not required). */}
        {Array.isArray(homeSeo?.keywords) && homeSeo.keywords.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals",
              url: canonical,
              // keywords field here is for structured data completeness; search engines prioritize content & schema context.
              keywords: homeSeo.keywords.join(", "),
            })}
          </script>
        )}

        {/* Product JSON-LD fallback for 'pellets & granules' — edit name/description if you'd prefer a different primary keyword */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: primaryKeyword.includes("pellet") || primaryKeyword.includes("pellets")
              ? "Pharmaceutical Pellets & Granules"
              : primaryKeyword,
            description: metaDescription,
            brand: {
              "@type": "Brand",
              name: homeSeo?.organization?.name || "Rraynex Pharmaceuticals",
            },
            url: canonical,
            // Add offers/reviews if product-level commerce data becomes relevant
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
      <div className="second-section" id="second-section">
        {/* H1 placement: put the primary keyword here naturally. Avoid exact-match spam. */}
        {/* Current H1 comes from JSON (homeSeo.h1). If you want the primary keyword in H1, set homeSeo.h1 accordingly.
            Example recommended H1: "Pharmaceutical Pellets & Granules — Trusted manufacturers in India" */}
        <h1>
          {homeSeo?.h1 || "Delivering Quality Healthcare"}
          {/* ✅ Keyword guidance: if you want the H1 to include the primary keyword, update homeSeo.h1 in your JSON. */}
        </h1>

        <div className="card-container">
          <InfoCard
            className="info-card"
            icon={<BulbOutlined style={{ fontSize: "50px" }} />}
            title="Innovation"
            description={
              /* Insert secondary keywords naturally in descriptions. Example:
                 "Manufacturing pharmaceutical pellets, granules, APIs, and intermediaries..."
                 The phrase 'pharmaceutical pellets' is already present here; that's a natural keyword usage. */
              "Manufacturing pharmaceutical pellets, granules, APIs, and intermediaries with cutting-edge technology. We blend local expertise with global standards, ensuring world-class quality at every production stage. #LocalToGlobal"
            }
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
          {/* Keyword placement tip: on inner pages (Ecosystem, Products), use H2/H3 to target long-tail keywords.
              Example H2: "Enteric-coated pellets manufacturers in India" — add similar headings in the product pages. */}
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
