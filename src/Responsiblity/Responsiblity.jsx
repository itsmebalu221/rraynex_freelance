import React from "react";
import "./Responsiblity.css";
import { FaHandsHelping, FaShieldAlt, FaGlobe } from "react-icons/fa";
import Hero from "../Components/Hero/Hero";
import { Link } from "react-router-dom";
import ehs from "./ehss.jpg"
import header from "./header.jpg";
import csr from "../../src/Assets/CSR/4.jpeg"
import uplift from "../About/Milestones/5.jpg"

const Responsibility = () => {
  const pillars = [
    {
      id: "csr",
      eyebrow: "People First",
      title: "Community Impact & CSR",
      summary:
        "We will co-design community-owned programs that expand education, primary healthcare, and livelihood opportunities with local leaders at the table from day one.",
      bullets: [
        "We will launch learning labs that bring STEM, coding, and digital skills to schools across our villages.",
        "We will roll out mobile care units offering tele-consults, prenatal screenings, and reliable pharmacy support.",
        "We will seed livelihood circles that mentor women-led enterprises with funding and market access.",
      ],
      impact: "Impact: We will report transparent progress as each program scales, sharing annual targets with partner communities.",
      link: "/responsibility/csr",
      image: csr,
      Icon: FaHandsHelping,
    },
    {
      id: "ehs",
      eyebrow: "Zero Harm Culture",
      title: "Environment, Health & Safety",
      summary:
        "Safety-first frameworks combine digital oversight, scenario drills, and whole-person wellness so every shift ends with teams going home safe.",
      bullets: [
        "Digital permit-to-work app with live risk scoring across 11 production lines",
        "Quarterly multi-agency emergency simulations spanning fire, chem, and flood events",
        "On-site clinic integrating ergonomic coaching, mental health support, and return-to-work plans",
      ],
      impact: "Impact: 24 consecutive months without a lost-time injury and 98% closure of audit actions within 30 days.",
      link: "/responsibility/ehs",
      image:ehs,
      Icon: FaShieldAlt,
    },
    {
      id: "ecosystem",
      eyebrow: "Shared Success",
      title: "Uplifting Ecosystem Partners",
      summary:
        "Supplier uplift labs codify quality systems, data tools, and go-to-market pathways so MSMEs scale responsibly alongside us.",
      bullets: [
        "Joint GMP maturity programs with gap closure roadmaps for partner plants",
        "Shared digital QMS workspace covering change controls, deviations, and CAPA analytics",
        "Export-readiness coaching that pairs co-branded bids with regulatory dossier support",
      ],
      impact: "Impact: 15 MSME partners unlocked regulated-market approvals and secured 6 new country launches in FY25.",
      link: "/responsibility/uplifting-ecosystem",
      image: uplift,
      Icon: FaGlobe,
    },
  ];

  return (
    <div className="responsibility">
      {/* HERO */}
      <Hero
        title="Our Responsibility"
        subtitle="We partner with communities, teams, and the wider supply chain to build resilient, responsible healthcare ecosystems."
        ptitle="CSR & Community"
        stitle="Ecosystem Impact"
        plink="/responsibility/csr"
        slink="/responsibility/uplifting-ecosystem"
        bgImage={header}
      />

      {/* Cards Section */}
      <div className="resp-container">
        <h2 className="section-heading">Our Key Commitments</h2>
        <div className="resp-grid">
          {pillars.map(({ id, title, summary, bullets, image, Icon, eyebrow, impact, link }, index) => (
            <article
              key={id}
              className={`resp-card ${index % 2 !== 0 ? "resp-card--reverse" : ""}`}
            >
              <div className="resp-card__media" aria-hidden>
                <img src={image} alt="" loading="lazy" />
              </div>
              <div className="resp-card__body">
                {eyebrow && <span className="resp-card__eyebrow">{eyebrow}</span>}
                <div className="resp-card__heading">
                  <span className="resp-icon" aria-hidden>
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                </div>
                <p className="resp-card__summary">{summary}</p>
                <ul className="resp-card__list">
                  {bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {impact && <p className="resp-card__impact">{impact}</p>}
                {link && (
                  <div className="resp-card__footer">
                    <Link to={link} className="resp-card__cta">
                      Explore {title}
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Responsibility;
