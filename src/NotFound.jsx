import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.5rem" }}>
      <Helmet>
        <title>404 — Page Not Found | Rraynex Pharmaceuticals</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div style={{ maxWidth: 520 }}>
        <span style={{ fontSize: "4rem", fontWeight: 700, color: "#d2691e" }}>404</span>
        <h1 style={{ fontSize: "2rem", margin: "1rem 0" }}>We couldn&apos;t find that page.</h1>
        <p style={{ color: "#4b5563", marginBottom: "2rem" }}>
          The page you&apos;re looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary" style={{ padding: "0.75rem 1.5rem", borderRadius: 8, background: "#1d4ed8", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
