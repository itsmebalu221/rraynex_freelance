// src/pages/Manufacturing.jsx
import React, { useEffect } from "react";
import "./Manufacturing.css";
import Hero from "../Components/Hero/Hero";

// Equipment images
import FBedCoter from "./1.png";
import CoatingPan from "./2.jpg";
import FluidBedCoter from "./3.png";
import RapidMix from "./4.png";
import Blender from "./5.png";
import HPCL from "./6.png";
import Dissolution from "./7.png";
import QC from "./8.png";
import HVAC from "./9.png";
import DEFAULT_EQ_IMG from "../Home/bg1.jpg";

// Badges
import GMP from "../Assets/GMP.png";
import ISO9001 from "../Assets/iso-9001.png";
import ISO14001 from "../Assets/iso-14001.jpg";
import WHO_GMP from "../Assets/who-gmp.png";

/* --- Data --- */
const OVERVIEW_MEDIA = {
  src: DEFAULT_EQ_IMG,
  alt: "Rraynex manufacturing overview",
};

const FACILITY_MEDIA = {
  src: FluidBedCoter,
  alt: "Production facility operations",
};

const BADGES = [
  { src: GMP, alt: "GMP" },
  { src: WHO_GMP, alt: "WHO-GMP" },
  { src: ISO9001, alt: "ISO 9001" },
  { src: ISO14001, alt: "ISO 14001" },
];

const FACILITIES = [
  {
    id: "facility-boisar",
    title: "Facility I — Boisar, Tarapur MIDC",
    focus: "Pellets, granules and MUPS",
    intro:
      "Our Boisar site is the engine behind multiparticulate manufacturing. The campus is tuned for scale, giving customers the ability to grow volumes quickly without compromising GMP discipline.",
    narrative:
      "Today the facility delivers 40 MT each month, with a new 70 MT block on track for completion by January 2025. Regulatory approvals stretch across WHO GMP, CIS, LATAM and wider ROW markets, and the export desk actively services Bangladesh, Pakistan, Russia, Mexico, Sri Lanka, Egypt and Iran. Because intermediates, APIs and pellets are produced on the same campus, the supply chain remains tightly governed and costs stay predictable. The leadership bench—Milind Gadkari (44+ years, ex Pelletech EU GMP), Mihir Patel (15+ years) alongside promoters Nishit Gupta and Raina D. Desai—keeps sourcing, quality and operations decisive. Every audit trail is fully documented with open and closed DMF modules, VQM support, TSE/BSE/MSDS packs and stability data on file.",
  },
  {
    id: "facility-sykha",
    title: "Facility II — Sykha, Gujarat",
    focus: "APIs and intermediates",
    intro:
      "Our newest facility in Gujarat extends the network into complex chemistry, pairing modern utilities with an execution team that has already validated multiple launches.",
    narrative:
      "The campus houses twenty reactors spanning 1 KL to 8 KL capacities across GLR, SSR and glass-lined formats, supported by a dedicated QC laboratory and spacious utilities. Certified for WHO GMP, CIS, LATAM and broader ROW markets, the site mirrors the market reach of Boisar with a focus on Bangladesh, Pakistan, Russia, Mexico, Sri Lanka, Egypt and Iran. It is already licensed to supply Omeprazole API along with Hydroxy, Chloro and Sulphite intermediates. Rabeprazole and Domperidone programmes have cleared lab scale with commercialization targeted for March 2025, while Itraconazole, Lansoprazole and Esomeprazole move steadily through the pipeline. Customer audit packs and tech-transfer teams are on standby to shorten onboarding timelines.",
  },
];

const EQUIPMENT = [
  {
    id: "eq-fluid-bed-coater",
    title: "Fluid Bed Coater",
    desc:
      "Our fluid bed coater enables efficient top and bottom spray coating of pellets and multiparticulates. It supports enteric, sustained, and color coating applications with precise control of weight gain and uniformity.",
    meta: "Used for enteric & sustained release formulations.",
    img: FBedCoter,
  },
  {
    id: "eq-coating-pan",
    title: "Coating Pan",
    desc:
      "Automated coating pan for film and sugar coating processes. It allows programmable spray parameters, pan speed, and drying cycles to ensure consistent tablet and pellet coating results.",
    meta: "Ideal for mid-scale batches and coating uniformity studies.",
    img: CoatingPan,
  },
  {
    id: "eq-fluid-bed-drier",
    title: "Fluid Bed Drier",
    desc:
      "Used for rapid and uniform drying of granules and pellets under controlled temperature and airflow. Equipped with PID controllers for precision and repeatability of moisture profiles.",
    meta: "Ensures product consistency and stability.",
    img: FluidBedCoter,
  },
  {
    id: "eq-rapid-mix-granulator",
    title: "Rapid Mixing Granulator",
    desc:
      "High-shear wet granulation system with variable impeller and chopper speeds. Capable of handling medium-to-large production runs with robust granule density control.",
    meta: "Capacity: up to 2 tons per batch.",
    img: RapidMix,
  },
  {
    id: "eq-blender",
    title: "Pellet Blender",
    desc:
      "Precision blender designed for uniform mixing of pellets, granules, and powder blends. The system ensures homogeneity while maintaining material integrity.",
    meta: "Multiple blender types — V, double cone, and tumble.",
    img: Blender,
  },
  {
    id: "eq-hplc",
    title: "HPLC Analytical System",
    desc:
      "High Performance Liquid Chromatography (HPLC) units for impurity profiling, assay, and stability testing. Fully validated methods with automated sample injection.",
    meta: "Critical QC instrument for release and validation.",
    img: HPCL,
  },
  {
    id: "eq-dissolution",
    title: "Dissolution Apparatus",
    desc:
      "Automated dissolution testers compliant with USP methods (paddle, basket, and flow-through). Used to monitor drug release kinetics and ensure bioequivalence targets.",
    meta: "Supports R&D and batch release analysis.",
    img: Dissolution,
  },
  {
    id: "eq-qc-lab",
    title: "Quality Control Laboratory",
    desc:
      "Fully equipped QC lab performing analytical, physical, and microbiological testing. Each process is documented with controlled data systems ensuring transparency.",
    meta: "Supports method validation & stability programs.",
    img: QC,
  },
  {
    id: "eq-hvac",
    title: "HVAC and Controlled Areas",
    desc:
      "Dedicated HVAC system ensures cleanroom-grade temperature, humidity, and air-pressure controls. Designed to meet WHO-GMP and regulatory cleanroom standards.",
    meta: "Ensures aseptic & GMP-compliant environment.",
    img: HVAC,
  },
];

