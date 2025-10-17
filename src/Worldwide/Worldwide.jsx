import React, { useMemo, useState, useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import "./Worldwide.css";
import header from "./header.jpg";

/* Region data (populated with your provided copy) */
const REGIONS = {
  ASIA: {
    title: "Asia",
    narrative: [
      "Rraynex partners with formulators across South and Southeast Asia to deliver pellet, granule, API, and FDF programs that meet WHO-GMP, CDSCO, and ASEAN pharmacopoeial requirements.",
      "Technical transfer squads based in India, Bangladesh, Sri Lanka, and Australia guide dossier preparation, stability studies, and scale-up so launches in emerging ASEAN markets stay on track."
    ],
    countries: [
      "India",
      "Bangladesh",
      "Nepal",
      "Bhutan",
      "Sri Lanka",
      "Philippines",
      "Myanmar",
      "Vietnam",
      "Cambodia",
      "Hong Kong",
      "Australia",
      "Indonesia",
      "Pakistan",
      "Afghanistan"
    ],
    highlights: [
      { title: "Regulatory reach", copy: "CTD dossiers aligned with CDSCO, TGA, and ASEAN regulators." },
      { title: "On-ground support", copy: "Process engineers deploy to partner plants for coating and compression validation." },
      { title: "Channel focus", copy: "Established networks in hospital tenders and specialty retail across South Asia." }
    ]
  },

  AFRICA: {
    title: "Africa",
    narrative: [
      "Our Africa portfolio supplies anglophone and francophone markets with pellets, DC granules, and APIs validated for humid-climate distribution and tender compliance.",
      "We collaborate with ministries of health and local distributors to localise labelling, pharmacovigilance reporting, and cold-chain packaging where required."
    ],
    countries: [
      "Nigeria",
      "South Africa",
      "Kenya",
      "Ghana",
      "Egypt",
      "Ethiopia",
      "Tanzania",
      "Uganda",
      "Morocco",
      "Ivory Coast",
      "Botswana",
      "Namibia"
    ],
    highlights: [
      { title: "Regulatory support", copy: "Dossier localisation for NAFDAC, SAHPRA, PPB, and GHS-compliant markets." },
      { title: "Therapy focus", copy: "Strong cardiovascular, anti-infective, and nutritional SKU mix for public tenders." },
      { title: "Partner enablement", copy: "In-market training on GMP documentation and stability monitoring." }
    ]
  },

  LATAM: {
    title: "Latin America",
    narrative: [
      "Rraynex supports Latin American partners with semi-finished pellets, APIs, and turnkey FDF solutions tailored to ANVISA, INVIMA, DIGEMID, and COFEPRIS standards.",
      "Regulatory and commercial teams help distributors navigate language localisation, cold-chain logistics, and launch planning from the Caribbean to the Southern Cone."
    ],
    countries: [
      "Brazil",
      "Mexico",
      "Argentina",
      "Colombia",
      "Peru",
      "Ecuador",
      "Chile",
      "Venezuela",
      "Guatemala",
      "Panama",
      "Costa Rica",
      "Dominican Republic",
      "Caribbean Islands"
    ],
    highlights: [
      { title: "Registrations", copy: "100+ filings across Brazil, Mexico, Argentina, and the Andean region." },
      { title: "Formats", copy: "Pellets for modified release, DC granules, nutraceutical sachets, and veterinary actives." },
      { title: "Commercial models", copy: "Private-label, licensing, and co-marketing programs for regional scale-up." }
    ]
  },

  CIS: {
    title: "CIS & E. Europe",
    narrative: [
      "Our CIS and Eastern Europe coverage includes dedicated synthesis blocks for complex APIs and sustained-release pellets with Russian and EAEU filings.",
      "We coordinate registration dossiers, pharmacopeial testing, and language-specific labelling to keep partners compliant through evolving regulatory frameworks."
    ],
    countries: [
      "Russia",
      "Kazakhstan",
      "Uzbekistan",
      "Azerbaijan",
      "Belarus",
      "Armenia",
      "Georgia",
      "Kyrgyzstan",
      "Moldova",
      "Ukraine"
    ],
    highlights: [
      { title: "Quality systems", copy: "ICH Q7 compliant manufacturing with serialisation-ready packaging." },
      { title: "Market coverage", copy: "Active networks in Russia, Kazakhstan, Uzbekistan, Azerbaijan, Belarus, and Armenia." },
      { title: "Support hubs", copy: "Technical liaisons in Almaty and Moscow for rapid issue resolution." }
    ]
  },

  MENA: {
    title: "MENA",
    narrative: [
      "We serve MENA markets with WHO-GMP certified pellets, APIs, and finished dose programs adapted for GCC, Levant, and North African regulatory pathways.",
      "From CTD dossier preparation to bioequivalence study coordination, our teams help partners accelerate hospital tenders and retail launches across the region."
    ],
    countries: [
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Bahrain",
      "Oman",
      "Jordan",
      "Iraq",
      "Iran",
      "Algeria",
      "Egypt",
      "Morocco",
      "Tunisia",
      "Lebanon"
    ],
    highlights: [
      { title: "Regulatory depth", copy: "Experience with SFDA, DHA, MOHAP, and CAPA procedures." },
      { title: "Therapeutic mix", copy: "Strong offerings in gastro, cardio-metabolic, women’s health, and nutraceutical segments." },
      { title: "Logistics", copy: "Temperature-controlled supply chain through Dubai and Jeddah hubs." }
    ]
  }
};

export default function WorldWide() {
  const keys = useMemo(() => Object.keys(REGIONS), []);
  const [selected, setSelected] = useState(keys[0]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeRegion = REGIONS[selected];
      const description = (activeRegion.metaDescription || activeRegion.narrative.join(" ")).trim();
      document.title = `Worldwide Presence | ${activeRegion.title} — Rraynex`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [selected]);

  const region = REGIONS[selected];

  return (
    <div className="worldwide-wrap">
      <Hero
        title="Our Global Presence"
        subtitle="We offer high-quality pellets, granules, APIs, and intermediates, backed by WHO-GMP compliance and global trust."
        
        
        plink="#products"
        ptitle="Explore Products"
        slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
        stitle="Download Brochure"
        bgImage={header}
        overlayGradient="linear-gradient(to bottom right, rgba(0, 0, 0, 0.72), rgba(51, 51, 51, 0.55))"
        tone="dark"
      
      />


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
                      <div style={{ fontSize:12, color:"#6b7280" }}>
                        {r.countries.length} markets • {r.countries.slice(0,3).join(", ")}
                        {r.countries.length>3 ? "…" : ""}
                      </div>
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

            <section className="region-text">
              {region.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </section>

            {region.highlights?.length > 0 && (
              <ul className="region-highlights">
                {region.highlights.map((item, idx) => (
                  <li key={item.title + idx}>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </li>
                ))}
              </ul>
            )}

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
          <div className="card" role="listitem"><div className="num">58+</div><div className="lbl">Countries</div></div>
          <div className="card" role="listitem"><div className="num">127+</div><div className="lbl">Product registrations</div></div>
          <div className="card" role="listitem"><div className="num">125 MT & 30 MT</div><div className="lbl">Pellets and Granules per month</div></div>
          <div className="card" role="listitem"><div className="num">1000+</div><div className="lbl">Healthcare partners</div></div>
        </div>
      </div>
    </div>
  );
}
