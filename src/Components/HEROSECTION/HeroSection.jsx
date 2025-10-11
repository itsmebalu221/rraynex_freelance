import React from "react";

/**
 * PharmaGranulesHero
 *
 * Props:
 *  - title (string) default: "Pharmaceutical Granules"
 *  - subtitle (string)
 *  - bgImage (string) background image URL
 *  - onBack (function) optional back handler; defaults to history.back()
 *  - height (string) optional, e.g. "24rem" or "60vh"
 */
export default function PharmaGranulesHero({
  title = "Pharmaceutical Granules",
  subtitle = "Precision-engineered granules for superior compressibility and uniform drug distribution",
  bgImage = "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1920",
  onBack = null,
  height = "24rem",
}) {
  function handleBack(e) {
    e && e.preventDefault();
    if (typeof onBack === "function") return onBack();
    if (typeof window !== "undefined" && window.history && window.history.length > 1) {
      window.history.back();
    } else {
      // fallback: no-op
      return;
    }
  }

  // inline styles for the outer container and important parts (keeps look consistent)
  const containerStyle = {
    position: "relative",
    height,
    overflow: "hidden",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(153,44,0,0.9), rgba(0,32,77,0.8))",
    
  };

  const contentWrap = {
    position: "relative",
    zIndex: 10,
    width: 1200,
    margin: "0 auto",
    padding: "0 24px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#fff",
  };

  const backBtnBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(255,255,255,0.85)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginBottom: 24,
    padding: "6px 8px",
    borderRadius: 8,
    transition: "color 0.18s ease, transform 0.12s ease",
  };

  const titleStyle = {
    fontSize: "clamp(28px, 5vw, 60px)", // scales from ~28px to 60px depending on viewport
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    marginBottom: 12,
    lineHeight: 1.08,
  };

  const subtitleStyle = {
    fontSize: "clamp(16px, 2.2vw, 20px)",
    color: "rgba(229,231,235,0.95)",
    maxWidth: 900,
    margin: 0,
    lineHeight: 1.45,
  };

  const arrowSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div style={containerStyle} role="banner" aria-label={title}>
      {/* responsive CSS injected locally so component is standalone */}
      <style>{`
        /* Small responsive tweaks */
        @media (max-width: 900px) {
          /* slightly reduce overlay intensity on small screens */
          div[style*="linear-gradient"] { background: linear-gradient(to right, rgba(153,44,0,0.88), rgba(0,32,77,0.86)); }
        }

        @media (max-width: 640px) {
          .phg-back-btn { margin-bottom: 18px; }
          .phg-content { padding: 0 16px; }
          .phg-title { text-align: left; }
        }

        /* hover & focus visible for keyboard users */
        .phg-back-btn:focus {
          outline: 3px solid rgba(255,255,255,0.16);
          outline-offset: 2px;
        }
        .phg-back-btn:hover { color: #ffffff; transform: translateX(-2px); }
      `}</style>

      <div style={overlayStyle} />

      <div style={contentWrap} className="phg-content">
        <button
          type="button"
          className="phg-back-btn"
          onClick={handleBack}
          aria-label="Back"
          style={backBtnBase}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
        >
          {/* arrow */}
          <span style={{ display: "inline-flex", width: 18, height: 18 }}>{arrowSvg}</span>
          <span style={{ fontSize: 15 }}>Back to Home</span>
        </button>

        <h1 style={titleStyle} className="phg-title">
          {title}
        </h1>

        <p style={subtitleStyle}>{subtitle}</p>
      </div>
    </div>
  );
}
