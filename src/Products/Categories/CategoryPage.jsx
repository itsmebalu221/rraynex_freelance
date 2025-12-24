import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";
import SEO from "../../seo/SEO";
import { getPageSEO } from "../../seo/seoConfig";
import "./categoryPage.css";
import pellets from "../../Home/pellets.png";
import granules from "../../Components/Ecosystem/granules.png";
import Apis from "../../Components/Ecosystem/apis.jpeg";
import header from "./header.jpg";
import inter from "./inter.png";


const CATEGORY_CARDS = [
  {
    id: "pellets",
    title: "Pellets",
    blurb:
      "Multiparticulate systems engineered for controlled and delayed release so you can dial in dissolution curves, manage dose titration, and compress the path from pilot to commercial batches.",
  image: pellets,
    highlights: [
      "Precision layering keeps bead sizes uniform for predictable filling",
      "Validated release profiles help you pass regulatory dissolution quickly",
      "Supports MUPS, delayed-release and sustained-release therapies"
    ],
  },
  {
    id: "granules",
    title: "Granules",
    blurb:
      "Direct compression and wet granulation grades that smoothen powder flow, protect content uniformity, and shorten setup time on high-speed tableting lines.",
  image: granules,
    highlights: [
      "Optimised particle distribution for cleaner blending",
      "Moisture-controlled drying keeps stability studies on track",
      "Ships ready for high-speed tableting or capsule filling"
    ],
  },
  {
    id: "api",
    title: "APIs",
    blurb:
      "Regulatory-ready actives synthesised in WHO-GMP suites, combining robust impurity control with documentation packs that simplify DMF filings and partner onboarding.",
  image: Apis,
    highlights: [
      "Dedicated synthesis and isolation blocks for consistent quality",
      "Robust impurity profiling supports multi-agency submissions",
      "DMF, stability and dossier assistance for faster registration"
    ],
  },
  {
    id: "intermediary",
    title: "Intermediaries",
    blurb:
      "Advanced intermediates that stabilise your upstream supply chain, offering reliable hand-offs between stages and reducing the cost of scale-up chemistry.",
  image: inter,
    highlights: [
      "Route-optimised chemistry shortens your development cycles",
      "Scale-up support from kilo lab to commercial reactors",
      "Comprehensive documentation packages ease tech transfer"
    ],
  },
];

function ProductCategories() {
  const seo = getPageSEO('productCategories');
  
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = seo.title;
    }
  }, [seo.title]);

  return (
    <div className="category-page">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="productCategories"
      />
      <Hero
        title="Product Categories"
        subtitle="Explore how our pellet, granule, API and intermediate platforms accelerate your formulation roadmap."
        bgImage={header}
        plink="#categories"
        ptitle="Explore Categories"
        slink="/products"
        stitle="View Catalogue"
      />

      <main id="categories" className="category-shell">
        <section className="category-intro">
          <p>
            Every category within the Rraynex portfolio is engineered with a distinct process philosophy—whether it is the
            precision layering behind our pellets, the flow stability of our granules, or the regulatory depth built into our APIs
            and intermediates. Choose a category below to dive into focused product listings and technical resources.
          </p>
        </section>

        <section className="category-grid" aria-label="Product categories">
          {CATEGORY_CARDS.map((card, idx) => (
            <article
              key={card.id}
              className={`category-card ${idx % 2 ? "category-card--reverse" : ""}`.trim()}
            >
              <div className="category-card__image" aria-hidden>
                <img src={card.image} alt={`${card.title} placeholder`} loading="lazy" />
              </div>
              <div className="category-card__body">
                <h2>{card.title}</h2>
                <p>{card.blurb}</p>
                <ul className="category-card__list">
                  {card.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="category-card__actions">
                  <Link className="btn btn-primary" to={`/products/categories/${card.id}`}>
                    View {card.title} Products
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="category-support">
          <div className="category-support__card">
            <div>
              <h3>Need help choosing a platform?</h3>
              <p>
                Our formulation partners can benchmark dissolution, stability or impurity profiles across categories so that you can
                select the best fit faster.
              </p>
            </div>
            <div className="category-support__actions">
              <a className="btn btn-primary" href="mailto:communications@rraynex.com">
                Talk to an Expert
              </a>
              <Link className="btn btn-outline" to="/products">
                Browse All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductCategories;
