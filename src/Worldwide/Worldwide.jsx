import React, { useMemo, useState, useEffect } from "react";
import "./Worldwide.css";

/* Simple region data */
const REGIONS = {
  ASIA: {
    title: "Asia",
    text: "Established presence across South & Southeast Asia offering finished dosage forms, regulatory support and reliable supply chains.",
    countries: ["India", "Bangladesh", "Nepal", "Philippines", "Indonesia", "Australia"]
  },
  AFRICA: {
    title: "Africa",
    text: "Focused engagement across Africa through local partnerships, product registrations and distribution networks.",
    countries: ["Nigeria","South Africa","Kenya","Ghana","Morocco","Egypt"]
  },
  LATAM: {
    title: "Latin America",
    text: "Regional teams support commercial entry, regulatory filings and logistics across Central & South America.",
    countries: ["Brazil","Mexico","Argentina","Colombia","Peru","Chile"]
  },
  CIS: {
    title: "CIS & E. Europe",
    text: "Strategic presence and regulatory expertise across CIS and Eastern Europe.",
    countries: ["Russia","Kazakhstan","Uzbekistan","Azerbaijan","Belarus","Armenia"]
  },
  MENA: {
    title: "MENA",
    text: "Operating across MENA with established channels for regulatory compliance and market access.",
    countries: ["Saudi Arabia","UAE","Jordan","Iraq","Algeria","Egypt"]
  }
};

export default function WorldWide() {
  const keys = useMemo(() => Object.keys(REGIONS), []);
  const [selected, setSelected] = useState(keys[0]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `Worldwide Presence | ${REGIONS[selected].title} — Rraynex`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name","description"); document.head.appendChild(meta); }
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
              {keys.map(k => {
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

            <div className="placeholder">Map / Region details placeholder</div>

            <div className="chips" aria-hidden>
              {region.countries.map(c => (
                <span key={c} style={{ padding:"6px 10px", background:"#fff", borderRadius:999, border:"1px solid rgba(11, 48, 79, 0.47)", color:"#173860", fontSize:13, fontWeight:600 }}>{c}</span>
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
