import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './eco.css';
import pellets from "../../Home/pellets.png";
import granules from "./granules.png";
import apis from "./apis.jpeg";
import online from "./online.jpeg";
import { PRODUCTS } from '../../Products/ProductS/Products';

const CleanGlossyEcosystem = () => {
  // Filter products by category
  const pelletProducts = useMemo(() => 
    PRODUCTS.filter(p => p.family === 'pellets').slice(0, 8), 
    []
  );
  
  const granuleProducts = useMemo(() => 
    PRODUCTS.filter(p => p.family === 'granules').slice(0, 8), 
    []
  );
  
  const apiProducts = useMemo(() => 
    PRODUCTS.filter(p => p.family === 'api').slice(0, 8), 
    []
  );

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainers = [
      '.eco-scroll-container--pellets',
      '.eco-scroll-container--granules',
      '.eco-scroll-container--api'
    ];

    const intervals = scrollContainers.map(selector => {
      const container = document.querySelector(selector);
      if (!container) return null;

      return setInterval(() => {
        const cardWidth = container.querySelector('.eco-product-card-compact')?.offsetWidth || 0;
        const gap = 16; // 1rem gap
        const scrollAmount = cardWidth + gap;
        
        // Check if we're at the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          // Reset to beginning
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next product
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
          });
        }
      }, 3000); // Auto-scroll every 3 seconds
    });

    // Cleanup intervals on unmount
    return () => {
      intervals.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <>
      {/* Ecosystem Overview Section */}
      <section className="clean-glossy-section">
        <div className="clean-glossy-container">
          <div className="section-header">
            <h2 className="section-title">Our Healthcare Ecosystem</h2>
            <p className="section-subtitle">
              Comprehensive pharmaceutical solutions from pellets to APIs, manufactured under WHO-GMP standards
            </p>
          </div>

          {/* Pellets Section */}
          <div className="eco-category-section">
            <article className="eco-card eco-card--horizontal">
              {/* Left Side: Image + Content (70%) */}
              <div className="eco-card__main">
                <div className="eco-card__media" aria-hidden>
                  <img src={pellets} alt="Pellets illustration" loading="lazy" />
                </div>

                <div className="eco-card__body">
                  <h3>Pellets</h3>
                  <p>
                    Multiparticulate platforms engineered for controlled and delayed release. Uniform layering, 
                    tight size curves and reproducible dissolution help partners compress timelines with confidence.
                  </p>
                  <div className="eco-card__cta">
                    <Link className="eco-card__btn" to="/products/categories/pellets">
                      Explore Pellets
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Side: Product Carousel (30%) */}
              <div className="eco-card__sidebar">
                <div className="eco-sidebar-header">
                  <h4 className="eco-sidebar-title">Featured Products</h4>
                  <div className="eco-nav eco-nav--horizontal">
                    <button
                      className="eco-nav__btn eco-nav__btn--left"
                      onClick={() => {
                        const container = document.querySelector('.eco-scroll-container--pellets');
                        if (container) {
                          container.scrollTo({
                            left: container.scrollLeft - 300,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Scroll left"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="eco-nav__btn eco-nav__btn--right"
                      onClick={() => {
                        const container = document.querySelector('.eco-scroll-container--pellets');
                        if (container) {
                          container.scrollTo({
                            left: container.scrollLeft + 300,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Scroll right"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="eco-scroll-container eco-scroll-container--pellets eco-scroll-container--horizontal">
                  {pelletProducts.map((product) => (
                    <article key={product.id} className="eco-product-card-compact">
                      <div className="eco-product-card-compact__header">
                        <h5 className="eco-product-card-compact__name">{product.name}</h5>
                        <span className="eco-product-card-compact__badge">{product.type || product.category}</span>
                      </div>
                      <p className="eco-product-card-compact__description">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="eco-product-card-compact__footer">
                        <span className="eco-product-card-compact__grade">{product.grade}</span>
                        <Link 
                          to={`/products/view/${product.slug}`} 
                          className="eco-product-card-compact__link"
                        >
                          View →
                        </Link>
                      </div>
                    </article>
                  ))}
                  
                  {/* Explore More at end */}
                  <Link to="/products/categories/pellets" className="eco-sidebar-explore-card">
                    <div className="eco-sidebar-explore-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Explore All</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Granules Section */}
          <div className="eco-category-section">
            <article className="eco-card eco-card--horizontal eco-card--reverse">
              {/* Right Side: Product Carousel (30%) - shown first for reverse */}
              <div className="eco-card__sidebar">
                <div className="eco-sidebar-header">
                  <h4 className="eco-sidebar-title">Featured Products</h4>
                  <div className="eco-nav eco-nav--horizontal">
                    <button
                      className="eco-nav__btn eco-nav__btn--left"
                      onClick={() => {
                        const container = document.querySelector('.eco-scroll-container--granules');
                        if (container) {
                          container.scrollTo({
                            left: container.scrollLeft - 300,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Scroll left"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="eco-nav__btn eco-nav__btn--right"
                      onClick={() => {
                        const container = document.querySelector('.eco-scroll-container--granules');
                        if (container) {
                          container.scrollTo({
                            left: container.scrollLeft + 300,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Scroll right"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="eco-scroll-container eco-scroll-container--granules eco-scroll-container--horizontal">
                  {granuleProducts.map((product) => (
                    <article key={product.id} className="eco-product-card-compact">
                      <div className="eco-product-card-compact__header">
                        <h5 className="eco-product-card-compact__name">{product.name}</h5>
                        <span className="eco-product-card-compact__badge">{product.type || product.category}</span>
                      </div>
                      <p className="eco-product-card-compact__description">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="eco-product-card-compact__footer">
                        <span className="eco-product-card-compact__grade">{product.grade}</span>
                        <Link 
                          to={`/products/view/${product.slug}`} 
                          className="eco-product-card-compact__link"
                        >
                          View →
                        </Link>
                      </div>
                    </article>
                  ))}
                  
                  {/* Explore More at end */}
                  <Link to="/products/categories/granules" className="eco-sidebar-explore-card">
                    <div className="eco-sidebar-explore-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Explore All</span>
                  </Link>
                </div>
              </div>

              {/* Left Side: Image + Content (70%) */}
              <div className="eco-card__main">
                <div className="eco-card__media" aria-hidden>
                  <img src={granules} alt="Granules illustration" loading="lazy" />
                </div>

                <div className="eco-card__body">
                  <h3>Granules</h3>
                  <p>
                    Direct compression and wet granulation grades tuned for flow, blend uniformity and tablet integrity. 
                    Each batch is humidity-managed so high-speed lines stay predictable.
                  </p>
                  <div className="eco-card__cta">
                    <Link className="eco-card__btn" to="/products/categories/granules">
                      View Granules
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* APIs Section */}
          <div className="eco-category-section">
            <article className="eco-card eco-card--horizontal">
              {/* Left Side: Image + Content (70%) */}
              <div className="eco-card__main">
                <div className="eco-card__media" aria-hidden>
                  <img src={apis} alt="APIs illustration" loading="lazy" />
                </div>

                <div className="eco-card__body">
                  <h3>APIs & Intermediaries</h3>
                  <p>
                    WHO-GMP synthesis blocks with integrated impurity profiling and scalability from kilo labs to 
                    commercial reactors. Documentation packages are ready for global submissions.
                  </p>
                  <div className="eco-card__cta">
                    <Link className="eco-card__btn" to="/products/categories/api">
                      See API Portfolio
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Side: Product Carousel (30%) */}
              <div className="eco-card__sidebar">
                <div className="eco-sidebar-header">
                  <h4 className="eco-sidebar-title">Featured Products</h4>
                  <div className="eco-nav eco-nav--horizontal">
                    <button
                      className="eco-nav__btn eco-nav__btn--left"
                      onClick={() => {
                        const container = document.querySelector('.eco-scroll-container--api');
                        if (container) {
                          container.scrollTo({
                            left: container.scrollLeft - 300,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Scroll left"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="eco-nav__btn eco-nav__btn--right"
                      onClick={() => {
                        const container = document.querySelector('.eco-scroll-container--api');
                        if (container) {
                          container.scrollTo({
                            left: container.scrollLeft + 300,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      aria-label="Scroll right"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="eco-scroll-container eco-scroll-container--api eco-scroll-container--horizontal">
                  {apiProducts.map((product) => (
                    <article key={product.id} className="eco-product-card-compact">
                      <div className="eco-product-card-compact__header">
                        <h5 className="eco-product-card-compact__name">{product.name}</h5>
                        <span className="eco-product-card-compact__badge">{product.type || product.category}</span>
                      </div>
                      <p className="eco-product-card-compact__description">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="eco-product-card-compact__footer">
                        <span className="eco-product-card-compact__grade">{product.grade}</span>
                        <Link 
                          to={`/products/view/${product.slug}`} 
                          className="eco-product-card-compact__link"
                        >
                          View →
                        </Link>
                      </div>
                    </article>
                  ))}
                  
                  {/* Explore More at end */}
                  <Link to="/products/categories/api" className="eco-sidebar-explore-card">
                    <div className="eco-sidebar-explore-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Explore All</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Shopping Section */}
          <div className="eco-category-section">
            <article className="eco-card eco-card--reverse">
              <div className="eco-card__media" aria-hidden>
                <img src={online} alt="Online Shopping illustration" loading="lazy" />
              </div>

              <div className="eco-card__body">
                <h3>Rraynex Online Shopping</h3>
                <p>
                  Browse curated wellness essentials, OTC launches and pilot batches direct from Rraynex. 
                  Our online storefront makes it easier for partners to evaluate consumer-ready innovations.
                </p>
                <div className="eco-card__cta">
                  <Link className="eco-card__btn" to="/products/categories/rraynex-luxe">
                    Visit Store
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default CleanGlossyEcosystem;