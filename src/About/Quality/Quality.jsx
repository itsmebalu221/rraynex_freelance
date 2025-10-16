import React, { useEffect, useRef, useState } from "react";
import PharmaGranulesHero from "../../Components/HEROSECTION/HeroSection";
import {
  FaCheckCircle,
  FaAward,
  FaMicroscope,
  FaFilePdf,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaIndustry,
  FaFlask,
  FaBoxOpen,
  FaProjectDiagram,
  FaHandsHelping,
} from "react-icons/fa";
import "./quality.css";
import Hero from "../../Components/Hero/Hero";

/* === Replace these imports with your real assets === */
import WHO_GMP from "../../Assets/who-gmp.png";
import GMP from "../../Assets/GMP.png";
import ISO9001 from "../../Assets/iso-9001.png";
import ISO14001 from "../../Assets/iso-14001.jpg";
import ISO45001 from "../../Assets/iso-25001.png";

/* gallery / hero examples (replace with real file imports or public URLs) */
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

/* ==================== Data ==================== */

const BADGES = [
  {
    id: "who-gmp",
    label: "WHO-GMP",
    img: WHO_GMP,
    pdf: "/assets/certs/who-gmp.pdf",
    blurb:
      "WHO Good Manufacturing Practices — international benchmark for pharmaceutical manufacturing controls and contamination prevention.",
  },
  {
    id: "gmp",
    label: "GMP",
    img: GMP,
    pdf: "/assets/certs/gmp.pdf",
    blurb:
      "Domestic GMP registration — demonstrating validated processes, hygiene controls and documented quality systems.",
  },
  {
    id: "iso9001",
    label: "ISO 9001",
    img: ISO9001,
    pdf: "/assets/certs/iso9001.pdf",
    blurb:
      "ISO 9001 — structured quality management system focused on consistency, customer focus and continual improvement.",
  },
  {
    id: "iso14001",
    label: "ISO 14001",
    img: ISO14001,
    pdf: "/assets/certs/iso14001.pdf",
    blurb:
      "ISO 14001 — demonstrates commitment to environmental management and sustainable operations.",
  },
  {
    id: "iso45001",
    label: "ISO 45001",
    img: ISO45001,
    pdf: "/assets/certs/iso45001.pdf",
    blurb:
      "ISO 45001 — international standard for occupational health and safety systems and workforce protection.",
  },
];

const GALLERY = [
  one, three, four, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen,
];

const SYSTEMS = [
  {
    id: "analytical",
    icon: <FaFlask />,
    title: "Analytical Excellence",
    lead:
      "Validated HPLC, dissolution, spectroscopy and microbiology labs ensure precise assay, impurity and stability control.",
    details:
      "Method validation follows ICH Q2(R1) with system suitability, calibration records and inter-lab proficiency testing to maintain reproducible results.",
    metric: "Validated methods: 120+",
  },
  {
    id: "process",
    icon: <FaIndustry />,
    title: "Process Validation & PAT",
    lead:
      "Process validation and PAT (NIR, in-line moisture, automated coating control) reduce variability and stabilize performance.",
    details:
      "We use QbD to identify critical process parameters and control strategies ensuring reproducible dissolution and content uniformity.",
    metric: "PAT instruments: 8",
  },
  {
    id: "stability",
    icon: <FaCheckCircle />,
    title: "Stability & Regulatory Support",
    lead:
      "Climate-controlled stability chambers and DMF-ready data packages to support international filings and lifecycle management.",
    details:
      "Protocols include ICH conditions and forced degradation studies to support shelf-life claims and regulatory review.",
    metric: "Chambers: 10",
  },
  {
    id: "supply",
    icon: <FaBoxOpen />,
    title: "Supplier Quality & Traceability",
    lead:
      "Rigorous supplier qualification, incoming testing and vendor audits reduce raw material variability and supply risks.",
    details:
      "Risk-based qualification and periodic audits secure material quality for consistent manufacturing outcomes.",
    metric: "Vendors qualified: 180+",
  },
  {
    id: "packaging",
    icon: <FaProjectDiagram />,
    title: "Packaging & Serialization",
    lead:
      "Primary and secondary packaging lines with serialization and tamper-evident options for regulated markets.",
    details:
      "Batch-level traceability and serialization support anti-counterfeiting and regulatory compliance across geographies.",
    metric: "Lines: 6",
  },
  {
    id: "people",
    icon: <FaHandsHelping />,
    title: "Training & Competency",
    lead:
      "Role-based training, technical assessments and continuous learning keep teams qualified for critical tasks.",
    details:
      "Documented training records, competency matrices and periodic reassessments support audit readiness.",
    metric: "Trained staff: 420+",
  },
];

