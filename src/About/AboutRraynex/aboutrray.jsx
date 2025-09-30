import React, { useEffect, useRef } from "react";
import "./aboutrray.css";
import GMP from './GMP.png'; 
import WHO_GMP from './who-gmp.png';
import EUGMP from './eu-gmp.jpeg';
import ISO9001 from './iso-9001.png';
import ISO14001 from './iso-14001.jpg';
import ISO25001 from './iso-25001.png';
import Halal from './halal.jpg';
import Kosher from './koshir.png';
import Hero from "../../Components/Hero/Hero";

export default function AboutUs() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <main className="about">
      {/* HERO */}
      <Hero 
              title="About Us"
              subtitle="We are a healthcare company focused on delivering innovative and accessible solutions with quality at the core. Partnering globally to build a reliable, future-ready ecosystem."
              plink="#products"
              ptitle="Explore Products"
              slink="/assets/Rraynex_Corp_Profile.pdf"
              stitle="Download Brochure"
            />

      {/* STATS */}
      <section className="about-stats animate-on-scroll">
        <div className="stat" style={{ animationDelay: '0.1s' }}>
          <div className="stat-num">58+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat" style={{ animationDelay: '0.2s' }}>
          <div className="stat-num">100%</div>
          <div className="stat-label">Quality Focus</div>
        </div>
        <div className="stat" style={{ animationDelay: '0.3s' }}>
          <div className="stat-num">24/7</div>
          <div className="stat-label">Partner Support</div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="about-panels animate-on-scroll">
        <article className="panel" style={{ animationDelay: '0.1s' }}>
          <h3 className="panel-title">Our Vision</h3>
          <p className="panel-text">
            To be a leading global healthcare company that transforms lives by
            providing innovative and accessible healthcare solutions.
          </p>
        </article>

        <article className="panel" style={{ animationDelay: '0.2s' }}>
          <h3 className="panel-title">Our Mission</h3>
          <p className="panel-text">
            Enable reliable access to relevant, affordable medicines by partnering with
            manufacturers and distributors, ensuring safety, efficacy, and consistent
            customer-first service across every market we serve.
          </p>
        </article>
      </section>

      {/* VALUES / PILLARS */}
      {/* Place inside your component where the section should render.
   Replace badge paths with your actual image URLs or import them at top:
   import gmpBadge from './assets/certs/gmp.png';
   OR use public path: '/assets/certs/gmp.png'
*/
      }
<section className="about-pills" aria-labelledby="certs-heading">
  <h2 id="certs-heading" className="section-heading">Regulatory Certifications</h2>
  <div className="section-sub">
    100% auditable facility with full document support — DMF (open & closed parts), VQM, TSE/BSE/MSDS, stability data and robust quality systems.
  </div>

  <div className="cert-top">
    {/* Left: copy + bulleted list */}
    <div className="cert-copy" role="region" aria-label="Certifications list">
      <ul aria-live="polite">
        <li>GMP</li>
        <li>WHO GMP — Audited; approvals expected</li>
        <li>EUGMP — Targeted 2026</li>
        <li>ISO 9001</li>
        <li>ISO 14001</li>
        <li>ISO 25001</li>
        <li>Halal &amp; Kosher certified</li>
      </ul>

      <p>
        100% auditable facility with all document support like DMF (open and closed parts), VQM support,
        TSE/BSE/MSDS support, and stability data available upon request.
      </p>
    </div>

    {/* Right: badges (images) */}
    <div className="cert-badges" role="img" aria-roledescription="certification badges" aria-label="Certifications">
      <div style={{ fontWeight:700, color: 'var(--navy, #0b304f)' }}>Our Certifications</div>

      <div className="badge-grid" aria-hidden>
        {/* Replace the src values with your real badge image paths or imported variables */}
        <img src={GMP} alt="GMP badge" />
        <img src={WHO_GMP} alt="WHO GMP badge" />
        <img src={EUGMP} alt="EUGMP badge" />
        <img src={ISO9001} alt="ISO 9001 badge" />
        <img src={ISO14001} alt="ISO 14001 badge" />
        <img src={ISO25001} alt="ISO 25001 badge" />
        <img src={Halal} alt="Halal certification badge" />
        <img src={Kosher} alt="Kosher certification badge" />
      </div>
    </div>
  </div>

  {/* Pill grid with values/pillars */}
  
</section>


      {/* TIMELINE / MILESTONES */}
      <section className="about-timeline">
        <h2 className="section-heading animate-on-scroll">Milestones</h2>
        <div className="timeline animate-on-scroll">
          <div className="node" style={{ animationDelay: '0.1s' }}>
            <div className="node-dot" />
            <div className="node-card">
              <h5>Foundation</h5>
              <p>Establishment and vision to build a trusted, partner-first pharma company.</p>
            </div>
          </div>

          <div className="node" style={{ animationDelay: '0.2s' }}>
            <div className="node-dot" />
            <div className="node-card">
              <h5>Quality Systems</h5>
              <p>Standardized quality processes aligned with international benchmarks.</p>
            </div>
          </div>

          <div className="node" style={{ animationDelay: '0.3s' }}>
            <div className="node-dot" />
            <div className="node-card">
              <h5>Global Expansion</h5>
              <p>Entry into additional regions with scalable distribution and service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="about-cta-band animate-on-scroll">
        <div className="cta-card">
          <h3>Let's Build a Healthier Future Together</h3>
          <p>
            Looking to collaborate or learn more about our capabilities? Our team is ready
            to help.
          </p>
          <div className="about-cta">
            <button className="btn btn-primary">Partner With Us</button>
            <button className="btn btn-outline">Download Profile</button>
          </div>
        </div>
      </section>
    </main>
  );
}