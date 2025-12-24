import React, { useState, useEffect } from "react";
import "./milestones.css";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
  FaIndustry,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PharmaGranulesHero from "../../Components/HEROSECTION/HeroSection";
import Hero from "../../Components/Hero/Hero";
import SEO from "../../seo/SEO";
import { getPageSEO } from "../../seo/seoConfig";
import header from "./header.jpg";
// --- Images ---
import one from "./1.jpg";
import two from "./2.jpg";
import three from "./3.jpg";
import four from "./4.jpg";
import five from "./5.jpg";
import six from "./6.jpg";
import seven from "./7.jpg";
import eight from "./8.jpg";
import nine from "./9.jpg";
import ten from "./10.jpg";
import eleven from "./11.jpg";
import twelve from "./12.jpg";
import thirteen from "./13.jpg";
import fourteen from "./14.jpg";
import GMP from "../../Assets/GMP.png";
import WHO_GMP from "../../Assets/who-gmp.png";
import ISO9001 from "../../Assets/iso-9001.png";
import ISO14001 from "../../Assets/iso-14001.jpg";
import ISO45001 from "../../Assets/iso-25001.png";

/* ------------------------------ TIMELINE DATA ------------------------------ */
const timelineData = [
  {
    year: "2021",
    title: "Company Incorporation & Foundation of Quality",
    icon: <FaGlobe />,
    content: [
      "Rraynex Pharmaceuticals Pvt. Ltd. was established in 2021 in Mumbai with a vision to redefine pharmaceutical manufacturing through science-led innovation and strong regulatory discipline.",
      "The founding phase focused on documentation, calibration, and global GMP-aligned quality systems to ensure traceability and reproducibility from inception.",
      "This laid the foundation for a data-driven, process-oriented organization committed to manufacturing excellence.",
    ],
    images: [one, two, three],
  },
  {
    year: "2023",
    title: "Full-Cycle Integration — Intermediates, APIs & Pellets",
    icon: <FaIndustry />,
    content: [
      "In 2023, Rraynex became the first Indian pharmaceutical company to integrate the complete process — intermediates, APIs, and pellet manufacturing — under one ecosystem.",
      "This integration enhanced control, reduced handoffs, and ensured superior quality through end-to-end process validation and synchronized production lines.",
      "It marked the start of a unified and efficient manufacturing system capable of handling complex global projects.",
    ],
    images: [four, five, six, seven],
  },
  {
    year: "2024",
    title: "Pellet Manufacturing Expansion & GMP Certification",
    icon: <FaIndustry />,
    content: [
      "2024 marked Rraynex’s emergence as one of Western India’s largest pellet manufacturers.",
      "The company commissioned a state-of-the-art GMP-certified facility and acquired a second unit dedicated to APIs and intermediates, reinforcing its operational scalability.",
      "Process Analytical Technology (PAT) systems and automated coating lines were introduced to enhance precision, yield consistency, and product uniformity.",
    ],
    images: [eight, nine, ten, eleven],
  },
  {
    year: "2025",
    title: "WHO-GMP Certification & Global Recognition",
    icon: <FaCheckCircle />,
    content: [
      "In 2025, Rraynex achieved WHO-GMP certification and validated an annual capacity of 125 metric tons of pellets and 30 metric tons of granules — establishing itself among India’s largest standalone pellet manufacturers.",
      "It also earned ISO 9001, ISO 14001, and ISO 45001 certifications, reinforcing its global quality commitment and sustainability practices.",
      "Within three years of incorporation, Rraynex filed three new product developments supported by stability data and Drug Master Files, expanding its portfolio to over 127 formulations.",
      "That year, Rraynex was also recognized across leading international pharma exhibitions and publications for exceptional growth and innovation.",
    ],
    images: [twelve, thirteen, fourteen],
  },
  {
    year: "2026",
    title: "Next Chapter — UGMP Target & Global Expansion",
    icon: <FaClock />,
    content: [
      "The roadmap for 2026 focuses on UGMP compliance, global registrations, and next-generation API development.",
      "Expansion plans include reactor upgrades, pilot-scale R&D units, and digitized QMS systems to strengthen process control and sustainability under ISO 14001 guidelines.",
      "Rraynex continues to evolve as a global partner in reliable, high-quality pharmaceutical manufacturing.",
    ],
    images: [GMP],
  },
];

