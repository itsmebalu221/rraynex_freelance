import React from "react";
import "./Responsiblity.css";
import { FaLeaf, FaHandsHelping, FaShieldAlt, FaGlobe } from "react-icons/fa";
import Hero from "../Components/Hero/Hero";
import { Link } from "react-router-dom";

const Responsibility = () => {
  const pillars = [
    {
      id: "csr",
      eyebrow: "People First",
      title: "Community Impact & CSR",
      summary:
        "Education, primary healthcare, and livelihood programs are co-created with local communities so every intervention is owned and sustained locally.",
      bullets: [
        "STEM scholarships for 300+ students and vocational upskilling for caregivers",
        "Mobile health camps, maternal wellness drives, and preventive screenings",
        "Women-led self-help groups supported with micro-enterprise starter kits",
      ],
      impact: "Impact: 48 villages engaged with 18,000+ direct beneficiaries each year.",
      link: "/responsibility/csr",
      image:
        "https://images.unsplash.com/photo-1603574670812-d24560880210?auto=format&fit=crop&w=1200&q=80",
      Icon: FaHandsHelping,
    },
    {
      id: "sustainability",
      eyebrow: "Resource Positive",
      title: "Sustainability & Circularity",
      summary:
        "Carbon, water, and waste dashboards guide every investment—from solvent recovery to renewable energy sourcing—so operations stay climate resilient.",
      bullets: [
        "42% of site power now drawn from solar and wind purchase agreements",
        "Closed-loop solvent recovery delivering 68% reuse efficiency",
        "Water-positive roadmap with rainwater harvesting and zero liquid discharge",
      ],
      impact: "Impact: 1,200 tons of CO₂e avoided annually with 100% hazardous waste traceability.",
      link: "/responsibility/sustainability",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      Icon: FaLeaf,
    },
    {
      id: "ehs",
      eyebrow: "Zero Harm Culture",
      title: "Environment, Health & Safety",
      summary:
        "ISO 45001-aligned safety systems, digital permit-to-work, and behavior-based training ensure people and processes stay protected round the clock.",
      bullets: [
        "24/7 environmental monitoring with real-time compliance alerts",
        "Annual 360° safety drills coordinated with local emergency responders",
        "Occupational health clinic with ergonomic and mental well-being programs",
      ],
      impact: "Impact: Zero lost-time incidents in 24 months and 97% audit compliance.",
      link: "/responsibility/ehs",
      image:
        "https://images.unsplash.com/photo-1516826438747-fc1adf3d65b9?auto=format&fit=crop&w=1200&q=80",
      Icon: FaShieldAlt,
    },
    {
      id: "ecosystem",
      eyebrow: "Shared Success",
      title: "Ecosystem Partnerships",
      summary:
        "We embed quality systems, tech-transfer playbooks, and market access know-how so smaller manufacturers accelerate responsibly.",
      bullets: [
        "Joint GMP audits and validation support for partner facilities",
        "Shared R&D toolkits covering formulation, stability, and regulatory dossiers",
        "Commercial mentoring that links partners to tenders across 58+ countries",
      ],
      impact: "Impact: 12 MSME partners graduated to regulated supply with 5 new market entries.",
      link: "/responsibility/uplifting-ecosystem",
      image:
        "https://images.unsplash.com/photo-1582719478250-fd1ef29e8f87?auto=format&fit=crop&w=1200&q=80",
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
        bgImage="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1920"
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
