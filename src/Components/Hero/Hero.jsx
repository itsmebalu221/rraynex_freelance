import React from "react";
import "./hero.css"; // optional if you already have one

export default function Hero({
  title,
  subtitle,
  bgImage,
  background,
  overlay = bgImage ? true : false,
  overlayGradient = "linear-gradient(to bottom right, rgba(0,0,0,0.45), rgba(0,0,0,0.55))",
  ptitle,
  plink,
  stitle,
  slink,
  className = "",
  contentClassName = "",
  style = {},
}) {
  const sectionStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    ...style,
  };

  if (bgImage) {
    sectionStyle.backgroundImage = `url(${bgImage})`;
  } else if (background) {
    sectionStyle.background = background;
  } else if (!sectionStyle.background && !sectionStyle.backgroundImage) {
    sectionStyle.background = "#031d51";
  }

  const sectionClassName = ["products-hero", className].filter(Boolean).join(" ");
  const contentClasses = ["products-hero-content", contentClassName].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName} style={sectionStyle}>
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: overlayGradient,
            zIndex: 0,
          }}
          aria-hidden
        />
      )}

      <div className={contentClasses} style={{ position: "relative", zIndex: 1 }}>
        <h1 className="products-hero-title">{title}</h1>
        <p className="products-hero-lead">{subtitle}</p>

        {(ptitle || stitle) && (
          <div className="products-hero-cta">
            {ptitle && (
              <a className="btn-primary" href={plink}>
                {ptitle}
              </a>
            )}
            {stitle && (
              <a className="btn-outline" href={slink} target="_blank" rel="noreferrer">
                {stitle}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
