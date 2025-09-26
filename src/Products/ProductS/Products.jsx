import React, { useMemo, useState, useEffect } from "react";
import "./products.css";
import bg from "./bg.jpg";

const PRODUCTS = [
  {
    id: "pellet-aspirin",
    slug: "product-aspirin",
    name: "Aspirin",
    type: "Pellets",
    category: "Anti-inflammatory",
    strengths: ["50%", "60%", "75%"],
    description:
      "High-quality aspirin pellets for tableting and encapsulation. Controlled particle size and moisture.",
    sku: "RRY-PEL-A100",
    price: 1200,
    unit: "kg",
    tags: ["pellet", "aspirin"],
    image: "/assets/products/aspirin.jpg",
  },
  {
    id: "pellet-clopidogrel",
    slug: "product-clopidogrel",
    name: "Clopidogrel",
    type: "Pellets",
    category: "Anti-Platelet",
    strengths: ["40%", "45.45%", "50%", "60%"],
    description:
      "Clopidogrel pellets manufactured under WHO-GMP compliant processes.",
    sku: "RRY-PEL-CLOP",
    price: 3500,
    unit: "kg",
    tags: ["pellet", "clopidogrel"],
    image: "/assets/products/clopidogrel.jpg",
  },
  {
    id: "pellet-omeprazole",
    slug: "product-omeprazole",
    name: "Omeprazole EC",
    type: "Pellets",
    category: "Anti-Ulcerant (Ppls)",
    strengths: ["7.5%", "8.5%", "10%", "15%", "22.5%"],
    description:
      "Enteric-coated omeprazole pellets for MUPS and capsules. Consistent release profile and stability.",
    sku: "RRY-PEL-OME",
    price: 4200,
    unit: "kg",
    tags: ["pellet", "omeprazole", "ec"],
    image: "/assets/products/omeprazole.jpg",
  },
  {
    id: "granule-paracetamol",
    slug: "product-paracetamol",
    name: "Paracetamol DC",
    type: "Granules",
    category: "Analgesic",
    strengths: [],
    description:
      "Direct compression paracetamol granules engineered for consistent tablet weight.",
    sku: "RRY-GRA-PARA",
    price: 800,
    unit: "kg",
    tags: ["granule", "paracetamol"],
    image: "/assets/products/paracetamol.jpg",
  },
  {
    id: "api-omeprazole",
    slug: "product-api-omeprazole",
    name: "Omeprazole (API)",
    type: "API",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Omeprazole API manufactured in WHO-GMP certified facility. DMF & stability data available.",
    sku: "RRY-API-OME",
    price: 25000,
    unit: "kg",
    tags: ["api", "omeprazole"],
    image: "/assets/products/api-omeprazole.jpg",
  },
];

