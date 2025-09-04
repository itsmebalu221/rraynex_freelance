import React from "react";
import "./grow.css";

const GrowTogether = () => {
  return (
    <section className="grow-container">
      <h1 style={{fontSize:'40px',color:'white',alignContent:'center'}} align="center">Grow Together</h1>

      <div className="grow-grid">
        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            We believe in contributing to the growth and development of the
            ecosystem we operate in India presents a significant opportunity
            for us to support and grow with small and medium-sized manufacturers
          </p>
        </div>

        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            Many of these manufacturers possess technical capabilities but lack the resources and expertise to market themselves effectively.
          </p>
        </div>

        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            We collaborate with these manufacturers  
to consistently produce innovative and high-quality products  
that not only meet technical and regulatory qualifications  
but also deliver value and trust to our partners worldwide.  

          </p>
        </div>

        <div className="grow-item">
          <span className="bullet"></span>
          <p>
            We leverage our distributor network and strong regulatory knowledge to commercialize these products and sell them through our network highest standards of quality and compliance.
          </p>
        </div>
      </div>

      <button className="grow-btn">Know More</button>
    </section>
  );
};

export default GrowTogether;
