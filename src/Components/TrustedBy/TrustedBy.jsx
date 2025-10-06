import React from 'react';
import './TrustedBy.css';
import logo1 from './car/1.png'
import logo2 from './car/2.png'
import logo3 from './car/3.png'
import logo4 from './car/4.png'
import logo5 from './car/5.png'
import logo6 from './car/6.png'
import logo7 from './car/7.png'
import logo8 from './car/8.png'
import logo9 from './car/9.png'
import logo10 from './car/10.png'
import logo11 from './car/11.png'
import logo12 from './car/12.png'
import logo13 from './car/13.png'
import logo14 from './car/14.png'
import logo15 from './car/15.png'

// Demo company logos from Pexels
const companyLogos = [
  { name: 'MARC', url: logo1 },
  { name: 'Alventa', url: logo2 },
  { name: 'Ryzer', url: logo3 },
  { name: 'Corona', url: logo4 },
  { name: 'Fredun', url: logo5 },
  { name: 'Claroid', url: logo6 },
  { name: 'Zee', url: logo7 },
  { name: 'Elder', url: logo8 },
  { name: 'Sheetal', url: logo9 },
  { name: 'Alembic', url: logo10 },
  { name: 'Africure', url: logo11 },
  { name: 'BioSmith', url: logo12 },
  { name: 'Theon', url: logo13 },
  { name: 'EMIL', url: logo14 },
  { name: 'Alben', url: logo15 }
];

const TrustedBy= () => {
  return (
    <section className="trusted-by-section">
      <div className="trusted-by-container">
        <div className="trusted-by-header">
          <h2 className="trusted-by-title">
            Trusted by Leading Companies
          </h2>
          <p className="trusted-by-subtitle">
            Join companies worldwide who trust our solutions.
          </p>
        </div>
        
        {/* Scrolling Logo Container */}
        <div className="logo-scroll-container">
          <div className="logo-scroll-track">
            {/* First set of logos */}
            {companyLogos.map((company, i) => (
              <div key={`first-${i}`} className="logo-item">
                <img 
                  src={company.url} 
                  alt={company.name}
                  className="logo-image"
                  loading="lazy"
                  width="200"
                  height="100"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companyLogos.map((company, i) => (
              <div key={`second-${i}`} className="logo-item">
                <img 
                  src={company.url} 
                  alt={company.name}
                  className="logo-image"
                  loading="lazy"
                  width="200"
                  height="100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;