/* --- Component --- */
export default function Manufacturing() {
  useEffect(() => {
    document.title = "Manufacturing Facilities | Rraynex Pharmaceuticals";
  }, []);

  const getImgSrc = (img) => {
    if (!img) return DEFAULT_EQ_IMG;
    if (typeof img === "string") return img;
    if (typeof img === "object" && (img.default || img.src))
      return img.default || img.src;
    return String(img);
  };

  return (
    <main className="mfg-page">
      {/* HERO */}
      <Hero
        title="Manufacturing Excellence"
        subtitle="Precision, process integrity, and global compliance, the pillars of our production ecosystem."
        bgImage="https://images.pexels.com/photos/7089612/pexels-photo-7089612.jpeg?auto=compress&cs=tinysrgb&w=1920"
        plink="/products"
        ptitle="Explore Products"
        slink="/assets/Rraynex_Brochure.pdf"
        stitle="Download Brochure"
      />

      <div className="container">
        {/* Overview */}
        <section className="overview">
          <div className="overview-side">
            <h3>World-Class Facilities</h3>
            <p>
              Rraynex operates complementary, WHO-GMP-certified campuses that
              anchor multiparticulate and API production for global customers.
              Pelletization, coating, granulation and analytical QA run in
              parallel with centralized HVAC, purified utilities and automated
              data capture so every batch is documented end-to-end.
            </p>
            <div className="badges">
              {BADGES.map((b) => (
                <div className="badge" key={b.alt}>
                  <img
                    src={getImgSrc(b.src)}
                    alt={b.alt}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = DEFAULT_EQ_IMG)}
                  />
                </div>
              ))}
            </div>
          </div>
          <figure className="section-media overview-media">
            <img
              src={getImgSrc(OVERVIEW_MEDIA.src)}
              alt={OVERVIEW_MEDIA.alt}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = DEFAULT_EQ_IMG)}
            />
          </figure>
        </section>

        {/* Facility Overview */}
        <section className="facility-section">
          <div className="facility-layout">
            <div className="facility-copy">
              <h2 className="facility-heading">Our Manufacturing Footprint</h2>
              <p className="facility-text">
                Two sites power the network: a multiparticulate specialist unit
                at Boisar in Tarapur MIDC, and an API and intermediates campus
                in Saykha, Gujarat. Each location is designed for scalability,
                regulatory compliance and transparent data flows, giving
                customers confidence from development through commercial supply.
              </p>
            </div>
            <figure className="section-media facility-media">
              <img
                src={getImgSrc(FACILITY_MEDIA.src)}
                alt={FACILITY_MEDIA.alt}
                loading="lazy"
                onError={(e) => (e.currentTarget.src = DEFAULT_EQ_IMG)}
              />
            </figure>
          </div>

          <div className="facility-grid">
            {FACILITIES.map((facility) => (
              <article className="facility-card" key={facility.id}>
                <header className="facility-card__header">
                  <span className="facility-card__focus">{facility.focus}</span>
                  <h3>{facility.title}</h3>
                </header>
                <p className="facility-card__intro">{facility.intro}</p>
                <p className="facility-card__narrative">{facility.narrative}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Equipment Section */}
        <section className="equipment-section" aria-labelledby="equipment-heading">
          <h3 id="equipment-heading" className="equipment-heading">
            Key Manufacturing Equipment
          </h3>
          <p className="equipment-intro">
            Our technology backbone consists of scalable, validated equipment
            enabling precision at every production stage. Below are some of the
            key systems integral to our operations.
          </p>

          <div className="equip-grid" role="list">
            {EQUIPMENT.map((eq) => (
              <article className="equip-card" key={eq.id} role="listitem">
                <div className="equip-media">
                  <img
                    src={getImgSrc(eq.img)}
                    alt={eq.title}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = DEFAULT_EQ_IMG)}
                  />
                </div>
                <div className="equip-body">
                  <h4 className="equip-title">{eq.title}</h4>
                  <p className="equip-text">{eq.desc}</p>
                  <p className="equip-meta">{eq.meta}</p>
                </div> 
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
