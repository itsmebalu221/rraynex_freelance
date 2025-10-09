import React from "react";
import "./h1-underline.css";

/**
 * H1Underline
 * A classic, animated heading underline that draws in, holds, and wipes out.
 *
 * Props:
 * - children: The H1 text (required)
 * - color: Underline color (default: "#1b1283")
 * - thickness: Underline thickness (default: "6px")
 * - duration: Total animation duration (default: "4s")
 * - className: Extra classname(s) for the H1
 */
export default function H1Underline({
  children,
  color = "#1b1283",
  thickness = "6px",
  duration = "4s",
  className = "",
}) {
  // Use CSS Custom Properties to pass props to the stylesheet.
  // This is a clean, modern, and performant approach.
  const cssVars = {
    "--h1-underline-color": color,
    "--h1-underline-thickness": thickness,
    "--h1-underline-duration": duration,
  };

  return (
    <h1 align="center" className={`h1-underline ${className}`} style={cssVars}>
      {children}
    </h1>
  );
}