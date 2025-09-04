import React, { useEffect, useRef } from "react";
import { Leaf, Globe, Lightbulb, Settings, ArrowRight } from "lucide-react";
import "./Sustainability.css";

export default function Sustainability() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
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
    <main className="sustainability">
      {/* HERO */}
      <section className="sustainability-hero">
        <div className="hero-inner">
          <div className="hero-icon">
            <Leaf className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="hero-title">Sustainability</h1>
          <p className="hero-lead">
            At Rraynex, we recognize the importance of sustainability in driving long-term success 
            and creating a positive impact on society and the environment. We are committed to 
            promoting sustainable practices across our operations and value chain.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="sustainability-intro animate-on-scroll">
        <div className="intro-card">
          <h2>Our Commitment</h2>
          <p>
            We are dedicated to continuously improving our sustainability initiatives to minimize 
            our environmental impact while supporting our partners in achieving their sustainability goals.
          </p>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="focus-areas">
        <h2 className="section-heading animate-on-scroll">Our Sustainability Focus Areas</h2>
        
        <div className="areas-grid animate-on-scroll">
          <div className="area-card" style={{ animationDelay: '0.1s' }}>
            <div className="area-icon">
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="area-title">Access to Markets</h3>
            <p className="area-text">
              We work closely with smaller contract manufacturers to help them access new markets 
              across the globe. We provide them with the necessary resources and support to help 
              them navigate complex regulatory environments and expand their reach.
            </p>
            <div className="area-arrow">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="area-card" style={{ animationDelay: '0.2s' }}>
            <div className="area-icon">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="area-title">Product Development</h3>
            <p className="area-text">
              We understand the importance of product development in driving growth for smaller 
              contract manufacturers. Our team of experts work closely with them to identify 
              product opportunities, conduct market research, and develop innovative products 
              that meet the needs of their customers.
            </p>
            <div className="area-arrow">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="area-card" style={{ animationDelay: '0.3s' }}>
            <div className="area-icon">
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="area-title">Manufacturing Support</h3>
            <p className="area-text">
              We provide our smaller contract manufacturers with access to our network of 
              resources and suppliers to help them optimize their manufacturing processes. 
              We also provide them with training and support to ensure that they meet the 
              highest quality and compliance standards.
            </p>
            <div className="area-arrow">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="sustainability-journey animate-on-scroll">
        <div className="journey-card">
          <div className="journey-icon">
            <Leaf className="w-12 h-12 text-green-500" />
          </div>
          <h2>Our Sustainability Journey</h2>
          <p>
            While we are still in the process of developing and implementing our sustainability 
            initiatives, we are committed to making a positive impact on the environment and 
            will continue to update our stakeholders on our progress.
          </p>
          <p>
            We recognize that sustainability is an ongoing journey, and we are committed to 
            continuously improving our sustainability initiatives to create a positive impact 
            on society and the environment.
          </p>
          <div className="journey-cta">
            <button className="btn btn-primary">Learn More</button>
            <button className="btn btn-outline">View Progress</button>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="impact-metrics animate-on-scroll">
        <h2 className="section-heading">Our Impact</h2>
        <div className="metrics-grid animate-on-scroll">
          <div className="metric" style={{ animationDelay: '0.1s' }}>
            <div className="metric-value">58+</div>
            <div className="metric-label">Countries Served</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.2s' }}>
            <div className="metric-value">100+</div>
            <div className="metric-label">Partner Manufacturers</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.3s' }}>
            <div className="metric-value">100%</div>
            <div className="metric-label">Quality Compliance</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.4s' }}>
            <div className="metric-value">24/7</div>
            <div className="metric-label">Global Support</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.5s' }}>
            <div className="metric-value">15+</div>
            <div className="metric-label">Years Experience</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.6s' }}>
            <div className="metric-value">500+</div>
            <div className="metric-label">Products Distributed</div>
          </div>
        </div>
      </section>
    </main>
  );
}