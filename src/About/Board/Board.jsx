import React from "react";
import { Helmet } from "react-helmet-async";
import "./Board.css";
import raina from "./raina.png";
import nishit from "./nishit.png";

const DIRECTORS = [
  {
    name: "Ms. Raina Desai",
    title: "Director",
    photo: raina,
    summary:
      "Harvard Law School alumna and corporate advisor specialising in governance, strategy, and business management across regulated industries.",
    biography: [
      "YOUNG & DYNAMIC LEADER: Entrepreneurial legal professional focused on corporate law, governance, and strategic business management.",
      "GLOBAL BOARD EXPERIENCE: Director at Rraynex Pharmaceuticals P. Ltd, steering worldwide pellets, granules, and MUPS operations.",
      "ADVISORY & M&A: Director for Corporate Advisory Services and M&A at Desai Haribhakti & Co., delivering global tax, finance, and risk solutions; affiliated with the Bar Council of Maharashtra & Goa.",
      "INDEPENDENT DIRECTOR: Serves on the board of Sanghi Cements as one of the youngest independent directors in West India." 
    ],
    highlights: [
      "Harvard Law School alumna",
      "Corporate governance & strategy specialist",
      "Director, Rraynex Pharmaceuticals P. Ltd",
      "Director, Desai Haribhakti & Co.",
      "Independent Director, Sanghi Cements"
    ]
  },
  {
    name: "Mr. Nishit Gupta",
    title: "Director",
    photo: nishit,
    summary:
      "Engineer and MBA with international credentials from XLRI Jamshedpur, Oklahoma University, and ESC Rennes; drives technology-led growth across diversified enterprises.",
    biography: [
      "MULTI-DISCIPLINARY EXPERT: Combines engineering rigour with strategic management across manufacturing, mobility, and infrastructure.",
      "PHARMA LEADERSHIP: Director at Rraynex Pharmaceuticals P. Ltd overseeing global pellets, granules, and MUPS operations.",
      "SMART INFRASTRUCTURE: Director at Park Smart Solutions P. Ltd, pioneering multi-level robotic parking deployments worth over ₹4,800 crores across India.",
      "VERTICAL TRANSPORTATION: Director at LT Group of companies, delivering tailored elevator, escalator, and conveyor solutions across international markets." 
    ],
    highlights: [
      "Engineer & MBA with global academic pedigree",
      "Director, Rraynex Pharmaceuticals P. Ltd",
      "Director, Park Smart Solutions P. Ltd",
      "Director, LT Group of companies",
      "Precision technology & infrastructure specialist"
    ]
  }
];

export default function Board() {
  return (
    <main className="board" aria-labelledby="board-heading">
      <Helmet>
        <title>Board of Directors | Rraynex</title>
        <meta
          name="description"
          content="Meet the Rraynex Board of Directors — leaders guiding global pharmaceutical, infrastructure, and advisory initiatives with deep expertise in law, governance, and technology."
        />
      </Helmet>

      <section className="board-hero">
        <div className="board-hero__content">
          <p className="board-kicker">Leadership & Governance</p>
          <h1 id="board-heading">Board of Directors</h1>
          <p className="board-lead">
            Our board blends legal, strategic, and engineering excellence to steer Rraynex through global expansion, regulatory compliance, and sustainable innovation.
          </p>
        </div>
      </section>

      <section className="board-grid" aria-label="Directors">
        {DIRECTORS.map((director) => (
          <article key={director.name} className="board-card">
            <figure className="board-card__media">
              {director.photo ? (
                <img src={director.photo} alt={`${director.name} portrait`} loading="lazy" />
              ) : (
                <span className="board-card__placeholder" aria-hidden="true">
                  {director.name
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .join("")
                    .slice(0, 2)}
                </span>
              )}
            </figure>

            <div className="board-card__primary">
              <header className="board-card__header">
                <h2>{director.name}</h2>
                <p className="board-role">{director.title}</p>
                <p className="board-summary">{director.summary}</p>
              </header>

              <section className="board-card__section board-card__section--highlights">
                <h3 className="board-section-title">Leadership Snapshot</h3>
                <ul className="board-highlights">
                  {director.highlights.map((item, idx) => (
                    <li key={`${director.name}-highlight-${idx}`}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="board-card__secondary">
              <section className="board-card__section">
                <h3 className="board-section-title">Strategic Focus</h3>
                <ul className="board-biography">
                  {director.biography.map((item, idx) => (
                    <li key={`${director.name}-bio-${idx}`}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        ))}
      </section>

      <section className="board-closing" aria-label="Board philosophy">
        <h2>Governance that scales with ambition</h2>
        <p>
          With complementary strengths in corporate law, mergers and acquisitions, large-scale infrastructure, and advanced pharmaceutical manufacturing, our directors champion disciplined growth.
          They ensure Rraynex pursues bold opportunities while maintaining impeccable regulatory and ethical standards across every market we serve.
        </p>
      </section>
    </main>
  );
}
