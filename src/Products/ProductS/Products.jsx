import React, { useMemo, useState, useEffect } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import "./products.css";
import bg from "./bg.jpg";
import Hero from "../../Components/Hero/Hero";

/* ----------------- Data ----------------- */
const PRODUCTS = [
  {
    id: "pellet-aspirin",
    slug: "product-aspirin",
    name: "Aspirin",
    type: "Pellets",
  family: "pellets",
    category: "Anti-inflammatory",
    strengths: ["50%", "60%", "75%"],
    description:
      "High-quality aspirin pellets for tableting and encapsulation. Controlled particle size and moisture.",
    sku: "RRY-PEL-A100",
    unit: "kg",
    tags: ["pellet", "aspirin"],
    image: "/assets/products/aspirin.jpg",
  },
  {
    id: "pellet-clopidogrel",
    slug: "product-clopidogrel",
    name: "Clopidogrel",
    type: "Pellets",
  family: "pellets",
    category: "Anti-Platelet",
    strengths: ["40%", "45.45%", "50%", "60%"],
    description:
      "Clopidogrel pellets manufactured under WHO-GMP compliant processes.",
    sku: "RRY-PEL-CLOP",
    unit: "kg",
    tags: ["pellet", "clopidogrel"],
    image: "/assets/products/clopidogrel.jpg",
  },
  {
    id: "pellet-omeprazole",
    slug: "product-omeprazole",
    name: "Omeprazole EC",
    type: "Pellets",
  family: "pellets",
    category: "Anti-Ulcerant (Ppls)",
    strengths: ["7.5%", "8.5%", "10%", "15%", "22.5%"],
    description:
      "Enteric-coated omeprazole pellets for MUPS and capsules. Consistent release profile and stability.",
    sku: "RRY-PEL-OME",
    unit: "kg",
    tags: ["pellet", "omeprazole", "ec"],
    image: "/assets/products/omeprazole.jpg",
  },
  {
    id: "granule-paracetamol",
    slug: "product-paracetamol",
    name: "Paracetamol DC",
    type: "Granules",
  family: "granules",
    category: "Analgesic",
    strengths: [],
    description:
      "Direct compression paracetamol granules engineered for consistent tablet weight.",
    sku: "RRY-GRA-PARA",
    unit: "kg",
    tags: ["granule", "paracetamol"],
    image: "/assets/products/paracetamol.jpg",
  },
  {
    id: "api-omeprazole",
    slug: "product-api-omeprazole",
    name: "Omeprazole (API)",
    type: "API",
  family: "api",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Omeprazole API manufactured in WHO-GMP certified facility. DMF & stability data available.",
    sku: "RRY-API-OME",
    unit: "kg",
    tags: ["api", "omeprazole"],
    image: "/assets/products/api-omeprazole.jpg",
  },
  {
    id: "fdf-probiotic",
    slug: "product-fdf-probiotic",
    name: "Probiotic Sachet Blend",
    type: "Finished Dose Formulation",
    family: "fdf",
    category: "Nutraceutical",
    strengths: [],
    description:
      "Turnkey probiotic sachets supplied with validated packaging formats and stability data for rapid market entry.",
    sku: "RRY-FDF-PROBIO",
    unit: "box",
    tags: ["fdf", "sachet"],
    image: "/assets/products/placeholder.jpg",
  },
];

const PRODUCT_NARRATIVES = {
  "product-aspirin": [
    "Our aspirin pellet program combines tightly controlled particle distribution with low residual solvent levels, making it a dependable backbone for both tablet and capsule formats.",
    "Each lot is processed through validated coating cycles that deliver precise weight gain, ensuring predictable dissolution even at high-speed compression.",
    "Customers leverage the format to shorten tech-transfer timelines while maintaining pharmacopoeial compliance across global dossiers."
  ],
  "product-clopidogrel": [
    "Clopidogrel pellets from Rraynex are produced in segregated suites with inline sieve classification to maintain uniform bulk density.",
    "A stabilised layering process protects the sensitive API, giving formulators confidence during moisture-stress studies.",
    "The platform is already referenced in multiple ROW submissions, with documentation packages ready for accelerated partner onboarding."
  ],
  "product-omeprazole": [
    "Our Omeprazole enteric-coated pellets are engineered for MUPS and capsule applications where low acid uptake is critical.",
    "We employ multi-layer barrier techniques that safeguard the core during compression, maintaining the target release profile across strengths.",
    "Regulatory support extends from comparative dissolution to full stability data sets, helping partners unlock fast-track registrations."
  ],
  "product-paracetamol": [
    "Paracetamol DC granules offer consistent flow and compressibility, allowing robust tablet production without additional wet granulation steps.",
    "Moisture is managed through controlled drying to keep loss-on-drying within specification, even in humid operating environments.",
    "Flexible pack sizes and rapid batch release make the grade an efficient choice for both seasonal spikes and continuous supply chains."
  ],
  "product-api-omeprazole": [
    "Omeprazole API from our Sykha site is synthesised in GLR and SSR trains designed to support multiton campaigns with reproducible impurity profiles.",
    "Stringent in-process controls, including online pH and particle-size monitoring, ensure every batch aligns with pharmacopeial standards.",
    "The dossier includes open and closed DMF sections, method validations, and stability data tailored to agency expectations across CIS, LATAM, and ROW markets."
  ],
  "product-fdf-probiotic": [
    "Our probiotic sachet platform couples high-viability strains with moisture-protective laminates that sustain stability through extended shipping windows.",
    "Each presentation is supported by flavour and sweetener options that meet consumer acceptability benchmarks without compromising colony-forming unit counts.",
    "Launch partners receive validation templates and artwork-ready packaging dielines so commercial timelines stay on track even for multi-country rollouts."
  ]
};

