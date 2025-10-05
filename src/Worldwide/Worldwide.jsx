import React, { useMemo, useState, useEffect } from "react";
import "./Worldwide.css";

/* Region data (populated with your provided copy) */
const REGIONS = {
  ASIA: {
    title: "Asia",
    text:
      `Looking for a pharmaceutical company with a strong presence in the Asian market? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

Our primary markets include India, Bangladesh, Nepal, Bhutan, Sri Lanka, the Philippines, Myanmar, Vietnam, Cambodia, Hong Kong, Australia, Indonesia, Pakistan, and Afghanistan. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Asian market, we invite you to reach out to us today.`,
    countries: [
      "India",
      "Nepal",
      "Sri Lanka",
      "Indonesia"
    ]
  },

  AFRICA: {
    title: "Africa",
    text:
      `Looking for a pharmaceutical company with a strong presence in the Africa region? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

We work all over Africa. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Middle East and North African market, we invite you to reach out to us today.`,
    countries: [
      "Nigeria",
      "South Africa",
      "Kenya",
      "Ghana",
      "Egypt",
    ]
  },

  LATAM: {
    title: "Latin America",
    text:
      `At Rraynex, we are proud to have a deeply penetrated presence in the Latin American, central and South American market, providing a wide range of healthcare solutions to the region. With our extensive experience in the industry, we have established ourselves as a reliable partner to healthcare providers, offering high-quality semi-finished dosages, finished dosage forms, feeds, veterinary products, and more.

Our commitment to providing the best healthcare solutions has enabled us to secure several product registrations, allowing us to offer an extensive range of products to our clients. Our primary markets include Brazil, Mexico, Argentina, Colombia, Peru, Ecuador, Chile, Venezuela, Guatemala, Caribbean islands, and more.

At RRAYNEX, we believe in maintaining the highest standards of quality, safety, and efficacy in our products. To achieve this, we work closely with regulatory bodies in each country to ensure compliance with local regulations and guidelines.`,
    countries: [
      "Brazil",
      "Mexico",
      "Argentina",
      "Colombia",
      "Peru",
      "Ecuador"
    ]
  },

  CIS: {
    title: "CIS & E. Europe",
    text:
      `Looking for a pharmaceutical company with a strong presence in the CIS region? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

Our primary markets include Russia, Kazakhstan, Uzbekistan, Azerbaijan, Belarus and more. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Middle East and North African market, we invite you to reach out to us today.`,
    countries: [
      "Russia",
      "Kazakhstan",
      "Uzbekistan",
      "Azerbaijan",
      "Belarus",
      "Armenia"
    ]
  },

  MENA: {
    title: "MENA",
    text:
      `Looking for a pharmaceutical company with a strong presence in the MENA region? Look no further than our company! With a diverse portfolio of finished dosage forms and several products under registration, we are committed to providing high-quality healthcare products to patients across the region.

Our primary markets include Saudi Arabia, UAE, Iran, Iraq, Jordan, Algeria, and Egypt, among others. With our deeply penetrated presence in these markets, we are uniquely positioned to meet the needs of patients and healthcare providers alike.

We are also actively seeking new partnerships and collaborations. If you are interested in working with a reliable and experienced pharmaceutical company in the Middle East and North African market, we invite you to reach out to us today.`,
    countries: [
      "Saudi Arabia",
      "UAE",
      "Iran",
      "Iraq",
      "Jordan",
      "Algeria",
      "Egypt"
    ]
  }
};

export default function WorldWide() {
  const keys = useMemo(() => Object.keys(REGIONS), []);
  const [selected, setSelected] = useState(keys[0]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `Worldwide Presence | ${REGIONS[selected].title} — Rraynex`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", REGIONS[selected].text);
    }
  }, [selected]);

  const region = REGIONS[selected];

  return (
    <div className="worldwide-wrap">
      {/* HERO */}
      <section className="products-hero">
        <div className="products-hero-content">
          <h1 className="products-hero-title">Our Global Presence</h1>
          <p className="products-hero-lead">
            We offer high-quality pellets, granules, APIs, and intermediates, backed by WHO-GMP compliance and global trust.
          </p>
        </div>
      </section>

      {/* Framed panel with left card + right main area */}
      <div className="panel-wrap" id="panel">
        <div className="frame" role="region" aria-label="Region panel">
          <aside className="side" aria-label="Regions">
            <h4>Regions</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {keys.map((k) => {
                const r = REGIONS[k];
                const active = k === selected;
                return (
                  <button
                    key={k}
                    onClick={() => setSelected(k)}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 8,
                      textAlign: "left",
                      background: active ? "linear-gradient(90deg, rgba(255,122,0,0.06), rgba(11,48,79,0.02))" : "#fff",
                      border: active ? "2px solid rgba(255,122,0,0.12)" : "1px solid rgba(11,48,79,0.06)",
                      cursor: "pointer",
                      fontWeight: 700,
                      color: "#0b304f"
                    }}
                    aria-pressed={active}
                  >
                    <div style={{ width:36, height:36, borderRadius:8, background:"#fff", border:"1px solid rgba(11,48,79,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>
                      {k[0]}
                    </div>
                    <div>
                      <div style={{ fontSize:14 }}>{r.title}</div>
                      <div style={{ fontSize:12, color:"#6b7280" }}>{r.countries.slice(0,3).join(", ")}{r.countries.length>3 ? "…" : ""}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop:12, color:"#6b7280", fontSize:13 }}>
              <strong>Note</strong>
              <div style={{ marginTop:6 }}>Select a region to view key markets and contact information.</div>
            </div>
          </aside>

          <main className="main-area" aria-live="polite">
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:72, height:72, borderRadius:10, background:"var(--accent)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:20 }}>
                {region.title[0]}
              </div>
              <div>
                <h3 style={{ margin:0, color:"#173860" }}>{region.title}</h3>
                <div style={{ color:"#6b7280", fontSize:13 }}>Regional market presence & capabilities</div>
              </div>
            </div>

            <div className="placeholder" style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
              {region.text}
            </div>

            <div className="chips" aria-hidden style={{ marginTop: 16 }}>
              {region.countries.map((c) => (
                <span key={c} style={{ padding:"6px 10px", background:"#fff", borderRadius:999, border:"1px solid rgba(11, 48, 79, 0.47)", color:"#173860", fontSize:13, fontWeight:600, marginRight:8, display:"inline-block", marginBottom:8 }}>
                  {c}
                </span>
              ))}
            </div>
          </main>
        </div>

        {/* four stat cards */}
        <div className="cards-row" role="list" aria-label="Global statistics">
          <div className="card" role="listitem"><div className="num">50+</div><div className="lbl">Countries</div></div>
          <div className="card" role="listitem"><div className="num">100+</div><div className="lbl">Product registrations</div></div>
          <div className="card" role="listitem"><div className="num">15+</div><div className="lbl">Years experience</div></div>
          <div className="card" role="listitem"><div className="num">1000+</div><div className="lbl">Healthcare partners</div></div>
        </div>
      </div>
    </div>
  );
}
