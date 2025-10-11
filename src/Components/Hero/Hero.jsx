import React from "react";
import "./hero.css"; // optional if you already have one

export default function Hero(props) {
  return (
    <section
      className="products-hero"
      style={{
        backgroundImage: `url(${props.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* optional dark overlay for better text contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.45), rgba(0,0,0,0.55))",
          zIndex: 0,
        }}
      ></div>

      <div className="products-hero-content" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="products-hero-title">{props.title}</h1>
        <p className="products-hero-lead">{props.subtitle}</p>

        {/* Optional CTA Buttons */}
        {(props.ptitle || props.stitle) && (
          <div className="products-hero-cta">
            {props.ptitle && (
              <a className="btn-primary" href={props.plink}>
                {props.ptitle}
              </a>
            )}
            {props.stitle && (
              <a
                className="btn-outline"
                href={props.slink}
                target="_blank"
                rel="noreferrer"
              >
                {props.stitle}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
