import React from 'react';
import { Link } from 'react-router-dom';
import './eco.css';
import pellets from "../../Home/pellets.png";
import granules from "./granules.png";
import apis from "./apis.jpeg";
import fdf from "./fdf.jpeg";
import online from "./online.jpeg";


const PLATFORM_CARDS = [
  {
    id: 'pellets',
    title: 'Pellets',
    description:
      'Multiparticulate platforms engineered for controlled and delayed release. Uniform layering, tight size curves and reproducible dissolution help partners compress timelines with confidence.',
    ctaLabel: 'Explore Pellets',
    ctaLink: '/products/pellets',
    image: pellets
  },
  {
    id: 'granules',
    title: 'Granules',
    description:
      'Direct compression and wet granulation grades tuned for flow, blend uniformity and tablet integrity. Each batch is humidity-managed so high-speed lines stay predictable.',
    ctaLabel: 'View Granules',
    ctaLink: '/products/granules',
    image: granules
  },
  {
    id: 'api',
    title: 'APIs & Intermediaries',
    description:
      'WHO-GMP synthesis blocks with integrated impurity profiling and scalability from kilo labs to commercial reactors. Documentation packages are ready for global submissions.',
    ctaLabel: 'See API Portfolio',
    ctaLink: '/products/api',
    image: apis
  },
  {
    id: 'fdf',
    title: 'Finished Dose Formulations',
    description:
      'End-to-end support from formulation design through validation and launch. We help partners commercialise tablets, capsules, sachets, and novel delivery formats with confidence.',
    ctaLabel: 'Partner on FDF Launches',
    ctaLink: '/products/fdf',
    image: fdf
  },
  {
    id: 'shopping',
    title: 'Rraynex Online Shopping',
    description:
      'Browse curated wellness essentials, OTC launches and pilot batches direct from Rraynex. Our online storefront makes it easier for partners to evaluate consumer-ready innovations.',
    ctaLabel: 'Visit Store',
    ctaLink: '/products',
    image: online
  }
];

const CleanGlossyEcosystem = () => {
  return (
    <section className="clean-glossy-section">
      <div className="clean-glossy-container">
        <div className="section-header">
          <h2 className="section-title">Our Healthcare Ecosystem</h2>
        </div>
        <div className="eco-cards">
          {PLATFORM_CARDS.map((card, idx) => (
            <article
              key={card.id}
              className={`eco-card ${idx % 2 ? 'eco-card--reverse' : ''}`.trim()}
            >
              <div className="eco-card__media" aria-hidden>
                <img src={card.image} alt={`${card.title} illustration`} loading="lazy" />
              </div>

              <div className="eco-card__body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="eco-card__cta">
                  <Link className="eco-card__btn" to={card.ctaLink}>
                    {card.ctaLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleanGlossyEcosystem;