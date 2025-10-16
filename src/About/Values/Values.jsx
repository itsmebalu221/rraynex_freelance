import React, { useEffect, useRef, useState } from "react";
import "./Values.css";
import { FaIndustry, FaBoxes, FaClipboardList } from "react-icons/fa";
import PharmaGranulesHero from "../../Components/HEROSECTION/HeroSection";
/* Replace these with actual local imports or public URLs */
import bgVision from "../../Home/bg1.jpg";
import visionImg from "../../Home/bg1.jpg";
import imgMission from "../../Home/bg1.jpg";
import imgPromise from "../../Home/bg1.jpg";
import Hero from "../../Components/Hero/Hero";
/* Badge images (replace with your assets) */
import GMP from "../../Assets/GMP.png";
import WHO_GMP from "../../Assets/who-gmp.png";
import ISO9001 from "../../Assets/iso-9001.png";
import ISO14001 from "../../Assets/iso-14001.jpg";
import ISO45001 from "../../Assets/iso-25001.png";
import header from "./header.jpg"
import vision from "./vision.jpg";
import mission from "./mission.jpg";
import promise from "./promise.jpg";

/* icons */
import {
  FaHeartbeat,
  FaMicroscope,
  FaHandshake,
  FaGlobe,
  FaLeaf,
  FaMedal,
} from "react-icons/fa";

/* --- Certificate meta (badge -> pdf) --- 
   Replace the pdf paths with your real certificate files */
const CERT_DATA = [
  {
    key: "gmp",
    title: "GMP Certified",
    img: GMP,
    desc:
      "Good Manufacturing Practice (GMP) ensures consistent production and quality control — minimizing contamination and ensuring product safety.",
    pdf: "/assets/certs/gmp-certificate.pdf",
  },
  {
    key: "who-gmp",
    title: "WHO-GMP Certified",
    img: WHO_GMP,
    desc:
      "WHO-GMP is the international standard confirming adherence to global pharmaceutical manufacturing practices.",
    pdf: "/assets/certs/who-gmp-certificate.pdf",
  },
  {
    key: "iso9001",
    title: "ISO 9001",
    img: ISO9001,
    desc:
      "ISO 9001 is a quality management standard focused on consistent processes and continuous improvement.",
    pdf: "/assets/certs/iso9001-certificate.pdf",
  },
  {
    key: "iso14001",
    title: "ISO 14001",
    img: ISO14001,
    desc:
      "ISO 14001 defines the requirements for an environmental management system to reduce environmental impact.",
    pdf: "/assets/certs/iso14001-certificate.pdf",
  },
  {
    key: "iso45001",
    title: "ISO 45001",
    img: ISO45001,
    desc:
      "ISO 45001 is the international standard for occupational health & safety management systems.",
    pdf: "/assets/certs/iso45001-certificate.pdf",
  },
];

/* Utility id */
const uid = (s) => `vv-${s.replace(/\s+/g, "-").toLowerCase()}`;

