import React from "react";
import { useEffect, useState } from "react";
import "./CSR.css";

export default function CSR() {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const timer1 = setTimeout(() => setStatsVisible(true), 500);
    const timer2 = setTimeout(() => setPillsVisible(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="about csr-page">
      {/* HERO */}
      <section className="about-hero csr-hero">
        <div className="about-hero__inner">
          <h1 className={`about-title fade-in ${isVisible ? 'visible' : ''}`}>
            Corporate Social Responsibility
          </h1>
          <p className={`about-lead fade-in-delay ${isVisible ? 'visible' : ''}`}>
            At Rraynex, we believe that corporate social responsibility (CSR) is an essential part of our mission to make a positive impact on society. We are committed to conducting our business with integrity and in a socially responsible manner that benefits our stakeholders, communities, and the environment.
          </p>
          <div className="about-cta">
            <button className={`btn btn-primary slide-up ${isVisible ? 'visible' : ''}`}>Learn More</button>
            <button className={`btn btn-outline slide-up-delay ${isVisible ? 'visible' : ''}`}>Our Impact</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={`about-stats ${statsVisible ? 'stats-visible' : ''}`}>
        <div className="stat stat-1">
          <div className="stat-num">3</div>
          <div className="stat-label">Focus Areas</div>
        </div>
        <div className="stat stat-2">
          <div className="stat-num">100%</div>
          <div className="stat-label">Ethical Standards</div>
        </div>
        <div className="stat stat-3">
          <div className="stat-num">24/7</div>
          <div className="stat-label">Community Support</div>
        </div>
      </section>

      {/* ENVIRONMENTAL IMAGE */}
      <section className="image-section">
        <div className="image-container">
          <img 
            src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop" 
            alt="Environmental sustainability and green practices"
            className="section-image"
          />
          <div className="image-overlay">
            <h3>Environmental Stewardship</h3>
          </div>
        </div>
      </section>

      {/* CSR FOCUS AREAS */}
      <section className={`about-pills ${pillsVisible ? 'pills-visible' : ''}`}>
        <h2 className="section-heading">Our CSR Initiatives Focus Areas</h2>

        <div className="pill-grid">
          <div className="pill pill-1">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Ethics and Compliance</h4>
              <p className="pill-text">
                We are committed to upholding the highest ethical standards in all aspects of our business operations. Our Code of Conduct and Business Ethics policy outlines our commitment to compliance with all applicable laws and regulations, including those related to human rights, labor practices, and environmental protection.
              </p>
            </div>
          </div>

          <div className="pill pill-2">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Community Engagement</h4>
              <p className="pill-text">
                We recognize the importance of giving back to the communities in which we operate. We support various community initiatives and programs that promote health and wellbeing, education, and economic development.
              </p>
            </div>
          </div>

          <div className="pill pill-3">
            <span className="dot" />
            <div>
              <h4 className="pill-title">Environmental Stewardship</h4>
              <p className="pill-text">
                We are committed to minimizing our environmental impact and promoting sustainable business practices. We have implemented various initiatives to reduce our carbon footprint, including energy-efficient practices, waste reduction, and recycling programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY IMAGE */}
      <section className="image-section">
        <div className="image-container">
          <img 
            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop" 
            alt="Healthcare professionals working together"
            className="section-image"
          />
          <div className="image-overlay">
            <h3>Healthcare Innovation & Access</h3>
          </div>
        </div>
      </section>

      {/* COMMITMENT STATEMENT */}
      <section className="about-panels">
        <article className="panel panel-slide-left">
          <h3 className="panel-title">Our Commitment</h3>
          <p className="panel-text">
            While we are still in the process of developing and implementing our CSR initiatives, we are committed to making a positive impact on society and will continue to update our stakeholders on our progress.
          </p>
        </article>

        <article className="panel panel-slide-right">
          <h3 className="panel-title">Continuous Improvement</h3>
          <p className="panel-text">
            We recognize that CSR is an ongoing journey, and we are committed to continuously improving our CSR initiatives to make a positive impact on society and the environment.
          </p>
        </article>
      </section>

      {/* CTA BAND */}
      <section className="about-cta-band">
        <div className="cta-card cta-bounce">
          <h3>Join Us in Making a Difference</h3>
          <p>
            Interested in learning more about our CSR initiatives or exploring partnership opportunities? We'd love to hear from you.
          </p>
          <div className="about-cta">
            <button className="btn btn-primary">Get Involved</button>
            <button className="btn btn-outline">Contact CSR Team</button>
          </div>
        </div>
      </section>
    </main>
  );
}