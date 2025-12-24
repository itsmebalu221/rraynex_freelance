import React, { useEffect, useState } from "react";
import "./aboutrray.css";
import Hero from "../../Components/Hero/Hero";
import SEO from "../../seo/SEO";
import { getPageSEO } from "../../seo/seoConfig";

import one from "../Milestones/1.jpg";
import two from "../Milestones/2.jpg";
import three from "../Milestones/3.jpg";
import four from "../Milestones/4.jpg";
import five from "../Milestones/5.jpg";
import six from "../Milestones/6.jpg";
import seven from "../Milestones/7.jpg";
import eight from "../Milestones/8.jpg";
import nine from "../Milestones/9.jpg";
import ten from "../Milestones/10.jpg";
import eleven from "../Milestones/11.jpg";
import twelve from "../Milestones/12.jpg";
import thirteen from "../Milestones/13.jpg";
import fourteen from "../Milestones/14.jpg";

import header from "./header.jpg";

/*
  Note:
  - Ensure these image imports exist in the same folder or update paths.
  - If Hero doesn't accept bgImage prop, passing it is harmless.
*/

export default function AboutUs() {
  const seo = getPageSEO('aboutUs');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const GALLERY = [
    one, two, three, four, five, six
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
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="aboutUs"
      />
      {/* HERO */}
      <Hero
        title="About Us"
        subtitle="We are a healthcare company focused on delivering innovative and accessible solutions with quality at the core — partnering globally to build a reliable, future-ready ecosystem."
        plink="#products"
        ptitle="Explore Products"
        slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
        stitle="Download Brochure"
    bgImage={header}
        overlayGradient="linear-gradient(to bottom right, rgba(0, 0, 0, 0.72), rgba(255,255,255,0.55))"
        tone="dark"
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

      {/* CTA band
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
      </section> */}

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
