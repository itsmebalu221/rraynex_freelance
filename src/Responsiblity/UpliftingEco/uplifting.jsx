import React, { useEffect } from "react";
import "./ecosys.css";
import Hero from "../../Components/Hero/Hero";
import SEO from "../../seo/SEO";
import { getPageSEO } from "../../seo/seoConfig";
import header from "../../About/Milestones/3.jpg"

const VALUE_CHAIN = [
  {
    id: "pellets",
    title: "Pellets That Anchor Release Blueprints",
    summary:
      "We start by co-developing multiparticulate systems with partner sites. Uniform bead sizes and validated coating cycles give smaller manufacturers a predictable base for complex therapies.",
    impact:
      "Partners can plug into international supply programs faster because dissolution data and stability protocols travel with every batch.",
    ctaLabel: "Pellet Portfolio",
    ctaLink: "/products/categories/pellets",
  },
  {
    id: "granules",
    title: "Granules That Anticipate Demand",
    summary:
      "Moisture-managed granules engineered for direct compression protect tablet press capacity. We share blend recipes and in-process controls that work in real-world humidity and heat.",
    impact:
      "By removing the uncertainty around flow, our partners convert more SKUs on the same line and cut rejection rates for seasonal runs.",
    ctaLabel: "Granule Range",
    ctaLink: "/products/categories/granules",
  },
  {
    id: "api",
    title: "APIs & Intermediaries Safeguarding Core Chemistry",
    summary:
      "WHO-GMP synthesis blocks, impurity profiling, and dossier-ready documentation keep pipelines compliant. Smaller formulators gain access to chemistries that normally demand heavy capital investment.",
    impact:
      "Joint tech-transfer labs deliver repeatable impurity profiles so regulatory filings move quickly across LATAM, CIS, and ROW markets.",
    ctaLabel: "API Capabilities",
    ctaLink: "/products/categories/api",
  },
  {
    id: "fdf",
    title: "Finished Dose Forms Completing the Value Loop",
    summary:
      "We support tablets, capsules, sachets, and novel formats with scale-up playbooks and validation templates. Contract sites move from toll manufacturing to brand-owning partners.",
    impact:
      "Rraynex teams stay on the floor through PPQ, ensuring quality metrics are met and market launch dates hold steady.",
    ctaLabel: "Talk FDF with Us",
    ctaLink: "/contact",
  },
];

const SUPPORT_THEMES = [
  {
    title: "Shared Process Intelligence",
    copy:
      "From coating parameters to compression force windows, we codify the lessons learned across our network and make them available to every partner site.",
  },
  {
    title: "Access to Markets",
    copy:
      "Commercial, regulatory, and pharmacovigilance teams help file dossiers, structure supply agreements, and unlock new geographies for qualified partners.",
  },
  {
    title: "Sustainable Investments",
    copy:
      "We reinvest in utilities, containment, and digital batch records at partner facilities so upgrades benefit the entire ecosystem, not just a single product.",
  },
];

export default function Ecosystem() {
  const seo = getPageSEO('ecosystem');
  
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = seo.title;
    }
  }, [seo.title]);

  return (
    <main className="ecosystem">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="ecosystem"
      />

      <Hero
              title="Uplifting the Ecosystem"
              subtitle="Pellets, granules, APIs, and finished dose formulations are more than product lines, they are stepping stones that help
            smaller manufacturers move up the value chain. Rraynex pairs its platform expertise with on-ground mentoring so the entire
            ecosystem rises together."
              bgImage={header}
              ptitle=" Explore Capabilities"
              plink="/products/categories"
              stitle="Partner With Rraynex"
              slink="/contact"
              overlayGradient="linear-gradient(to bottom right, rgba(0, 0, 0, 0.88), rgba(42, 42, 42, 0.43))"
      
            />

      <section className="ecosystem-intro">
        <div className="intro-card">
          <h2>How We Create Momentum</h2>
          <p>
            Every stage in the Rraynex value chain strengthens a different part of the ecosystem—from reliable intermediates to
            consumer-ready finished products. We embed quality systems, supply assurance, and commercial know-how so partners can focus
            on scaling responsibly.
          </p>
        </div>
      </section>

      <section className="value-chain">
        <h2 className="section-heading">From Pellets to Finished Dose Forms</h2>
        <div className="value-grid">
          {VALUE_CHAIN.map((stage) => (
            <article key={stage.id} className="value-card">
              <header>
                <span className="value-step">{stage.title}</span>
              </header>
              <p className="value-summary">{stage.summary}</p>
              <p className="value-impact">{stage.impact}</p>
              <div className="value-cta">
                <a className="btn btn-outline" href={stage.ctaLink}>
                  {stage.ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="support-grid">
        {SUPPORT_THEMES.map((theme) => (
          <article key={theme.title} className="support-card">
            <h3>{theme.title}</h3>
            <p>{theme.copy}</p>
          </article>
        ))}
      </section>

      <section className="journey-banner">
        <div className="journey-content">
          <h2>How We Elevate the Ecosystem Together</h2>
          <p>
            By walking alongside manufacturers at every maturity level—whether they are layering pellets today or validating their
            first finished dose form tomorrow—we keep capability, compliance, and commerce connected. The result is a resilient supply
            web that protects patient access and rewards every participant.
          </p>
          <div className="journey-actions">
            <a className="btn btn-primary" href="/contact">
              Start a Collaboration
            </a>
            <a className="btn btn-outline" href="/products">
              View Product Catalogue
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}