const ROUTE_FILTERS = {
  api: {
    label: "APIs",
    tagline: "Our APIs are engineered with precision and purity, ensuring consistent therapeutic performance and global regulatory compliance.",
    matches: (product) => product.family === "api",
    defaultType: "API",
  },
  intermediary: {
    label: "Intermediaries",
    tagline:"Our advanced intermediates strengthen the pharmaceutical supply chain with superior consistency, scalability, and quality assurance.",
    matches: (product) => product.family === "intermediary",
    defaultType: "All",
  },
  pellets: {
    label: "Pellets",
    tagline: "We manufacture a diverse range of sustained and delayed release pellets designed for consistent quality and precision performance.",
    matches: (product) => product.family === "pellets",
    defaultType: "Pellets",
  },
  granules: {
    label: "Granules",
    tagline:"Our DC granules deliver exceptional flow, compressibility, and uniformity, ensuring efficiency in downstream tableting processes.",
    matches: (product) => product.family === "granules",
    defaultType: "Granules",
  },
  fdf: {
    label: "Finished Dose Forms",
    tagline: "Finished dose formulations backed by validation support and market-ready packaging options.",
    matches: (product) => product.family === "fdf",
    defaultType: "Finished Dose Formulation",
  },
};

const PRODUCT_MENU = [
  { to: "/products", label: "All" },
  { to: "/products/pellets", label: "Pellets" },
  { to: "/products/granules", label: "Granules" },
  { to: "/products/api", label: "APIs" },
  { to: "/products/fdf", label: "Finished Dose Forms" },
];

/* ----------------- SEO helpers ----------------- */

function setMetaTitle(title) {
  if (typeof document !== "undefined" && title) document.title = title;
}

function setMetaDescription(desc) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", desc);
}