const COMMITMENTS = [
  {
    id: "qm",
    title: "Quality Management",
    img: four,
    icon: <FaMicroscope />,
    paragraphs: [
      "Our QMS aligns with ICH and WHO principles — controlled documentation, electronic change control and CAPA cycles that deliver regulator-ready outcomes.",
      "We maintain calibrated instrumentation, validated methods and documented batch records to ensure reproducible production and testing.",
    ],
  },
  {
    id: "ci",
    title: "Continuous Improvement",
    img: two,
    icon: <FaCheckCircle />,
    paragraphs: [
      "We use PAT, SPC and digital batch records to reduce process variability and improve first-pass yield.",
      "Every change request follows root-cause investigation and validation to confirm sustained improvements in product performance.",
    ],
  },
  {
    id: "rt",
    title: "Recognition & Trust",
    img: three,
    icon: <FaAward />,
    paragraphs: [
      "WHO-GMP, ISO recognitions and third-party audits evidence our operational maturity and export readiness.",
      "We provide DMFs, COAs and stability summaries to partners and regulators, supporting dossier submission and lifecycle management.",
    ],
  },
];

/* ==================== Component ==================== */

export default function QualityPage() {
  const rootRef = useRef(null);
  const [certModal, setCertModal] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    // keyboard handlers and scroll lock handled elsewhere
    function onKey(e) {
      if (e.key === "Escape") {
        setCertModal(null);
        setLightboxIndex(null);
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft")
          setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  // reveal animations
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      root.querySelectorAll(".ql-card, .ql-thumb, .ql-badge, .ql-sys-card").forEach((el) => el.classList.add("in-view"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = root.querySelectorAll(".ql-card, .ql-thumb, .ql-badge, .ql-sys-card");
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  function openCert(b) {
    setCertModal(b);
    document.body.style.overflow = "hidden";
  }
  function closeCert() {
    setCertModal(null);
    document.body.style.overflow = "";
  }

  function openLightbox(i) {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  function imgFallback(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/placeholder.jpg";
  }

  return (
    <main className="quality" ref={rootRef}>
      
      <Hero
        title="Pioneering Quality, Powering Global Trust"
        subtitle="Precision in every process — delivering scientifically assured, globally compliant healthcare solutions."
  bgImage="https://images.pexels.com/photos/3735762/pexels-photo-3735762.jpeg?auto=compress&cs=tinysrgb&w=1920"
        ptitle="Explore Our Products"
        plink="/products"
        stitle="Download Brochure"
        slink="/assets/Rraynex_Brochure.pdf"
      />

      <section className="ql-container" aria-labelledby="quality-heading">
        <h2 id="quality-heading" className="section-heading">Our Quality Commitment</h2>

        <p className="ql-intro">
          Quality is non-negotiable. Rraynex builds robust systems — from supplier qualification through finished release — to ensure product integrity,
          patient safety and regulatory readiness. Our technical and operational investments produce consistent outcomes and auditable evidence required for global approvals.
        </p>

        {/* Horizontal commitment cards */}
        <div className="ql-horizontal-cards" aria-hidden={false}>
          {COMMITMENTS.map((c) => (
            <article key={c.id} className="ql-card" tabIndex={0} aria-labelledby={`${c.id}-title`}>
              <figure className="ql-card-media">
                <img src={c.img} alt={c.title} loading="lazy" onError={imgFallback} />
              </figure>

              <div className="ql-card-body">
                <div className="ql-icon" aria-hidden>{c.icon}</div>
                <h4 id={`${c.id}-title`}>{c.title}</h4>
                {c.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Quality Systems */}
        <section className="ql-systems" aria-labelledby="systems-heading">
          <div className="ql-systems-header">
            <h3 id="systems-heading">Quality Systems & Core Processes</h3>
            <p className="ql-systems-intro">
              Our systems combine validated laboratory capability, process controls, stability programs and supplier governance to deliver reproducible product performance
              and regulatory-ready data packages. The box below summarises the operational pillars that enabled our WHO-GMP certification and ongoing global registrations.
            </p>
          </div>

          <div className="ql-sys-grid" role="list">
            {SYSTEMS.map((s, idx) => (
              <div key={s.id} className="ql-sys-card" role="listitem" tabIndex={0} aria-labelledby={`sys-${s.id}-title`}>
                <div className="ql-sys-icon" aria-hidden>{s.icon}</div>
                <div>
                  <h4 id={`sys-${s.id}-title`}>{s.title}</h4>
                  <p className="ql-sys-lead">{s.lead}</p>
                  <p className="ql-sys-details">{s.details}</p>
                  <div className="ql-sys-meta">
                    <span className="ql-sys-metric">{s.metric}</span>
                    <span className="ql-sys-dot" aria-hidden>•</span>
                    <span className="ql-sys-status">Operational</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="ql-certs" aria-labelledby="certs-heading">
          <h3 id="certs-heading" className="section-heading">Certifications & Recognitions</h3>
          <p className="ql-cert-lead">
            Our certifications — WHO-GMP, GMP and ISO standards — are public evidence of our validated systems and improve market acceptance and patient safety.
          </p>

          <div className="ql-badges" role="list" aria-label="Certification badges">
            {BADGES.map((b) => (
              <button
                key={b.id}
                className="ql-badge"
                role="listitem"
                onClick={() => openCert(b)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCert(b);
                  }
                }}
                aria-describedby={`desc-${b.id}`}
                title={`${b.label} — click for certificate`}
              >
                <img src={b.img} alt={b.label} loading="lazy" onError={imgFallback} />
                <div className="ql-badge-text">
                  <span className="ql-badge-label">{b.label}</span>
                  <small className="ql-badge-sub">Click to view details</small>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="ql-gallery" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="section-heading">How Our Facilities Look & Work</h2>
          <p className="ql-gallery-lead">
            Representative images of production floors, laboratories and packaging lines. Click images to enlarge.
          </p>

          <div className="ql-gallery-grid" role="list" aria-label="facility gallery">
            {GALLERY.map((src, i) => (
              <button
                key={src + i}
                className="ql-thumb"
                onClick={() => openLightbox(i)}
                aria-label={`Open facility image ${i + 1}`}
              >
                <img src={src} alt={`Facility image ${i + 1}`} loading="lazy" onError={imgFallback} />
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
       
      </section>

      {/* Certificate modal */}
      {certModal && (
        <div className="ql-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cert-modal-title" onClick={closeCert}>
          <div className="ql-modal" onClick={(e) => e.stopPropagation()}>
            <header className="ql-modal-head">
              <h3 id="cert-modal-title">{certModal.label}</h3>
              <button className="ql-modal-close" onClick={closeCert} aria-label="Close certificate dialog"><FaTimes /></button>
            </header>

            <div className="ql-modal-body">
              <img src={certModal.img} alt={`${certModal.label} emblem`} onError={imgFallback} />
              <div className="ql-modal-text">
                <p style={{ textAlign: "justify" }}>{certModal.blurb}</p>
                <p style={{ marginTop: 10, fontSize: 14, color: "#444" }}>
                  Click below to view or download the certificate (PDF).
                </p>
              </div>
            </div>

            <footer className="ql-modal-foot">
              <a className="btn btn-outline" href={certModal.pdf} target="_blank" rel="noreferrer"><FaFilePdf /> View PDF</a>
              <a className="btn btn-primary" href={certModal.pdf} download><FaFilePdf /> Download</a>
            </footer>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="ql-lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={closeLightbox}>
          <div className="ql-lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="ql-lightbox-btn prev" onClick={() => setLightboxIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)} aria-label="Previous image"><FaChevronLeft /></button>
            <img src={GALLERY[lightboxIndex]} alt={`Facility image ${lightboxIndex + 1}`} onError={imgFallback} />
            <button className="ql-lightbox-btn next" onClick={() => setLightboxIndex((i) => (i + 1) % GALLERY.length)} aria-label="Next image"><FaChevronRight /></button>
            <button className="ql-lightbox-close" onClick={closeLightbox} aria-label="Close viewer"><FaTimes /></button>
          </div>
        </div>
      )}
    </main>
  );
}
