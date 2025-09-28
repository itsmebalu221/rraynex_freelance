import React, { useMemo, useState, useEffect } from "react";
import "./Manufacturing.css";
import GMP from "../Assets/GMP.png";
import ISO9001 from "../Assets/iso-9001.png";
import ISO14001 from "../Assets/iso-14001.jpg";
import WHO_GMP from "../Assets/who-gmp.png";

/* --- Data --- */

const BADGES = [
  { src: GMP, alt: "GMP" },
  { src: WHO_GMP, alt: "WHO-GMP" },
  { src: ISO9001, alt: "ISO 9001" },
  { src: ISO14001, alt: "ISO 14001" },
];

const GALLERY = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.jpg",
  "/assets/gallery/g4.jpg",
];

/* default equipment image (your uploaded handwritten photo path used as example) */
const DEFAULT_EQ_IMG = "/mnt/data/WhatsApp Image 2025-09-21 at 13.46.32_91590352.jpg";

const EQUIPMENT = [
  {
    id: "eq-fluid-bed-coater",
    title: "Fluid Bed Coater (for pellets)",
    desc:
      "Top/bottom coating of multi-particulates and pellets: enteric and sustained release coatings, film coatings and color coatings with precise weight-gain control.",
    meta: "Typical throughput: lab → pilot → production scales.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-coating-pan",
    title: "Coating Pan",
    desc:
      "Conventional pan coating for tablets and pellets. Supports sugar coating and film coating with automated spray and pan-speed control.",
    meta: "Used for mid-scale batch coating operations.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-fluid-bed-drier",
    title: "Fluid Bed Drier",
    desc:
      "Efficient drying of granules and pellets with controlled airflow and temperature for reproducible moisture profiles.",
    meta: "Integrated with PID controls for process repeatability.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-rapid-mix-granulator",
    title: "Rapid Mixing Granulator (2 ton capacity)",
    desc:
      "High-shear wet granulation for consistent granule size/density. Designed for medium-to-large production runs with configurable impeller/chopper.",
    meta: "Example batch capacity: 2 ton (configurable).",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-blender",
    title: "Blender for Pellets",
    desc:
      "Homogeneous blending of pellets and granules; multiple blender types (V, tumble) available depending on formulation needs.",
    meta: "Capacity: lab to production scale.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-hplc",
    title: "HPLC for Analysis",
    desc:
      "HPLC systems configured for potency, impurities and stability testing with autosamplers and appropriate detectors.",
    meta: "QC-critical instrument for release testing.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-dissolution",
    title: "Dissolution Apparatus",
    desc:
      "In-vitro dissolution testing for tablets, pellets and multiparticulates. Compliant with USP methods; paddle, basket or flow-through setups.",
    meta: "Used for development and batch release.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-qc-lab",
    title: "QC Laboratory",
    desc:
      "Microbiology, chemistry and physical testing labs supporting batch release, stability and method development with calibrated instruments.",
    meta: "Includes controlled environment and sample traceability.",
    img: DEFAULT_EQ_IMG
  },
  {
    id: "eq-hvac",
    title: "HVAC & Service Floor",
    desc:
      "Cleanroom HVAC with controlled airflow, pressure differentials and filtration. Service floors support utilities, material handling and segregated flows.",
    meta: "Designed to maintain GMP-compliant environmental conditions.",
    img: DEFAULT_EQ_IMG
  }
];

/* --- Facility details content (from your provided copy) --- */

const FACILITY_DETAILS = {
  pellets: {
    title: "Pellets, Granules and Mups",
    subtitle: "Facility I: Boisar, Tarapur MIDC",
    keyFeatures: [
      {
        title: "Capacity & Expansion",
        text:
          "Current available capacity is 40 MT/month with an additional 70 MT under expansion, targeted for completion by January 2025."
      },
      {
        title: "Regulatory Compliance",
        text: "Facility complies with WHO GMP, CIS, LATAM, and other ROW markets."
      },
      {
        title: "Market Focus",
        text: "Strong potential in Bangladesh, Pakistan, Russia, Mexico, Sri Lanka, Egypt, and Iran."
      },
      {
        title: "Facility Strengths",
        text:
          "Known for high-quality, system-oriented processes with end-to-end manufacturing (intermediates → API → pellets/granules in bulk), ensuring better cost control and quality assurance."
      },
      {
        title: "Leadership & Expertise",
        text:
          "Along with the Promoters, Mr. Nishit Gupta and Miss Raina D. Desai, the company is led by Mr. Milind Gadkari (44+ years in pellets & API; ex-Director Pellets, Pelletech Healthcare – EU GMP approved) and Mr. Mihir Patel (15+ years), ensuring robust sourcing, quality, and operations management."
      }
    ],
    closing:
      "100% auditable facility with full document support (DMF open and closed parts), VQM support, TSE/BSE/MSDS, and stability data."
  },
  api: {
    title: "API and Intermediaries",
    subtitle: "Facility II: Sykha | Gujarat",
    keyFeatures: [
      {
        title: "Facility & Capacity",
        text:
          "Equipped with 20 reactors (1 KL, 2 KL, 3 KL & 8 KL) including glass line reactors, SSR, GLR, plus a state-of-the-art QC lab and spacious infrastructure."
      },
      {
        title: "Regulatory Compliance",
        text: "Certified for WHO GMP, CIS, LATAM, and all other ROW markets."
      },
      {
        title: "Market Focus",
        text: "Strong potential in Bangladesh, Pakistan, Russia, Mexico, Sri Lanka, Egypt, and Iran."
      },
      {
        title: "Current Operations",
        text:
          "Brand-new facility with experienced team; licensed to supply Omeprazole API and intermediaries (Hydroxy, Chloro, Sulphite)."
      },
      {
        title: "R&D & Pipeline Targets",
        text:
          "Rabeprazole and Domperidone successful at lab scale; commercialization expected by March 2025. Future pipeline includes Itraconazole, Lansoprazole, and Esomeprazole."
      }
    ],
    closing: ""
  }
};

