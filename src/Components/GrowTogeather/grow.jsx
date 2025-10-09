import React from "react";
import "./grow.css";

const GrowTogether = () => {
  return (
    <section className="grow-container">
      <h1
      className="grow-title"
        style={{ fontSize: "40px", color: "white", alignContent: "center" }}
        align="center"
      >
        Grow Together
      </h1>

      <div className="grow-grid">
        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            We are deeply committed to fostering the growth and development of
            the ecosystem in which we operate. India’s evolving industrial
            landscape offers tremendous potential, and we aim to empower small
            and medium-scale manufacturers to expand sustainably and
            competitively in both domestic and global markets.
          </p>
        </div>

        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            Many of these manufacturers possess remarkable technical expertise
            yet lack the commercial reach and strategic support required to
            position themselves effectively in the marketplace. We act as the
            catalyst that bridges this gap.
          </p>
        </div>

        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            Through long-term collaborations, we work closely with partners to
            develop and deliver innovative, high-quality pharmaceutical products
            that consistently meet stringent technical and regulatory standards,
            while reinforcing reliability, value, and global credibility.
          </p>
        </div>

        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            Leveraging our strong distribution network and in-depth regulatory
            knowledge, we commercialize these products globally while ensuring
            the highest levels of quality, compliance, and operational
            excellence throughout every stage of the value chain.
          </p>
        </div>
      </div>

      
    </section>
  );
};

export default GrowTogether;
