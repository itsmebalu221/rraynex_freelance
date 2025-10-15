import React, { useEffect, useState } from "react";
import "./aboutrray.css";
import GMP from "./GMP.png";
import WHO_GMP from "./who-gmp.png";
import EUGMP from "./eu-gmp.jpeg";
import ISO9001 from "./iso-9001.png";
import ISO14001 from "./iso-14001.jpg";
import ISO25001 from "./iso-25001.png";
import Halal from "./halal.jpg";
import Kosher from "./koshir.png";
import Hero from "../../Components/Hero/Hero";

/*
  Note:
  - Ensure these image imports exist in the same folder or update paths.
  - If Hero doesn't accept bgImage prop, passing it is harmless.
*/

export default function AboutUs() {
  const [badgeModal, setBadgeModal] = useState(null); // { img, label, blurb, pdf? }
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const GALLERY = [
    "/assets/facilities/fac1.jpg",
    "/assets/facilities/fac2.jpg",
    "/assets/facilities/fac3.jpg",
    "/assets/facilities/pack-line.jpg",
    "/assets/facilities/qc-lab.jpg",
    "/assets/facilities/stability.jpg",
  ];

  const CERTS = [
    { id: "who-gmp", img: WHO_GMP, label: "WHO-GMP", blurb: "WHO Good Manufacturing Practices certification — confirms adherence to international pharmaceutical manufacturing standards and regulatory expectations." },
    { id: "gmp", img: GMP, label: "GMP", blurb: "Domestic GMP certification — demonstrates documented, auditable manufacturing and quality systems." },
    { id: "eu-gmp", img: EUGMP, label: "EU-GMP (targeted)", blurb: "European GMP — target program to enable supply to regulated EU markets with additional control and documentation." },
    { id: "iso9001", img: ISO9001, label: "ISO 9001", blurb: "ISO 9001 — Quality Management System emphasizing process consistency and continual improvement." },
    { id: "iso14001", img: ISO14001, label: "ISO 14001", blurb: "ISO 14001 — Environmental Management System to reduce environmental footprint and manage compliance." },
    { id: "iso45001", img: ISO25001, label: "ISO 45001", blurb: "ISO 45001 — Occupational health & safety standard ensuring safe workplaces." },
    { id: "halal", img: Halal, label: "Halal", blurb: "Halal certification — export-ready compliance for markets requiring religious dietary standards." },
    { id: "kosher", img: Kosher, label: "Kosher", blurb: "Kosher certification — catering to kosher market requirements where applicable." },
  ];

  // Milestones: expanded professional content
  const MILESTONES = [
    {
      year: "2021",
      title: "Company foundation & quality-first build",
      text:
        "Founded with a clear mission to make high-quality medicines accessible, Rraynex invested early in laboratory infrastructure, quality management systems and leadership experienced in regulatory affairs. These investments established a controlled, auditable baseline that underpins our current GMP operations and regulatory engagements.",
    },
    {
      year: "2023",
      title: "Full vertical integration — intermediates to finished forms",
      text:
        "Rraynex completed vertical integration across intermediates, API synthesis and multi-particulate finished-dosage manufacturing. This reduced handoffs, improved traceability, and allowed tighter process control — materially improving content uniformity, dissolution reproducibility, and yield across product families.",
    },
    {
      year: "2024",
      title: "Pellet scale-up & GMP unit commissioning",
      text:
        "Commissioned a dedicated GMP production unit for pellets and granules. Investments included process analytical technologies (PAT), automated coating and validated drying processes — reducing batch-to-batch variability and raising first-pass yields for multiparticulate products.",
    },
    {
      year: "2025",
      title: "WHO-GMP certification & validated commercial capacity",
      text:
        "Achieved WHO-GMP facility certification and validated commercial capacity: 125 MT/month for pellets and 30 MT/month for granules. The company expanded registered product offerings and published stability programs and DMF-ready summaries to support global filing and regulatory confidence.",
    },
    {
      year: "2026",
      title: "Global recognition & continued growth",
      text:
        "Rraynex earned international recognition — ISO 9001, ISO 14001 and ISO 45001 — and featured in global exhibitions and industry press for rapid growth. The company surpassed 127 registered product dossiers, maintained robust stability data, and set strategic targets for further capacity and regulatory approvals.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const targets = Array.from(document.querySelectorAll(".animate-on-scroll"));
    if (!targets.length) return;

    const revealAll = () => targets.forEach((t) => t.classList.add("animate-in"));

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((target) => observer.observe(target));

    const failSafe = window.setTimeout(revealAll, 2000);

    return () => {
      window.clearTimeout(failSafe);
      observer.disconnect();
    };
  }, []);

  // simple image fallback
  function imgFallback(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/placeholder.jpg";
  }

  // open badge modal
  function openBadge(b) {
    setBadgeModal(b);
    document.body.style.overflow = "hidden";
  }
  function closeBadge() {
    setBadgeModal(null);
    document.body.style.overflow = "";
  }

  // lightbox handlers
  function openLightbox(i) {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  // keyboard handling for modal & lightbox
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        closeBadge();
        closeLightbox();
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % GALLERY.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <main className="about" aria-labelledby="about-heading">
      {/* HERO */}
      <Hero
        title="About Us"
        subtitle="We are a healthcare company focused on delivering innovative and accessible solutions with quality at the core — partnering globally to build a reliable, future-ready ecosystem."
        plink="#products"
        ptitle="Explore Products"
        slink="/assets/Rraynex_Corp_Profile.pdf"
        stitle="Download Brochure"
        bgImage="https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Quick stats */}
      <section className="about-stats animate-on-scroll" aria-hidden="false">
        <div className="stat" style={{ animationDelay: "0.1s" }}>
          <div className="stat-num">58+</div>
          <div className="stat-label">Countries served</div>
        </div>
        <div className="stat" style={{ animationDelay: "0.2s" }}>
          <div className="stat-num">125 MT</div>
          <div className="stat-label">Pellet capacity / month</div>
        </div>
        <div className="stat" style={{ animationDelay: "0.3s" }}>
          <div className="stat-num">127+</div>
          <div className="stat-label">Registered products</div>
        </div>
      </section>

      {/* Company brief with image */}
      <section className="about-panels animate-on-scroll" aria-labelledby="company-brief">
        <article className="panel" style={{ animationDelay: "0.1s" }}>
          <h3 className="panel-title" id="company-brief">Who we are</h3>
          <p className="panel-text">
            Rraynex is an integrated pharmaceutical manufacturer combining API synthesis,
            intermediates and multi-particulate finished-dosage production under robust quality systems.
            Since our founding, we have emphasised regulatory readiness, process validation and scientific
            rigor — enabling partners to move efficiently from development to commercial supply.
          </p>

          <p className="panel-text" style={{ marginTop: 12 }}>
            Our capabilities include formulation development, pilot-to-commercial scale manufacturing,
            stability programs and dossier support (DMF/COA). By controlling critical process steps within
            the same organisation, we reduce variability, improve traceability and accelerate global registrations.
          </p>
        </article>

        <article className="panel" style={{ animationDelay: "0.2s" }}>
          <h3 className="panel-title">What we have achieved</h3>
          <p className="panel-text">
            In a short timeline, we have scaled production, expanded our registered portfolio and implemented
            international quality standards. Key milestones include vertical integration (2023), pellet GMP unit
            commissioning (2024), and WHO-GMP certification with validated capacities (2025).
          </p>

          <p className="panel-text" style={{ marginTop: 12 }}>
            We deliver targeted technical support — stability datasets, validated methods and DMF-ready summaries —
            so customers can rely on documented product performance across diverse markets.
          </p>
        </article>
      </section>

      {/* Certifications & pillars */}
      <section className="about-pills animate-on-scroll" aria-labelledby="certs-heading">
        <h2 id="certs-heading" className="section-heading">Regulatory Certifications</h2>
        <div className="section-sub">
          100% auditable facility with full document support — DMF (where applicable), stability programs,
          supplier qualification and comprehensive QA/QC practices.
        </div>

        <div className="cert-top">
          <div className="cert-copy" role="region" aria-label="Certifications summary">
            <ul aria-live="polite">
              <li>Completed vertical integration across Intermediates → API → Pellets (2023)</li>
              <li>Commissioned GMP pellet manufacturing and packaging lines (2024)</li>
              <li>WHO-GMP certification and validated capacity (125 MT/month pellets; 30 MT/month granules, 2025)</li>
              <li>ISO 9001, ISO 14001 and ISO 45001 certifications (recognized globally)</li>
              <li>Product portfolio: 127+ registered products with stability data and dossier support</li>
            </ul>

            <p>
              Every certification reinforces system maturity — from environmental management to occupational safety.
              We maintain auditable batch records, validated analytical methods and a CAPA-based improvement cycle that
              improves assay precision, dissolution reproducibility and long-term stability of marketed products.
            </p>
          </div>

          <div className="cert-badges" role="img" aria-roledescription="certification badges" aria-label="Certifications">
            <div style={{ fontWeight: 700, color: "var(--navy, #0b304f)" }}>Our Certifications</div>
            <div className="badge-grid" aria-hidden>
              {CERTS.map((c) => (
                <button
                  key={c.id}
                  className="cert-badge animate-on-scroll"
                  onClick={() => openBadge(c)}
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  title={`${c.label} — click for details`}
                >
                  <img src={c.img} alt={c.label} onError={imgFallback} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="pill-grid" style={{ marginTop: 18 }}>
          <div className="pill">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Quality by design</h4>
              <p className="pill-text">
                We embed quality into development and manufacturing — mapping critical parameters, controlling inputs,
                and validating outputs to minimise variability and ensure predictable product performance.
              </p>
            </div>
          </div>

          <div className="pill">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Regulatory readiness</h4>
              <p className="pill-text">
                DMF-ready dossiers, stability data packages and documented change control enable faster registration
                and reduce review cycles for customers targeting global markets.
              </p>
            </div>
          </div>

          <div className="pill">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Partnership approach</h4>
              <p className="pill-text">
                We collaborate closely with customers, offering technical trials, regulatory support and tailored packaging
                solutions to meet market-specific requirements.
              </p>
            </div>
          </div>

          <div className="pill">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Sustainability & safety</h4>
              <p className="pill-text">
                Environmental management and occupational safety are integral — from solvent recovery to energy efficiency
                and worker health programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="about-timeline animate-on-scroll" aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="section-heading">Milestones & Growth</h2>

        <div className="timeline" aria-hidden="false">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="node animate-on-scroll" style={{ animationDelay: `${0.08 * (i + 1)}s` }}>
              <div className="node-dot" />
              <div className="node-card">
                <h5>{m.year} — {m.title}</h5>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="about-timeline about-gallery animate-on-scroll" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="section-heading">Facility Gallery</h2>
        <p style={{ maxWidth: 900, margin: "8px auto 12px", textAlign: "center", color: "var(--muted)" }}>
          Selected photos from our production floors, analytical labs and packaging lines — illustrating how processes and quality controls operate together.
        </p>

        <div className="timeline" style={{ paddingLeft: 0 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {GALLERY.map((src, idx) => (
              <button
                key={src}
                className="node-card animate-on-scroll"
                onClick={() => openLightbox(idx)}
                style={{ width: 240, padding: 0, border: "none", cursor: "pointer" }}
                aria-label={`Open gallery image ${idx + 1}`}
              >
                <img src={src} alt={`Facility ${idx + 1}`} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} onError={imgFallback} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="about-cta-band animate-on-scroll" aria-hidden="false">
        <div className="cta-card">
          <h3>Let's build a healthier future together</h3>
          <p>
            Interested in manufacturing partnerships, regulatory support, or product supply? Contact our teams for audit requests, DMF access, or custom commercial terms.
          </p>
          <div style={{ marginTop: 12 }} className="about-cta">
            <button className="btn btn-primary" onClick={() => window.location.assign("/contact")}>Partner with us</button>
            <a className="btn btn-outline" href="/assets/Rraynex_Corp_Profile.pdf" target="_blank" rel="noreferrer">Download Profile</a>
          </div>
        </div>
      </section>

      {/* Badge modal */}
      {badgeModal && (
        <div className="ql-modal-backdrop" role="dialog" aria-modal="true" onClick={closeBadge}>
          <div className="ql-modal" onClick={(e) => e.stopPropagation()}>
            <header className="ql-modal-head">
              <h3>{badgeModal.label}</h3>
              <button className="ql-modal-close" onClick={closeBadge} aria-label="Close">✕</button>
            </header>

            <div className="ql-modal-body">
              <img src={badgeModal.img} alt={badgeModal.label} onError={imgFallback} />
              <div className="ql-modal-text">
                <p style={{ textAlign: "justify" }}>{badgeModal.blurb}</p>
                <p style={{ marginTop: 12, color: "#444" }}>
                  For certificate access, please contact quality@rraynex.com and reference the certification.
                </p>
              </div>
            </div>

            <footer className="ql-modal-foot">
              <button className="btn btn-outline" onClick={closeBadge}>Close</button>
            </footer>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="ql-lightbox-backdrop" role="dialog" aria-modal="true" onClick={closeLightbox}>
          <div className="ql-lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="ql-lightbox-btn prev" onClick={() => setLightboxIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)} aria-label="Previous image">‹</button>
            <img src={GALLERY[lightboxIndex]} alt={`Facility image ${lightboxIndex + 1}`} onError={imgFallback} />
            <button className="ql-lightbox-btn next" onClick={() => setLightboxIndex((i) => (i + 1) % GALLERY.length)} aria-label="Next image">›</button>
            <button className="ql-lightbox-close" onClick={closeLightbox} aria-label="Close viewer">✕</button>
          </div>
        </div>
      )}
    </main>
  );
}
