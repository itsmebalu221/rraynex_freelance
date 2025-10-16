import React from "react";
import "./hero.css"; // optional if you already have one
import brochurePdf from "../../Assets/Rraynex_Brochure.pdf";

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
  tone = "light",
  downloadLabel = "Download Brochure",
}) {
  const hasPrimary = Boolean(ptitle && plink);
  const hasSecondary = Boolean(stitle && slink);
  const showDefaultDownload = !hasPrimary && !hasSecondary;
  const shouldRenderCta = hasPrimary || hasSecondary || showDefaultDownload;
  const sectionStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    ...style,
  };

  if (tone === "dark") {
    sectionStyle["--hero-title-color"] = "#031d51";
    sectionStyle["--hero-lead-color"] = "#1f2933";
  }

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

        {shouldRenderCta && (
          <div className="products-hero-cta">
            {hasPrimary && (
              <a className="btn-primary" href={plink}>
                {ptitle}
              </a>
            )}
            {hasSecondary && (
              <a className="btn-outline" href={slink} target="_blank" rel="noreferrer">
                {stitle}
              </a>
            )}
            {showDefaultDownload && (
              <a className="btn-primary" href={brochurePdf} download>
                {downloadLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