/* --- Component --- */

export default function Manufacturing() {
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    // page title + meta
    if (typeof document !== "undefined") {
      document.title = "Manufacturing Facilities | Rraynex";
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        "content",
        "Overview of Rraynex manufacturing facilities: WHO-GMP certified units for pellets, granules, APIs and packaging. DMF & technical support available."
      );
    }
  }, []);

  const stats = useMemo(
    () => [
      { n: "40k+", t: "Sq. ft. manufacturing space" },
      { n: "100+", t: "Product registrations" },
      { n: "500+", t: "Global shipments / month" },
      { n: "15+", t: "Years experience" }
    ],
    []
  );

  // function openFacility(f) {
  //   setSelectedFacility(f);
  //   document.body.style.overflow = "hidden";
  // }
  function closeFacility() {
    setSelectedFacility(null);
    document.body.style.overflow = "";
  }

  return (
    <div className="mfg-page" role="main">
      {/* HERO */}
      <header className="hero" role="banner" aria-label="Manufacturing hero">
        <div className="hero-inner">
          <h1 className="hero-title">Manufacturing Facilities</h1>
          <p className="hero-sub">
            WHO-GMP certified manufacturing units for pellets, granules, APIs and packaging — supported by in-house quality, stability and regulatory teams.
          </p>
          <div className="hero-ctas" role="group" aria-label="Hero actions">
            <a className="btn btn-primary" href="#facility-details">Facility Details</a>
            <a className="btn btn-outline" href="/assets/Rraynex_Corp_Profile.pdf" target="_blank" rel="noreferrer">Download Brochure</a>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Overview */}
        <section className="overview" aria-labelledby="overview-heading">
          <div className="map-card" role="img" aria-label="Manufacturing network map">
            {/* optional: replace with an SVG or image */}
            <div style={{ textAlign: "center", color: "var(--muted)" }}>
              Map / Global footprint placeholder
            </div>
          </div>

          <aside className="overview-side" aria-label="Facilities overview">
            <h3 id="overview-heading">Facilities & Capabilities</h3>
            <p>
              Our facilities meet international standards, with dedicated lines for multi-particulate manufacturing,
              API synthesis, and packaging — supported by robust QA/QC, stability programs and regulatory documentation.
            </p>

            <div className="badges" aria-hidden>
              {BADGES.map(b => (
                <div className="badge" key={b.alt}>
                  <img src={b.src} alt={b.alt} />
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* Facility details (replaces Key Manufacturing Units grid) */}
        <section id="facility-details" className="facility-details" aria-labelledby="facility-details-heading" style={{ marginTop: 28 }}>
          <h2 id="facility-details-heading" style={{ margin: "0 0 16px 0", color: "var(--navy)" }}>Facility Details</h2>

          <div className="fd-grid">
            {/* Left: Pellets/Granules */}
            <div className="fd-column">
              <h3 className="fd-title">{FACILITY_DETAILS.pellets.title}</h3>
              <div className="fd-subtitle">{FACILITY_DETAILS.pellets.subtitle}</div>

              <h4 style={{ marginTop: 12, marginBottom: 8 }}>Key Features:</h4>
              <ol className="fd-list">
                {FACILITY_DETAILS.pellets.keyFeatures.map((kf, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <strong>{kf.title}:</strong> {kf.text}
                  </li>
                ))}
              </ol>

              <p style={{ marginTop: 8, color: "#374151" }}>{FACILITY_DETAILS.pellets.closing}</p>
            </div>

            {/* Right: API & intermediaries */}
            <div className="fd-column">
              <h3 className="fd-title">{FACILITY_DETAILS.api.title}</h3>
              <div className="fd-subtitle">{FACILITY_DETAILS.api.subtitle}</div>

              <h4 style={{ marginTop: 12, marginBottom: 8 }}>Key Features:</h4>
              <ol className="fd-list">
                {FACILITY_DETAILS.api.keyFeatures.map((kf, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <strong>{kf.title}:</strong> {kf.text}
                  </li>
                ))}
              </ol>

              {FACILITY_DETAILS.api.closing && <p style={{ marginTop: 8, color: "#374151" }}>{FACILITY_DETAILS.api.closing}</p>}
            </div>
          </div>
        </section>

        {/* Equipment section */}
        <section className="equipment-section" aria-labelledby="equipment-heading" style={{ marginTop: 28 }}>
          <h3 id="equipment-heading" className="equipment-heading">Key Manufacturing Equipment</h3>
          <p className="equipment-intro">
            Our facilities are equipped with industrial-grade processing and analytical instruments to support pellets, granules, APIs and packaging.
          </p>

          {EQUIPMENT.map((eq, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div key={eq.id} className={`equipment-row ${reversed ? "reversed" : ""}`} role="group" aria-labelledby={`${eq.id}-title`}>
                <div className="equipment-media" aria-hidden>
                  <img src={eq.img} alt={eq.title + " image"} loading="lazy" onError={(e) => { e.currentTarget.src = "/assets/facilities/placeholder.jpg"; }} />
                </div>

                <div className="equipment-content">
                  <h4 id={`${eq.id}-title`} className="equipment-title">{eq.title}</h4>
                  <p className="equipment-desc">{eq.desc}</p>
                  <div className="equipment-meta">{eq.meta}</div>

                  <div className="equipment-actions" aria-hidden>
                    <a className="btn btn-outline" href="/contact" style={{ textDecoration: "none" }}>Contact Sales</a>
                    <a className="btn btn-primary" href={`mailto:manufacturing@rraynex.com?subject=${encodeURIComponent("Info request: " + eq.title)}`} style={{ textDecoration: "none" }}>Request Details</a>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Stats strip */}
        <section style={{ marginTop: 20 }}>
          <div className="stats-strip" role="list" aria-label="Manufacturing statistics">
            {stats.map(s => (
              <div className="stat" key={s.t} role="listitem">
                <div className="n">{s.n}</div>
                <div className="t">{s.t}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section style={{ marginTop: 22 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <h3 style={{ margin:0, color:"var(--navy)" }}>Gallery</h3>
            <a href="/assets/Rraynex_Corp_Profile.pdf" className="btn btn-outline" style={{ fontSize:14 }}>Download Brochure</a>
          </div>

          <div className="gallery" aria-hidden>
            {GALLERY.map((g, i) => (
              <img key={i} src={g} alt={`Gallery ${i+1}`} onError={(e)=> e.currentTarget.src="/assets/gallery/placeholder.jpg"} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: 26 }}>
          <div className="cta-card" role="region" aria-label="Contact for manufacturing">
            <div className="left">
              <div style={{ fontWeight:800, color:"var(--navy)" }}>Interested in manufacture or partnership?</div>
              <div style={{ color: "var(--muted)" }}>Request site tour, DMF, COA, or a custom quote — our regional teams will respond within 1-2 business days.</div>
            </div>

            <div className="right">
              <a className="btn btn-outline" href="/contact">Contact Sales</a>
              <a className="btn btn-primary" href="mailto:manufacturing@rraynex.com">Request Quote</a>
            </div>
          </div>
        </section>
      </div>

      {/* Facility details modal (kept from previous implementation if needed later) */}
      {selectedFacility && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={closeFacility}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <h3 id="modal-title" style={{ margin:0 }}>{selectedFacility.name}</h3>
              <button onClick={closeFacility} aria-label="Close" style={{ border:"none", background:"transparent", cursor:"pointer", fontSize:18 }}>✕</button>
            </div>

            <div style={{ marginTop:12, display:"grid", gridTemplateColumns:"1fr 320px", gap:12 }}>
              <div>
                <img src={selectedFacility.image} alt={selectedFacility.name} style={{ width:"100%", borderRadius:8 }} onError={(e)=> e.currentTarget.src="/assets/facilities/placeholder.jpg"} />
                <p style={{ marginTop:10, color:"#374151" }}>{selectedFacility.desc}</p>
                <ul style={{ marginTop:8 }}>
                  <li><strong>Location:</strong> {selectedFacility.location}</li>
                  <li><strong>Size:</strong> {selectedFacility.size}</li>
                  <li><strong>Capabilities:</strong> {selectedFacility.capabilities.join(", ")}</li>
                </ul>
              </div>

              <aside style={{ background:"#fbfbfb", padding:12, borderRadius:8 }}>
                <div style={{ fontWeight:800, color:"var(--navy)" }}>Request Documents</div>
                <div style={{ marginTop:10 }}>
                  <a className="btn btn-primary" href={`mailto:manufacturing@rraynex.com?subject=Request DMF for ${encodeURIComponent(selectedFacility.name)}`} style={{ display:"inline-block", marginBottom:8 }}>Request DMF</a>
                  <div><a className="btn btn-outline" href="/assets/Rraynex_Corp_Profile.pdf">Download profile</a></div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
