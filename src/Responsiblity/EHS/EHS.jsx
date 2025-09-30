import React, { useEffect, useRef,useState } from "react";
import { Shield, Leaf, Users, FileCheck, ArrowRight } from "lucide-react";
import "./ehs.css";

export default function EHS() {
  const observerRef = useRef(null);
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
    <main className="ehs">
      {/* HERO */}
      <section className="about-hero csr-hero">
        <div className="about-hero__inner">
          <h1 className={`about-title fade-in ${isVisible ? 'visible' : ''}`}>
            Environment Health and Safety
          </h1>
          <p className={`about-lead fade-in-delay ${isVisible ? 'visible' : ''}`}>
At Rraynex, we are committed to promoting a safe and healthy work environment for our employees and protecting the environment in which we operate. We believe that by prioritizing environmental, health, and safety (EHS) practices.</p>
          <div className="about-cta">
            <button className={`btn btn-primary slide-up ${isVisible ? 'visible' : ''}`}>Learn More</button>
            <button className={`btn btn-outline slide-up-delay ${isVisible ? 'visible' : ''}`}>Our Impact</button>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="ehs-intro animate-on-scroll">
        <div className="intro-card">
          <h2>Our EHS Commitment</h2>
          <p>
            Our EHS initiatives focus on creating meaningful change across three critical areas that define 
            our operational excellence and responsibility to our stakeholders.
          </p>
        </div>
      </section>

      {/* EHS FOCUS AREAS */}
      <section className="ehs-areas">
        <h2 className="section-heading animate-on-scroll">Our EHS Focus Areas</h2>
        
        <div className="ehs-grid animate-on-scroll">
          <div className="ehs-card" style={{ animationDelay: '0.1s' }}>
            <div className="ehs-image">
              <img src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" alt="Environmental Stewardship" />
              <div className="image-overlay">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ehs-content">
              <h3 className="ehs-title">Environmental Stewardship</h3>
              <p className="ehs-text">
                We recognize the importance of protecting the environment and reducing our environmental impact. 
                We have implemented a range of initiatives to reduce our greenhouse gas emissions, water usage, 
                and waste generation, including the use of renewable energy, water recycling, and waste reduction programs.
              </p>
              <div className="ehs-arrow">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="ehs-card" style={{ animationDelay: '0.2s' }}>
            <div className="ehs-image">
              <img src="https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" alt="Employee Health and Safety" />
              <div className="image-overlay">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ehs-content">
              <h3 className="ehs-title">Employee Health and Safety</h3>
              <p className="ehs-text">
                We are committed to providing our employees with a safe and healthy work environment. 
                We have implemented a range of initiatives to promote employee health and safety, including 
                safety training programs, ergonomic assessments, and regular safety audits.
              </p>
              <div className="ehs-arrow">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="ehs-card" style={{ animationDelay: '0.3s' }}>
            <div className="ehs-image">
              <img src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" alt="Regulatory Compliance" />
              <div className="image-overlay">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ehs-content">
              <h3 className="ehs-title">Regulatory Compliance</h3>
              <p className="ehs-text">
                We adhere to all applicable regulations and laws related to environmental, health, and safety. 
                We maintain an ongoing dialogue with regulators to stay abreast of changes to regulations and 
                ensure that our operations remain in compliance.
              </p>
              <div className="ehs-arrow">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="impact-metrics animate-on-scroll">
        <h2 className="section-heading">Our EHS Impact</h2>
        <div className="metrics-grid animate-on-scroll">
          <div className="metric" style={{ animationDelay: '0.1s' }}>
            <div className="metric-value">Zero</div>
            <div className="metric-label">Major Incidents</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.2s' }}>
            <div className="metric-value">100%</div>
            <div className="metric-label">Compliance Rate</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.3s' }}>
            <div className="metric-value">25%</div>
            <div className="metric-label">Waste Reduction</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.4s' }}>
            <div className="metric-value">30%</div>
            <div className="metric-label">Energy Efficiency</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.5s' }}>
            <div className="metric-value">500+</div>
            <div className="metric-label">Safety Training Hours</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.6s' }}>
            <div className="metric-value">15+</div>
            <div className="metric-label">EHS Certifications</div>
          </div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="ehs-commitment animate-on-scroll">
        <div className="commitment-card">
          <div className="commitment-icon">
            <Shield className="w-12 h-12 text-green-500" />
          </div>
          <h2>Our Ongoing EHS Journey</h2>
          <p>
            We recognize that EHS is an ongoing journey, and we are committed to continuously improving 
            our initiatives to create a positive impact on the environment and our employees. We believe 
            that by prioritizing EHS practices, we can create a sustainable future for our business and our stakeholders.
          </p>
          <p>
            While we are still in the process of developing and implementing our EHS initiatives, we are 
            committed to making a positive impact on the environment and our employees and will continue 
            to update our stakeholders on our progress.
          </p>
          <div className="commitment-cta">
            <button className="btn btn-primary">View EHS Report</button>
            <button className="btn btn-outline">Safety Guidelines</button>
          </div>
        </div>
      </section>
    </main>
  );
}