import React, { useEffect, useRef } from "react";
import "./aboutrray.css";

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
      <section className="about-hero">
        <div className="about-hero__inner">
          <h1 className="about-title">About Us</h1>
          <p className="about-lead">
            We are a healthcare company focused on delivering innovative and accessible
            solutions with quality at the core—partnering globally to build a reliable,
            future-ready ecosystem.
          </p>
          <div className="about-cta">
            <button className="btn btn-primary">Know More</button>
            <button className="btn btn-outline">Contact Us</button>
          </div>
        </div>
      </section>

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
      <section className="about-pills">
        <h2 className="section-heading animate-on-scroll">What We Stand For</h2>

        <div className="pill-grid animate-on-scroll">
          <div className="pill" style={{ animationDelay: '0.1s' }}>
            <span className="dot" />
            <div>
              <h4 className="pill-title">Innovation</h4>
              <p className="pill-text">
                We invest in research and technology to keep pace with evolving global
                healthcare needs and deliver better outcomes.
              </p>
            </div>
          </div>

          <div className="pill" style={{ animationDelay: '0.2s' }}>
            <span className="dot" />
            <div>
              <h4 className="pill-title">Quality</h4>
              <p className="pill-text">
                Every process is built around quality—meeting international standards of
                safety and efficacy from development to distribution.
              </p>
            </div>
          </div>

          <div className="pill" style={{ animationDelay: '0.3s' }}>
            <span className="dot" />
            <div>
              <h4 className="pill-title">Partnerships</h4>
              <p className="pill-text">
                We collaborate with manufacturers to consistently produce high-quality
                products that meet technical and regulatory qualifications and create
                lasting value for our partners.
              </p>
            </div>
          </div>

          <div className="pill" style={{ animationDelay: '0.4s' }}>
            <span className="dot" />
            <div>
              <h4 className="pill-title">Global Reach</h4>
              <p className="pill-text">
                A growing footprint across markets enables reliable access and efficient
                distribution with localized support.
              </p>
            </div>
          </div>
        </div>
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