export default function VisionValues() {
  const rootRef = useRef(null);
  const [modal, setModal] = useState({ open: false, cert: null });
  const [counters, setCounters] = useState({ pellets: 0, granules: 0, products: 0 });
  const countersRef = useRef(null);
  const countersStarted = useRef(false);

  useEffect(() => {
    // IntersectionObserver for reveal animations (scoped)
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = root.querySelectorAll(
      ".vision-card, .vv-card, .vv-image-split, .vv-cert-badge, .vv-stats-strip"
    );
    targets.forEach((t) => {
      if (!prefersReduced) observer.observe(t);
      else t.classList.add("in-view");
    });

    return () => observer.disconnect();
  }, []);

  // Counter animation when the strip is visible
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = countersRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onVisible = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted.current) {
          countersStarted.current = true;
          if (prefersReduced) {
            setCounters({ pellets: 125, granules: 30, products: 127 });
          } else {
            animateCounters({ pellets: 125, granules: 30, products: 127 }, 1200);
          }
          obs.unobserve(entry.target);
        }
      });
    };

    const obs = new IntersectionObserver(onVisible, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animateCounters(targets, duration = 1000) {
    const start = performance.now();
    const from = { pellets: 0, granules: 0, products: 0 };

    function step(ts) {
      const t = Math.min((ts - start) / duration, 1);
      // easeOutQuad
      const ease = 1 - (1 - t) * (1 - t);
      setCounters({
        pellets: Math.round(from.pellets + (targets.pellets - from.pellets) * ease),
        granules: Math.round(from.granules + (targets.granules - from.granules) * ease),
        products: Math.round(from.products + (targets.products - from.products) * ease),
      });
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // open modal for a cert
  function openCert(certKey) {
    const cert = CERT_DATA.find((c) => c.key === certKey);
    if (!cert) return;
    setModal({ open: true, cert });
    // lock scroll
    document.body.style.overflow = "hidden";
  }

  // close modal
  function closeModal() {
    setModal({ open: false, cert: null });
    document.body.style.overflow = "";
  }

  // keyboard: close modal on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && modal.open) closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal.open]);

  // fallback for broken images
  function imgFallback(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/placeholder.jpg";
  }

  return (
    <section className="vision-values" aria-labelledby="vision-values-title" ref={rootRef}>
      {/* <PharmaGranulesHero
  title="Vision that Inspires, Values that Endure"
  subtitle="Redefining pharmaceutical excellence through purpose, partnership, and continuous innovation."
  bgImage="https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=1920"
/> */}
<Hero
  title="Vision that Inspires, Values that Endure"
  subtitle="Redefining pharmaceutical excellence through purpose, partnership, and continuous innovation."
  bgImage={header}
  ptitle="Explore Our Products"
  plink="/products"
  stitle="Download Brochure"
  slink="/assets/Rraynex_Brochure.pdf"
/>


      <div className="vv-container">
        {/* Key facts strip (counters) */}
        {/* Professional Key Facts strip (replace previous vv-stats-strip) */}
<div className="vv-stats-strip pro" ref={countersRef} aria-label="Key manufacturing facts">
  <div className="vv-stat-card" role="region" aria-labelledby="stat-pellets">
    <div className="stat-top">
      <div className="stat-icon" aria-hidden><FaIndustry /></div>
      <div className="stat-number" id="stat-pellets" aria-live="polite">
        {new Intl.NumberFormat("en-IN").format(counters.pellets)}
      </div>
    </div>
    <div className="stat-unit">Metric Tons / month</div>
    <div className="stat-title">Pellet production capacity</div>
    <div className="stat-note">Target validated capacity across pellet lines (production & coating).</div>
  </div>

  <div className="vv-stat-card" role="region" aria-labelledby="stat-granules">
    <div className="stat-top">
      <div className="stat-icon" aria-hidden><FaClipboardList /></div>
      <div className="stat-number" id="stat-granules" aria-live="polite">
        {new Intl.NumberFormat("en-IN").format(counters.granules)}
      </div>
    </div>
    <div className="stat-unit">Metric Tons / month</div>
    <div className="stat-title">Granules throughput</div>
    <div className="stat-note">Controlled-drying and granulation delivering consistent particle profile.</div>
  </div>

  <div className="vv-stat-card" role="region" aria-labelledby="stat-products">
    <div className="stat-top">
      <div className="stat-icon" aria-hidden><FaBoxes /></div>
      <div className="stat-number" id="stat-products" aria-live="polite">
        {new Intl.NumberFormat("en-IN").format(counters.products)}+
      </div>
    </div>
    <div className="stat-unit">Registered</div>
    <div className="stat-title">Products in portfolio</div>
    <div className="stat-note">Products supported with DMF / COA and long-term stability datasets.</div>
  </div>
</div>


        {/* Vision card — split with image */}
        <article className="vision-card vision-card--split" aria-labelledby="vv-vision-heading">
          <div className="vision-card__text">
            <h2 id="vv-vision-heading">Our Vision</h2>

            <p>
              To be a globally recognised partner in healthcare — delivering trusted, high-quality medicines
              that improve outcomes and expand access. We envision a future where safe and effective therapies
              are available at scale across geographies and care settings.
            </p>

            <p>
              Our integrated manufacturing model and validated quality systems allow us to move from concept to
              commercial supply with reliability. Combining API synthesis, intermediates, and finished-dose
              manufacturing under unified control reduces variability and speeds qualification — benefitting
              patients and partners.
            </p>

            <p>
              Success is measured by product performance and societal impact — improved adherence, predictable
              therapeutic effect, and supply resilience. These outcomes guide every strategic decision we make.
            </p>
          </div>

          <figure className="vision-card__media">
            <img
              src={vision}
              alt="Integrated R&D and manufacturing at Rraynex"
              loading="lazy"
              onError={imgFallback}
            />
            <figcaption className="vision-caption">Integrated R&D and manufacturing — quality by design.</figcaption>
          </figure>
        </article>

        {/* Mission split */}
        <section className="vv-image-split" aria-labelledby="vv-mission-heading">
          <img src={mission} alt="Innovation lab" loading="lazy" onError={imgFallback} />
          <div className="vv-image-split-content">
            <h2 id="vv-mission-heading">Our Mission</h2>

            <p>
              To transform scientific insight into reliable medicines by combining research excellence with
              operational discipline. We invest in formulation science, process analytical technologies and
              validated manufacturing to meet global standards.
            </p>

            <p>
              We partner with regulators, academic institutions and commercial teams so every molecule
              progresses with documented controls, stability data and regulatory-ready dossiers — lowering
              time-to-market and risk for our customers.
            </p>
          </div>
        </section>

        {/* Values */}
        <h2 className="section-heading">Our Core Values</h2>

        <div className="vv-grid" role="list">
          <article className="vv-card" tabIndex={0} role="listitem" aria-labelledby="val-patient">
            <FaHeartbeat className="vv-icon" aria-hidden />
            <h4 id="val-patient">Patient Commitment</h4>
            <p>
              Patients are our primary stakeholders. We design quality into products and maintain
              post-market surveillance and pharmacovigilance to ensure ongoing safety and efficacy.
            </p>
          </article>

          <article className="vv-card" tabIndex={0} role="listitem" aria-labelledby="val-innovation">
            <FaMicroscope className="vv-icon" aria-hidden />
            <h4 id="val-innovation">Research & Innovation</h4>
            <p>
              We pursue outcome-driven research: formulation improvements, controlled-release technologies
              and scalable API routes that create measurable clinical and manufacturing benefits.
            </p>
          </article>

          <article className="vv-card" tabIndex={0} role="listitem" aria-labelledby="val-integrity">
            <FaHandshake className="vv-icon" aria-hidden />
            <h4 id="val-integrity">Integrity & Transparency</h4>
            <p>
              Ethical conduct and traceable documentation underpin our relationships. We maintain transparent
              batch records, supplier qualification and robust change-control practices.
            </p>
          </article>

          <article className="vv-card" tabIndex={0} role="listitem" aria-labelledby="val-global">
            <FaGlobe className="vv-icon" aria-hidden />
            <h4 id="val-global">Global Collaboration</h4>
            <p>
              Operating in 58+ countries, we collaborate with regulatory partners and distributors to harmonise
              dossiers and accelerate market access.
            </p>
          </article>

          <article className="vv-card" tabIndex={0} role="listitem" aria-labelledby="val-sustain">
            <FaLeaf className="vv-icon" aria-hidden />
            <h4 id="val-sustain">Sustainability</h4>
            <p>
              From solvent recovery to energy efficiency, we pursue environmental stewardship as a core
              operational priority aligned with ISO 14001 principles.
            </p>
          </article>

          <article className="vv-card" tabIndex={0} role="listitem" aria-labelledby="val-quality">
            <FaMedal className="vv-icon" aria-hidden />
            <h4 id="val-quality">Quality & Continuous Improvement</h4>
            <p>
              Validated processes, comprehensive stability programs and a culture of corrective action ensure
              improved assay precision, reproducible dissolution and tighter impurity control year-on-year.
            </p>
          </article>
        </div>

        {/* Promise reversed split */}
        <section className="vv-image-split reversed" aria-labelledby="vv-promise-heading">
          <div className="vv-image-split-content">
            <h2 id="vv-promise-heading">Our Promise</h2>

            <p>
              We promise to uphold the highest ethical standards, maintain technical transparency and provide
              responsive regulatory support — including timely DMFs, COAs and validated stability reports — to
              our partners worldwide.
            </p>

            <p>
              Whether serving regulated markets or emerging regions, our facilities and teams are structured to
              deliver scalable manufacturing and tailored technical assistance.
            </p>
          </div>

          <img src={promise} alt="Team collaboration and quality" loading="lazy" onError={imgFallback} />
        </section>

        {/* Certifications */}
        <section className="vv-cert" aria-labelledby="certifications-title">
          <h2 id="certifications-title" className="section-heading">Certifications & Global Recognitions</h2>

          <p className="vv-cert-desc">
            Rraynex’s certifications demonstrate our commitment to quality, safety and sustainable operations.
            These recognitions describe how our systems and processes are aligned with global expectations and provide
            confidence to regulators, customers and patients.
          </p>

          <div className="vv-cert-grid" role="list" aria-label="certifications">
            {CERT_DATA.map((c) => (
              <article
                key={c.key}
                className="vv-cert-badge"
                role="listitem"
                tabIndex={0}
                aria-describedby={uid(c.key)}
                onClick={() => openCert(c.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCert(c.key);
                  }
                }}
                title={`${c.title} — click to view details`}
              >
                <img src={c.img} alt={`${c.title} logo`} loading="lazy" onError={imgFallback} />
                <span>{c.title}</span>
                
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Certificate modal */}
      {modal.open && modal.cert && (
        <div
          className="vv-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vv-modal-title"
          onClick={closeModal}
        >
          <div
            className="vv-modal"
            onClick={(e) => e.stopPropagation()}
            role="document"
            tabIndex={-1}
          >
            <header className="vv-modal-header">
              <h3 id="vv-modal-title">{modal.cert.title}</h3>
              <button
                className="vv-modal-close"
                aria-label="Close certificate dialog"
                onClick={closeModal}
              >
                ✕
              </button>
            </header>

            <div className="vv-modal-body">
              <img
                src={modal.cert.img}
                alt={`${modal.cert.title} emblem`}
                onError={imgFallback}
              />
              <p style={{ textAlign: "justify" }}>{modal.cert.desc}</p>
            </div>

            <footer className="vv-modal-footer">
              
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}
