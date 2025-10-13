import React, { useState, useEffect } from "react";
import { Building2, ShoppingBag } from "lucide-react";
import "./overlay.css";
import logot from '../Header/logot.png'
export default function WelcomeOverlay({ onClose }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedRraynex");
    if (hasVisited) {
      setVisible(false);
      onClose?.();
    }
  }, [onClose]);

  const handleClose = () => {
    localStorage.setItem("hasVisitedRraynex", "true");
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 900); // fade duration
  };

  if (!visible) return null;

  return (
    <div className={`welcome-overlay ${fadeOut ? "fade-out" : ""}`}>
      {/* Background Layer */}
      <div className="overlay-bg" />
      <div className="overlay-gradient" />

      {/* Content */}
      <div className="overlay-content">
        <div className="logo-wrap">
          <div className="logo-glow" />
          <img
            src={logot}
            alt="Rraynex Logo"
            className="logo-img"
          />
        </div>

        <h1 className="overlay-title">Rraynex Pharmaceuticals</h1>
        <p className="overlay-sub">
          Innovation • Value • Growth
        </p>
        <p className="overlay-desc">
          Advancing pharmaceutical excellence — from formulation to global
          delivery. Empowering healthier lives through science and integrity.
        </p>

        <div className="overlay-buttons">
          <button onClick={handleClose} className="btn-primary">
            Explore Our Website →
          </button>
          <button
            onClick={() => {
              localStorage.setItem("hasVisitedRraynex", "true");
              window.location.href = "/rraynex-luxe";
            }}
            className="btn-outline"
          >
            Visit Rraynex LUXE
          </button>
        </div>

        <button onClick={handleClose} className="skip-btn">
          Skip
        </button>
      </div>
    </div>
  );
}
