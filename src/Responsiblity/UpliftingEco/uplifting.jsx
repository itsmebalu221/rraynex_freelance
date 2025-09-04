import React, { useEffect, useRef } from "react";
import { Globe, Lightbulb, Cog, ArrowRight, Heart } from "lucide-react";
import "./ecosys.css";

export default function Ecosystem() {
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
    <main className="ecosystem">
      {/* HERO */}
      <section className="ecosystem-hero">
        <div className="hero-inner">
          <div className="hero-icon">
            <Heart className="w-16 h-16 text-orange-400" />
          </div>
          <h1 className="hero-title">Uplifting the Ecosystem</h1>
          <p className="hero-lead">
            At Rraynex, we recognize the vital role played by smaller contract manufacturers in the pharmaceutical industry. 
            We are committed to empowering and uplifting the ecosystem of smaller manufacturers through our network, 
            resources, and expertise.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="ecosystem-intro animate-on-scroll">
        <div className="intro-card">
          <h2>Empowering Growth Together</h2>
          <p>
            Our initiatives focus on creating meaningful partnerships that drive sustainable growth and innovation 
            across the pharmaceutical manufacturing landscape.
          </p>
        </div>
      </section>

      {/* INITIATIVE AREAS */}
      <section className="ecosystem-areas">
        <h2 className="section-heading animate-on-scroll">Our Initiative Areas</h2>
        
        <div className="ecosystem-grid animate-on-scroll">
          <div className="ecosystem-card" style={{ animationDelay: '0.1s' }}>
            <div className="ecosystem-image">
              <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" alt="Access to Markets" />
              <div className="image-overlay">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ecosystem-content">
              <h3 className="ecosystem-title">Access to Markets</h3>
              <p className="ecosystem-text">
                We work closely with smaller contract manufacturers to help them access new markets across the globe. 
                We provide them with the necessary resources and support to help them navigate complex regulatory 
                environments and expand their reach.
              </p>
              <div className="ecosystem-arrow">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="ecosystem-card" style={{ animationDelay: '0.2s' }}>
            <div className="ecosystem-image">
              <img src="https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" alt="Product Development" />
              <div className="image-overlay">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ecosystem-content">
              <h3 className="ecosystem-title">Product Development</h3>
              <p className="ecosystem-text">
                We understand the importance of product development in driving growth for smaller contract manufacturers. 
                Our team of experts work closely with them to identify product opportunities, conduct market research, 
                and develop innovative products that meet the needs of their customers.
              </p>
              <div className="ecosystem-arrow">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="ecosystem-card" style={{ animationDelay: '0.3s' }}>
            <div className="ecosystem-image">
              <img src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" alt="Manufacturing Support" />
              <div className="image-overlay">
                <Cog className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ecosystem-content">
              <h3 className="ecosystem-title">Manufacturing Support</h3>
              <p className="ecosystem-text">
                We provide our smaller contract manufacturers with access to our network of resources and suppliers 
                to help them optimize their manufacturing processes. We also provide them with training and support 
                to ensure that they meet the highest quality and compliance standards.
              </p>
              <div className="ecosystem-arrow">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="impact-metrics animate-on-scroll">
        <h2 className="section-heading">Partnership Impact</h2>
        <div className="metrics-grid animate-on-scroll">
          <div className="metric" style={{ animationDelay: '0.1s' }}>
            <div className="metric-value">50+</div>
            <div className="metric-label">Partner Manufacturers</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.2s' }}>
            <div className="metric-value">25</div>
            <div className="metric-label">Global Markets</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.3s' }}>
            <div className="metric-value">200+</div>
            <div className="metric-label">Products Launched</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.4s' }}>
            <div className="metric-value">85%</div>
            <div className="metric-label">Revenue Growth</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.5s' }}>
            <div className="metric-value">1000+</div>
            <div className="metric-label">Training Hours</div>
          </div>
          <div className="metric" style={{ animationDelay: '0.6s' }}>
            <div className="metric-value">95%</div>
            <div className="metric-label">Partner Satisfaction</div>
          </div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="ecosystem-commitment animate-on-scroll">
        <div className="commitment-card">
          <div className="commitment-icon">
            <Heart className="w-12 h-12 text-orange-500" />
          </div>
          <h2>Building a Sustainable Future Together</h2>
          <p>
            We believe that by uplifting the ecosystem of smaller contract manufacturers, we can create a more 
            vibrant and sustainable pharmaceutical industry. We are committed to working with them as partners, 
            sharing our knowledge and expertise, and providing them with the support they need to succeed.
          </p>
          <p>
            While we are still in the process of developing and implementing our initiatives, we are committed 
            to making a positive impact on the ecosystem of smaller contract manufacturers and will continue to 
            update our stakeholders on our progress. We recognize that uplifting the ecosystem of smaller 
            manufacturers is an ongoing journey, and we are committed to continuously improving our initiatives 
            to create a more sustainable and equitable pharmaceutical industry.
          </p>
          <div className="commitment-cta">
            <button className="btn btn-primary">Partner With Us</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </section>
    </main>
  );
}