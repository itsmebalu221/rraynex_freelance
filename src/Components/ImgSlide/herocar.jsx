import React, { useState, useEffect } from "react";
import "./hero.css";

const carouselImages = [
  "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hc-root" aria-roledescription="carousel" aria-label="Hero carousel">
      {/* slides */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`hc-slide ${index === currentSlide ? "hc-slide--visible" : ""}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${carouselImages.length}`}
        >
          <div
            className="hc-slide__bg"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
          <div className="hc-slide__overlay hc-slide__overlay--dark" aria-hidden="true" />
          <div className="hc-slide__overlay hc-slide__overlay--fade" aria-hidden="true" />
        </div>
      ))}

      {/* content */}
      <div className="hc-content">
        <h1 className="hc-title">
          Delivering Quality Healthcare
          <br />
          Across <span className="hc-title__accent">58+ Countries</span>
        </h1>

        <p className="hc-subtitle">
          Every <span className="hc-sub-accent-orange">Dose</span> Counts. Every{" "}
          <span className="hc-sub-accent-blue">Day</span> Matters.
        </p>

        <div className="hc-ctas">
          <button
            type="button"
            className="hc-btn hc-btn--primary"
            onClick={() => document.getElementById("second-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </button>
          <button
            type="button"
            className="hc-btn hc-btn--secondary"
            onClick={() => (window.location.href = "/contact")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* dots */}
      <div className="hc-dots" role="tablist" aria-label="Select slide">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`hc-dot ${index === currentSlide ? "hc-dot--active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-pressed={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
}
