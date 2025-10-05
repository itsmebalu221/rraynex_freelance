// src/pages/ProductsPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./products.css";
import bg from "./bg.jpg";
import Hero from '../../Components/Hero/Hero';
import PRODUCTS from "./productsList"; // <-- data file

/* ---------- Config ---------- */
const PAGE_SIZE = 15; // change to 20 if you prefer 20-per-page

/* ---------- Helpers ---------- */
const currency = (n) => {
  if (n === null || n === undefined || n === "") return "—";
  const num = Number(n);
  if (!Number.isFinite(num)) return "—";
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
  } catch {
    return `₹ ${num.toLocaleString?.("en-IN") ?? String(num)}`;
  }
};

const ROUTE_FILTERS = {
  api: {
    label: "APIs",
    matches: (product) => String(product.type).toLowerCase() === "api",
    defaultType: "API",
  },
  intermediary: {
    label: "Intermediaries",
    matches: (product) => String(product.type).toLowerCase() !== "api",
    defaultType: "All",
  },
  granules: {
    label: "Granules",
    matches: (product) => String(product.type).toLowerCase() === "granules",
    defaultType: "All",
  },
  pellets: {
    label: "Pellets",
    matches: (product) => String(product.type).toLowerCase() === "pellets",
    defaultType: "All",
  },
};