const currency = (n) => `₹ ${n.toLocaleString("en-IN")}`;

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
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "INR",
        price: String(product.price),
        availability: "https://schema.org/InStock",
      },
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

  const longDescription = [
    `${product.name} (${product.type} — ${product.category}) by Rraynex is manufactured under WHO-GMP quality systems. Our ${product.type.toLowerCase()} are produced with controlled particle size and optimized moisture profiling to ensure consistent tableting and capsule filling.`,
    product.strengths?.length
      ? `Available strengths / compositions: ${product.strengths.join(", ")}.`
      : `Available in various compositions and custom strengths to meet formulation requirements.`,
    `Typical applications: formulation for immediate or modified release, MUPS, capsule filling, direct compression (for granules), and multi-particulate dosage forms.`,
    `Quality & regulatory: Certifications include WHO-GMP, ISO 9001, ISO 14001. DMF and stability data available on request for applicable products.`,
    `Packaging & supply: supplied in sealed bags/drums with batch traceability. For sample requests, COA, or technical discussions contact our sales team.`,
  ].join("\n\n");

  const specs = [
    { label: "SKU", value: product.sku },
    { label: "Type", value: product.type },
    { label: "Category", value: product.category },
    { label: "Price", value: currency(product.price) + ` / ${product.unit}` },
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
        {/* LEFT: image + price card */}
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
           <div className="rr-price-card" role="region" aria-label="Price and purchase">
            <div>
              <div className="price" aria-hidden>{currency(product.price)}</div>
              <div className="unit">/ {product.unit}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="rr-cert small" style={{ marginBottom: 8 }}>Certifications: WHO-GMP</div>
              <div className="rr-cta-buttons">
                <a
                  className="btn-primary"
                  href={`mailto:communications@rraynex.com?subject=${encodeURIComponent("Quote Request: " + product.name)}&body=${encodeURIComponent("Please share quotation, lead time and sample details for SKU: " + product.sku)}`}
                >
                  Request Quote
                </a>
                <a className="btn-outline" href="/assets/Rraynex_Corp_Profile.pdf" target="_blank" rel="noreferrer">Download Brochure</a>
              </div>
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
    <article className="rr-product-card">
      <a className="rr-thumb-link" href={`#${p.slug}`}>
        <div className="rr-product-media">
          <img src={bg} alt={p.name} onError={(e) => (e.currentTarget.src = bg)} />
        </div>
      </a>

      <div className="rr-product-body">
        <h3 className="rr-product-title">{p.name}</h3>
        <div className="rr-product-cat">{p.type} • {p.category}</div>

        {p.strengths?.length > 0 && (
          <div className="rr-product-strengths"><strong>Strengths:</strong> {p.strengths.join(" | ")}</div>
        )}

        <div className="rr-product-meta">
          <div className="rr-price">{currency(p.price)} <span className="rr-unit">/ {p.unit}</span></div>
          <div className="rr-sku">SKU: {p.sku}</div>
        </div>

        <div className="rr-actions">
          <a className="btn btn-primary" href={`#${p.slug}`}>View</a>
          <a className="btn btn-outline" href={`mailto:communications@rraynex.com?subject=Quote Request: ${encodeURIComponent(p.name)}`}>Request Quote</a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Main ProductsPage ---------- */

export default function ProductsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [selectedSlug, setSelectedSlug] = useState(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))],
    []
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.type)))],
    []
  );

  useEffect(() => {
    function onHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) setSelectedSlug(null);
      else {
        const match = PRODUCTS.find((p) => p.slug === hash);
        setSelectedSlug(match ? match.slug : null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let out = PRODUCTS.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (category !== "All" && p.category !== category) return false;
      if (!ql) return true;
      return (
        p.name.toLowerCase().includes(ql) ||
        p.sku.toLowerCase().includes(ql) ||
        (p.tags || []).some((t) => t.includes(ql))
      );
    });
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    return out;
  }, [q, type, category, sort]);

  const selectedProduct = selectedSlug
    ? PRODUCTS.find((p) => p.slug === selectedSlug)
    : null;

  return (
    <div>
      <section className="products-hero">
        <div className="products-hero-content">
          <h1 className="products-hero-title">Our Product Portfolio</h1>
          <p className="products-hero-lead">
            Delivering trusted pharmaceutical solutions — Intermediates, APIs,
            Pellets, and Granules — ensuring quality every step of the way.
          </p>
          <div className="products-hero-cta">
            <a className="btn-primary" href="#products">Explore Products</a>
            <a className="btn-outline" href="/assets/Rraynex_Corp_Profile.pdf" target="_blank" rel="noreferrer">Download Brochure</a>
          </div>
        </div>
      </section>

      <main id="products" className="rr-wrap">
        <header className="rr-hero">
          <div>
            <h1>Products</h1>
            <p className="muted">Pellets • Granules • APIs • Intermediates</p>
          </div>

          <div className="rr-hero-actions">
            <a className="btn btn-primary" href="mailto:communications@rraynex.com">Contact Sales</a>
          </div>
        </header>

        <section className="rr-controls">
          <input aria-label="Search products" placeholder="Search product name, SKU or tag" value={q} onChange={(e) => setQ(e.target.value)} />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <div className="count">Showing {list.length} results</div>
        </section>

        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={() => (window.location.hash = "")} />
        ) : (
          <section className="rr-grid">
            {list.map((p) => (<ProductCard key={p.id} p={p} />))}
          </section>
        )}

        <footer className="rr-footer">
          <small>
            Certifications: WHO-GMP, ISO 9001, ISO 14001. For DMF, VQM, TSE/BSE/MSDS and stability data please contact sales.
          </small>
        </footer>
      </main>
    </div>
  );
}
