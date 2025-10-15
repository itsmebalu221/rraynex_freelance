import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./Luxe.css";

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(targetDate).getTime() - now.getTime());
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { d, h, m, s: sec, done: diff === 0 };
}

export default function Luxe() {
  const launchDate = useMemo(() => "2025-12-31T23:59:59", []);
  const { d, h, m, s, done } = useCountdown(launchDate);

  return (
    <main className="luxe" aria-labelledby="luxe-title">
      <Helmet>
        <title>Rraynex LUXE — Launching 31 December 2025</title>
        <meta
          name="description"
          content="Rraynex LUXE — launching 31 December 2025. First wave: diaper‑free baby essentials; Ashwagandha & Shilajit capsules; age‑tailored vitamin shots, tablets and capsules. Join the early list."
        />
        <link rel="canonical" href="https://rraynex.com/rraynex-luxe" />
        <meta property="og:title" content="Rraynex LUXE — Launching 31 December 2025" />
        <meta property="og:description" content="First wave: diaper‑free baby care, Ashwagandha/Shilajit capsules, and age‑tailored vitamin shots & tablets. Join the early list." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="luxe-bg" aria-hidden />
      <div className="luxe-noise" aria-hidden />

      <section className="luxe-hero">
        <div className="glow" aria-hidden />
        <h1 id="luxe-title" className="luxe-logo">Rraynex LUXE</h1>
        <p className="luxe-tag">Wellness • Elegance • Craft</p>
        <h2 className="luxe-headline">Launching 31 December 2025</h2>

        <div className="luxe-countdown" role="timer" aria-live="polite">
          <div className="time"><span className="num">{String(d).padStart(2, "0")}</span><span className="lbl">Days</span></div>
          <div className="sep">:</div>
          <div className="time"><span className="num">{String(h).padStart(2, "0")}</span><span className="lbl">Hours</span></div>
          <div className="sep">:</div>
          <div className="time"><span className="num">{String(m).padStart(2, "0")}</span><span className="lbl">Minutes</span></div>
          <div className="sep">:</div>
          <div className="time"><span className="num">{String(s).padStart(2, "0")}</span><span className="lbl">Seconds</span></div>
        </div>

        <p className="luxe-sub">An exclusive line that blends science, design and indulgence. Be first to know.</p>

        <form className="luxe-cta" onSubmit={async (e) => {
          e.preventDefault();
          const email = e.target.email.value;
          try {
            const res = await fetch('/api/luxe-register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
            if (res.ok) {
              alert("Thanks! You'll be notified for Luxe early access.");
              e.target.reset();
            } else {
              alert("Registration failed. Please try again.");
            }
          } catch {
            alert("Network error. Please try again later.");
          }
        }}>
          <input className="luxe-input" name="email" type="email" placeholder="Enter your email for early access" required />
          <button className="luxe-button" type="submit">Notify Me</button>
        </form>

        <div className="chips" aria-hidden>
          <span>Science-led</span><span>Premium</span><span>Limited</span>
        </div>

        <div className="nav-links">
          <Link to="/" className="home-link">← Back to Home</Link>
          <Link to="/products" className="home-link">Explore Products</Link>
        </div>
      </section>

      {/* Panels removed as requested */}

      <section className="luxe-lineup" aria-labelledby="luxe-lineup-title">
        <h2 id="luxe-lineup-title" className="lineup-title">First to launch</h2>
        <div className="lineup-grid">
          <article className="lineup-card">
            <div className="badge">Baby</div>
            <h3>Diaper‑free comfort</h3>
            <p>
              Inspired by diaper‑free routines, our baby essentials pair ultra‑soft textiles with breathable
              design for all‑day dryness and skin kindness.
            </p>
          </article>
          <article className="lineup-card">
            <div className="badge">Ayurveda</div>
            <h3>Ashwagandha & Shilajit</h3>
            <p>
              Potent root and resin capsules crafted for daily vitality—standardized extracts, clean excipients, and
              consistent actives in every serve.
            </p>
          </article>
          <article className="lineup-card">
            <div className="badge">Vitamins</div>
            <h3>Age‑tailored nutrition</h3>
            <p>
              Vitamin shots, tablets, and capsules designed by age bracket for meaningful outcomes—smart dosing,
              great adherence, zero fuss.
            </p>
          </article>
        </div>
      </section>

      <footer className="luxe-footer">
        <small>© {new Date().getFullYear()} Rraynex. LUXE is coming soon.</small>
      </footer>

      {/* Decorative particles */}
      <div className="orbs" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{
            animationDelay: `${i * 0.35}s`,
            left: `${(i * 83) % 100}%`
          }} />
        ))}
      </div>
    </main>
  );
}
