import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import logo from "./logo.jpg";

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const menuItems = [
  { name: "Home", path: "/", submenu: [] },
  { name: "About", path: "/about", submenu: ["Vision & Values", "Milestone and Recognitions","Quality","Board of Directors"] },
  { name: "Responsibility", path: "/responsibility", submenu: ["CSR", "Sustainability", "EHS","Uplifting Ecosystem"] },
  { name: "Products", path: "/products", submenu: ["Pellets","Granules","API", "Intermediary"] },
  { name: "Manufacturing Facilities", path: "/manufacturing", submenu: [] }, // empty submenu
  { name: "Worldwide", path: "/worldwide", submenu: [] }, // empty submenu
  { name: "Contact Us", path: "/contact", submenu: [] },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(null); // for mobile submenu expand

  const closeMobile = () => setMobileOpen(false);
  const toggleIdx = (i) => setOpenIdx((p) => (p === i ? null : i));

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" onClick={closeMobile}>
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Desktop nav */}
      <nav className="navbar desktop-menu" aria-label="Main">
        <ul className="menu">
          {menuItems.map((item, i) => (
            <li key={i} className="menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
              >
                {item.name}
              </NavLink>

              {/* Render submenu only if exists */}
              {item.submenu.length > 0 && (
                <ul className="submenu">
                  {item.submenu.map((sub, j) => (
                    <li key={j}>
                      <NavLink
                        to={`${item.path}/${slug(sub)}`}
                        className={({ isActive }) => `submenu-link ${isActive ? "active" : ""}`}
                      >
                        {sub}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Hamburger (mobile) */}
      <button
        className="hamburger"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
      >
        <span className="bar" />
      </button>

      {/* Fullscreen mobile menu */}
      <div className={`mobile-overlay ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-top">
          <img className="logo" src={logo} alt="Logo" />
          <button className="close" aria-label="Close menu" onClick={closeMobile}>×</button>
        </div>

        <ul className="mobile-list">
          {menuItems.map((item, i) => (
            <li key={i} className="mobile-item">
              {item.submenu.length > 0 ? (
                <>
                  <button
                    className="mobile-parent"
                    onClick={() => toggleIdx(i)}
                    aria-expanded={openIdx === i}
                  >
                    {item.name}
                    <span className="chev">{openIdx === i ? "−" : "+"}</span>
                  </button>
                  <div className={`mobile-sub ${openIdx === i ? "open" : ""}`}>
                    <NavLink
                      to={item.path}
                      className="mobile-parent"
                      onClick={closeMobile}
                    >
                      {item.name} Home
                    </NavLink>
                    {item.submenu.map((sub, j) => (
                      <NavLink
                        key={j}
                        to={`${item.path}/${slug(sub)}`}
                        className="mobile-link"
                        onClick={closeMobile}
                      >
                        {sub}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className="mobile-parent"
                  onClick={closeMobile}
                >
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