/* ----------------------------- MAIN COMPONENT ----------------------------- */
export default function MilestonesTimeline() {
  const seo = getPageSEO('milestones');
  const [indices, setIndices] = useState(() => timelineData.map(() => 0));
  const navigate = useNavigate();

  const prevImage = (idx) =>
    setIndices((prev) => {
      const copy = [...prev];
      const len = timelineData[idx].images.length;
      copy[idx] = (copy[idx] - 1 + len) % len;
      return copy;
    });

  const nextImage = (idx) =>
    setIndices((prev) => {
      const copy = [...prev];
      const len = timelineData[idx].images.length;
      copy[idx] = (copy[idx] + 1) % len;
      return copy;
    });

  // reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );

    document.querySelectorAll(".mt-item, .mt-quality p, .badge").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="milestones"
      />
      <section className="mt-section" aria-labelledby="mt-heading">
        <Hero
          title="Milestones & Recognitions"
          subtitle="A decade of growth, certifications, and partnerships that anchor our global credibility."
          bgImage={header}
          ptitle="Explore Our Products"
          plink="/products"
          stitle="Download Brochure"
          slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
        />

        <div className="mt-container">
          <div className="mt-line" aria-hidden />
          <h1 className="mt-heading-text" align="center">Progress Driven by Innovation</h1>

          {/* Timeline Items */}
          <div className="mt-list" role="list">
            {timelineData.map((item, idx) => {
              const cur = indices[idx];
              const total = item.images.length;
              return (
                <article className="mt-item" key={item.year} role="listitem">
                  <div className="mt-left">
                    <div className="mt-year">{item.year}</div>
                    <div className="mt-dot" />
                  </div>

                  <div className="mt-right">
                    <div className="mt-header">
                      <div className="mt-icon">{item.icon}</div>
                      <h3 className="mt-headline">{item.title}</h3>
                      <span className="mt-verified">
                        <FaCheckCircle /> Verified
                      </span>
                    </div>

                    <div className="mt-content">
                      {item.content.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    <div className="mt-carousel">
                      <button className="mt-btn" onClick={() => prevImage(idx)}>
                        <FaChevronLeft />
                      </button>

                      <div className="mt-image-wrap">
                        <img
                          className="mt-image"
                          src={item.images[cur]}
                          alt={`${item.year} image ${cur + 1}`}
                          loading="lazy"
                        />
                      </div>

                      <button className="mt-btn" onClick={() => nextImage(idx)}>
                        <FaChevronRight />
                      </button>

                      <div className="mt-carousel-counter">
                        {cur + 1} / {total}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ✅ QUALITY SECTION AT THE VERY BOTTOM */}
      <section className="mt-quality">
        <h2>Quality & Global Recognitions</h2>

        <p>
          At <strong>Rraynex</strong>, quality is a foundational value that drives
          every decision — from raw material sourcing to final packaging. Every
          batch is validated under stringent protocols aligned with WHO-GMP and
          ISO standards, ensuring consistency and global market compliance.
        </p>

        <p>
          Our certifications include <strong>WHO-GMP</strong>, <strong>ISO 9001</strong> for
          Quality Management, <strong>ISO 14001</strong> for Environmental Management,
          and <strong>ISO 45001</strong> for Occupational Safety — all integrated within our
          holistic operational framework.
        </p>

        <p>
          Rraynex has been recognized in leading international pharmaceutical
          exhibitions and industry journals for excellence in pellet
          manufacturing, process innovation, and regulatory strength. Our
          documentation systems include Drug Master Files (DMF), stability data,
          and analytical validation packages for over 127 global products.
        </p>

        <div className="mt-badges">
          <div className="badge">
            <img src={GMP} alt="GMP Certified" />
            <span>GMP Certified</span>
          </div>
          <div className="badge">
            <img src={WHO_GMP} alt="WHO-GMP Certified" />
            <span>WHO-GMP Certified</span>
          </div>
          <div className="badge">
            <img src={ISO9001} alt="ISO 9001" />
            <span>ISO 9001 Quality Management</span>
          </div>
          <div className="badge">
            <img src={ISO14001} alt="ISO 14001" />
            <span>ISO 14001 Environmental Management</span>
          </div>
          <div className="badge">
            <img src={ISO45001} alt="ISO 45001" />
            <span>ISO 45001 Occupational Safety</span>
          </div>
        </div>
      </section>
    </>
  );
}