/* ---------- ProductCard ---------- */
function ProductCard({ p }) {
  const imgSrc = p.image || bg;
  return (
    <article className="rr-product-card" key={p.id}>
      <Link className="rr-thumb-link" to={`/products/view/${p.slug}`}>
        <div className="rr-product-media">
          <img src={imgSrc} alt={p.name} onError={(e) => (e.currentTarget.src = bg)} />
        </div>
      </Link>

      <div className="rr-product-body">
        <h3 className="rr-product-title">{p.name}</h3>
        <div className="rr-product-cat">{p.type} • {p.category || "Uncategorized"}</div>

        {p.strengths?.length > 0 && (
          <div className="rr-product-strengths"><strong>Strengths:</strong> {p.strengths.join(" | ")}</div>
        )}

        <div className="rr-product-meta">
          <div className="rr-sku">SKU: {p.sku || "—"}</div>
        </div>

        <div className="rr-actions">
          <Link className="btn btn-primary" to={`/products/view/${p.slug}`}>View</Link>
          <a className="btn btn-outline" href={`mailto:communications@rraynex.com?subject=Quote Request: ${encodeURIComponent(p.name)}`}>Request Quote</a>
        </div>
      </div>
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
      navigate("/products", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  return <ProductDetail product={product} onBack={() => navigate(-1)} />;
}

/* ---------- ProductDetail (kept mostly the same) ---------- */
function ProductDetail({ product, onBack }) {
  // keep the ProductDetail implementation you had earlier (SEO, JSON-LD, longDescription etc.)
  // to avoid repetition I assume you paste your existing ProductDetail code here unchanged.
  // For brevity, a simplified render is shown:
  return (
    <article className="rr-detail">
      <button className="back-link" onClick={onBack}>← Back to products</button>
      <div className="rr-detail-grid">
        <div>
          <figure className="rr-detail-media" aria-hidden>
            <img src={bg} alt={`${product.name} — ${product.type}`} onError={(e) => (e.currentTarget.src = "/assets/products/placeholder.jpg")} width="640" height="480" loading="lazy" />
          </figure>
        </div>

        <div className="rr-detail-body">
          <h1>{product.name}</h1>
          <div className="rr-product-cat"><span>{product.category}</span> • <span>{product.type}</span></div>
          <p className="rr-desc">{product.description}</p>

          <div className="rr-price-card">
            <div>
              <div className="price" aria-hidden>{currency(product.price)}</div>
              <div className="unit">/ {product.unit || "kg"}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="rr-cta-buttons">
                <a className="btn-primary" href={`mailto:communications@rraynex.com?subject=${encodeURIComponent("Quote Request: " + product.name)}&body=${encodeURIComponent("Please share quotation, lead time and sample details for SKU: " + product.sku)}`}>Request Quote</a>
                <a className="btn btn-outline" href="/assets/Rraynex_Corp_Profile.pdf" target="_blank" rel="noreferrer">Download Brochure</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full width sections (keep your full content here as in your original ProductDetail) */}
      <div className="rr-fullwidth">
        <section aria-labelledby="product-overview" style={{ marginBottom: 18 }}>
          <h2 id="product-overview">Product overview</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {product.description}
          </p>
        </section>

        <section id="product-specs" className="rr-specs" style={{ marginBottom: 18 }}>
          <h3>Technical specifications</h3>
          <dl>
            <div style={{ marginBottom: 8 }}>
              <dt style={{ fontWeight: 700 }}>SKU</dt>
              <dd style={{ margin: 0 }}>{product.sku}</dd>
            </div>
            <div style={{ marginBottom: 8 }}>
              <dt style={{ fontWeight: 700 }}>Type</dt>
              <dd style={{ margin: 0 }}>{product.type}</dd>
            </div>
            <div style={{ marginBottom: 8 }}>
              <dt style={{ fontWeight: 700 }}>Category</dt>
              <dd style={{ margin: 0 }}>{product.category}</dd>
            </div>
            <div style={{ marginBottom: 8 }}>
              <dt style={{ fontWeight: 700 }}>Price</dt>
              <dd style={{ margin: 0 }}>{currency(product.price)} / {product.unit}</dd>
            </div>
          </dl>
        </section>
      </div>
    </article>
  );
}

/* ---------- Main ProductsPage ---------- */

export default function ProductsPage() {
  const navigate = useNavigate();
  const { category: categorySlugRaw } = useParams();
  const categorySlug = categorySlugRaw ? categorySlugRaw.toLowerCase() : null;
  const routeFilter = categorySlug ? ROUTE_FILTERS[categorySlug] : null;

  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");

  // Show more state
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category || "Uncategorized")))],
    []
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.type || "Unknown")))],
    []
  );

  useEffect(() => {
    if (categorySlug && !routeFilter) {
      navigate("/products", { replace: true });
      return;
    }
    if (routeFilter) {
      setType(routeFilter.defaultType);
      setCategory("All");
    }
    // reset visible count when route changes
    setVisibleCount(PAGE_SIZE);
  }, [categorySlug, routeFilter, navigate]);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let out = PRODUCTS.filter((p) => {
      if (routeFilter && !routeFilter.matches(p)) return false;
      if (type !== "All" && p.type !== type) return false;
      if (category !== "All" && (p.category || "Uncategorized") !== category) return false;
      if (!ql) return true;
      return (
        (p.name || "").toLowerCase().includes(ql) ||
        (p.sku || "").toLowerCase().includes(ql) ||
        (p.tags || []).some((t) => String(t).toLowerCase().includes(ql))
      );
    });

    if (sort === "price-asc") out = out.sort((a, b) => (Number(a.price || 0) - Number(b.price || 0)));
    if (sort === "price-desc") out = out.sort((a, b) => (Number(b.price || 0) - Number(a.price || 0)));

    return out;
  }, [q, type, category, sort, routeFilter]);

  const visibleList = list.slice(0, visibleCount);

  function handleShowMore() {
    setVisibleCount((v) => Math.min(list.length, v + PAGE_SIZE));
  }

  return (
    <div>
      <Hero
        title={routeFilter ? `Our ${routeFilter.label}` : "Our Product Portfolio"}
        subtitle="Delivering trusted pharmaceutical solutions — Intermediates, APIs, Pellets, and Granules — ensuring quality every step of the way."
        plink="#products"
        ptitle="Explore Products"
        slink="/assets/Rraynex_Corp_Profile.pdf"
        stitle="Download Brochure"
      />

      <main id="products" className="rr-wrap">
        <header className="rr-hero">
          <div>
            <h1>{routeFilter ? routeFilter.label : "Products"}</h1>
            <p className="muted">Pellets • Granules • APIs • Intermediates</p>
          </div>

          <div className="rr-hero-actions">
            <a className="btn btn-primary" href="mailto:communications@rraynex.com">Contact Sales</a>
          </div>
        </header>

        <section className="rr-controls">
          <input aria-label="Search products" placeholder="Search product name, SKU or tag" value={q} onChange={(e) => { setQ(e.target.value); setVisibleCount(PAGE_SIZE); }} />

          <select value={category} onChange={(e) => { setCategory(e.target.value); setVisibleCount(PAGE_SIZE); }}>
            {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>

          <select value={type} onChange={(e) => { setType(e.target.value); setVisibleCount(PAGE_SIZE); }}>
            {types.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>

          <select value={sort} onChange={(e) => { setSort(e.target.value); setVisibleCount(PAGE_SIZE); }}>
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <div className="count">Showing {visibleList.length} of {list.length} results</div>
        </section>

        <section className="rr-grid" aria-live="polite">
          {visibleList.map((p) => (<ProductCard key={p.id} p={p} />))}
        </section>

        {/* SHOW MORE */}
        {list.length > visibleCount && (
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <button className="btn btn-outline" onClick={handleShowMore} aria-label="Show more products">
              Show more ({Math.min(PAGE_SIZE, list.length - visibleCount)} more)
            </button>
          </div>
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