function setCanonical(url) {
  if (typeof document === "undefined") return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function injectJsonLd(id, obj) {
  if (typeof document === "undefined") return;
  const prev = document.getElementById(id);
  if (prev) prev.remove();
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.text = JSON.stringify(obj);
  document.head.appendChild(script);
}

/* ----------------- ProductDetail (polished, responsive, accessible) ----------------- */

function ProductDetail({ product, onBack }) {
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    if (!product) return;

    // SEO: meta, canonical, JSON-LD
    const shortDesc = `${product.name} — ${product.type} (${product.category}). ${product.description} Available in strengths: ${
      product.strengths?.length ? product.strengths.join(", ") : "various strengths"
    }. SKU: ${product.sku}.`;
    const title = `${product.name} | Rraynex — Pharma Pellets & APIs`;
    setMetaTitle(title);
    setMetaDescription(shortDesc);

    const url = `${window.location.origin}${window.location.pathname}#${product.slug}`;
    setCanonical(url);

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: product.image ? [product.image] : [window.location.origin + bg],
      description: product.description,
      sku: product.sku,
      brand: { "@type": "Brand", name: "Rraynex" },
    };
    injectJsonLd("product-jsonld", productSchema);

    // FAQ JSON-LD (matching visible FAQs)
    const faqItems = [
      {
        q: "How can I request a sample?",
        a: `Click 'Request Quote' or 'Contact Sales' — or email communications@rraynex.com with product SKU ${product.sku}.`,
      },
      {
        q: "Do you provide DMF / COA?",
        a: "DMF, COA and stability data are available on request for registered APIs and pellets. Contact sales for access procedures.",
      },
      {
        q: "What packaging options are available?",
        a: "Standard packaging: sealed bags (25kg/50kg) or drums. Custom packaging available on request.",
      },
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    injectJsonLd("faq-jsonld", faqSchema);

    return () => {
      const p = document.getElementById("product-jsonld");
      if (p) p.remove();
      const f = document.getElementById("faq-jsonld");
      if (f) f.remove();
    };
  }, [product]);

  useEffect(() => setOpenIdx(null), [product]);

  if (!product) return null;

  const longDescription = (PRODUCT_NARRATIVES[product.slug] || []).join("\n\n") || product.description;

  const specs = [
    { label: "SKU", value: product.sku },
    { label: "Type", value: product.type },
    { label: "Category", value: product.category },
    { label: "Pack size", value: product.unit },
    { label: "Available strengths", value: product.strengths?.length ? product.strengths.join(", ") : "Custom / On request" },
    { label: "Certifications", value: "WHO-GMP, ISO 9001, ISO 14001" },
  ];

  const faqs = [
    {
      q: "How can I request a sample?",
      a: `Click 'Request Quote' or 'Contact Sales' — or email communications@rraynex.com with product SKU ${product.sku}.`,
    },
    {
      q: "Do you provide DMF / COA?",
      a: "DMF, COA and stability data are available on request for registered APIs and pellets. Contact sales for access procedures.",
    },
    {
      q: "What packaging options are available?",
      a: "Standard packaging: sealed bags (25kg/50kg) or drums. Custom packaging available on request; contact our sales team for MOQs.",
    },
  ];

  function toggleFaq(i) {
    setOpenIdx(openIdx === i ? null : i);
  }

  return (
    <article className="rr-detail" itemScope itemType="https://schema.org/Product">
      <button className="back-link" onClick={onBack}>← Back to products</button>

      <div className="rr-detail-grid">
        {/* LEFT: image + contact card */}
        <div>
          <figure className="rr-detail-media" itemProp="image" aria-hidden>
            <img
              src={ bg}
              alt={`${product.name} — ${product.type}`}
              onError={(e) => (e.currentTarget.src = "/assets/products/placeholder.jpg")}
              width="640"
              height="480"
              loading="lazy"
            />
          </figure>
        </div>

        {/* RIGHT: title & short meta */}
        <div className="rr-detail-body">
          <h1 itemProp="name">{product.name}</h1>
          <div className="rr-product-cat"><span itemProp="category">{product.category}</span> • <span>{product.type}</span></div>
          <p className="rr-desc" itemProp="description">{product.description}</p>

          {product.strengths?.length > 0 && (
            <div className="rr-strengths" aria-hidden>
              {product.strengths.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          )}
            <div className="rr-contact-card" role="region" aria-label="Request product information">
              <div>
                <div className="rr-cert small" style={{ marginBottom: 8 }}>Certifications: WHO-GMP</div>
                <p className="rr-contact-note">
                  Share your formulation needs and regulatory scope, and our commercial team will respond within one business day.
                </p>
              </div>

              <div className="rr-cta-buttons">
                <a
                  className="btn-primary"
                  href={`mailto:communications@rraynex.com?subject=${encodeURIComponent("Product Enquiry: " + product.name)}&body=${encodeURIComponent("Please share technical dossier access and commercial details for SKU: " + product.sku)}`}
                >
                  Request Details
                </a>
              </div>
            </div>
        </div>
      </div>

      {/* FULL WIDTH sections */}
      <div className="rr-fullwidth">
        {/* Overview */}
        <section aria-labelledby="product-overview" style={{ marginBottom: 18 }}>
          <h2 id="product-overview">Product overview</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{longDescription}</p>
        </section>

        {/* Specs */}
        <section id="product-specs" className="rr-specs" style={{ marginBottom: 18 }}>
          <h3>Technical specifications</h3>
          <dl>
            {specs.map((s) => (
              <div key={s.label} style={{ marginBottom: 8 }}>
                <dt style={{ fontWeight: 700 }}>{s.label}</dt>
                <dd style={{ margin: 0 }}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* FAQ Accordion */}
        <section className="rr-faq" aria-labelledby="faqs">
          <h3 id="faqs">Frequently asked questions</h3>
          <div>
            {faqs.map((f, i) => (
              <div
                key={i}
                className="faq-item"
                aria-expanded={openIdx === i ? "true" : "false"}
              >
                <button
                  className="faq-button"
                  onClick={() => toggleFaq(i)}
                  aria-controls={`faq-panel-${i}`}
                  aria-expanded={openIdx === i ? "true" : "false"}
                >
                  <span className="q">{f.q}</span>
                  <span className="chev" aria-hidden>▾</span>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  className="faq-panel"
                  role="region"
                >
                  <div>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

/* ---------- ProductCard (image fallback) ---------- */

function ProductCard({ p }) {
  return (
    <article className="product-card" key={p.id}>
      <header className="product-card__meta">
        <span className="product-card__badge product-card__badge--type">{p.type}</span>
        <span className="product-card__badge product-card__badge--category">{p.category}</span>
      </header>

      <div className="product-card__body">
        <h3>{p.name}</h3>
        <p>{p.description}</p>

        {p.strengths?.length > 0 && (
          <div className="product-card__strengths" aria-label="Available strengths">
            {p.strengths.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        )}

        <dl className="product-card__specs">
          <div>
            <dt>SKU</dt>
            <dd>{p.sku}</dd>
          </div>
          <div>
            <dt>Pack size</dt>
            <dd>{p.unit}</dd>
          </div>
        </dl>
      </div>

      <footer className="product-card__footer">
        <Link className="btn btn-primary" to={`/products/view/${p.slug}`}>
          Know More
        </Link>
      </footer>
    </article>
  );
}

/* ---------- ProductDetailPage (route target) ---------- */

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      // If product not found, send user back to listing.
      navigate("/products", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  return <ProductDetail product={product} onBack={() => navigate(-1)} />;
}

/* ---------- Main ProductsPage ---------- */

export default function ProductsPage() {
  const navigate = useNavigate();
  const { category: categorySlugRaw } = useParams();
  const categorySlug = categorySlugRaw ? categorySlugRaw.toLowerCase() : null;
  const routeFilter = categorySlug ? ROUTE_FILTERS[categorySlug] : null;

  const [q, setQ] = useState("");

  useEffect(() => {
    if (categorySlug && !routeFilter) {
      navigate("/products", { replace: true });
      return;
    }

  }, [categorySlug, routeFilter, navigate]);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let out = PRODUCTS.filter((p) => {
      if (routeFilter && !routeFilter.matches(p)) return false;
      if (!ql) return true;
      return (
        p.name.toLowerCase().includes(ql) ||
        p.sku.toLowerCase().includes(ql) ||
        (p.tags || []).some((t) => t.includes(ql))
      );
    });
    return out;
  }, [q, routeFilter]);

  const resultsLabel = `Showing ${list.length} ${list.length === 1 ? "product" : "products"}`;

  return (
    <div className="products-page">
      <Hero
        title={routeFilter ? `Our ${routeFilter.label}` : "Our Product Portfolio"}
        subtitle={
          routeFilter
            ? `${routeFilter.tagline}`
            : "From advanced pellets to APIs, Rraynex delivers quality formulations engineered for global healthcare standards."
        }
        plink="#products"
        ptitle="Explore Products"
        slink="/assets/Rraynex_Corp_Profile.pdf"
        stitle="Download Brochure"
      />

      <main id="products" className="products-shell">
        <header className="products-heading">
          <div>
            <span className="products-eyebrow">Product catalogue</span>
            <h1>{routeFilter ? routeFilter.label : "All Products"}</h1>
            <p className="products-summary">Pellets • Granules • APIs • Intermediates</p>
          </div>
          <div className="products-heading__actions">
            <Link className="btn btn-outline" to="/products/categories">
              Explore Categories
            </Link>
            <a className="btn btn-primary" href="mailto:communications@rraynex.com">
              Contact Sales
            </a>
          </div>
        </header>

        <nav className="products-menu" aria-label="Product families">
          {PRODUCT_MENU.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/products"}
              className={({ isActive }) =>
                [
                  "products-menu__link",
                  isActive ? "products-menu__link--active" : "",
                ].join(" ").trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <section className="products-panel" aria-label="Product search">
          <div className="products-panel__grid">
            <div className="products-field products-field--search">
              <label htmlFor="product-search">Search the catalogue</label>
              <input
                id="product-search"
                aria-label="Search products"
                placeholder="Search molecule, SKU or tag"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <div className="products-panel__meta">
            <span className="products-count" aria-live="polite">
              {resultsLabel}
            </span>
          </div>
        </section>

        <section className="products-grid" aria-live="polite">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </section>

        <section className="products-support" aria-label="Need assistance?">
          <div className="products-support__card">
            <div>
              <h2>Need formulation support?</h2>
              <p>
                Our technical specialists can help you with DMF access, stability data, custom strengths and
                regulatory documentation.
              </p>
            </div>
            <div className="products-support__actions">
              <a className="btn btn-primary" href="mailto:communications@rraynex.com">
                Email the Team
              </a>
              <a className="btn btn-outline" href="tel:+910000000000">
                Call +91 0000 000 000
              </a>
            </div>
          </div>
        </section>

        <footer className="products-footer">
          <small>
            Certifications: WHO-GMP, ISO 9001, ISO 14001. For DMF, VQM, TSE/BSE/MSDS and stability data please contact
            sales.
          </small>
        </footer>
      </main>
    </div>
  );
}