import React, { useState } from 'react';
import { Building2,Tablets, Heart,FlaskConical, Grip,TrendingUp, Users, Package ,ShoppingCart} from 'lucide-react';
import './eco.css';

const CleanGlossyEcosystem = () => {
  const [activeTab, setActiveTab] = useState('Ecosystem');
  
  const tabs = [
    { id: 'Ecosystem', label: 'Pellets', icon: <Tablets /> },
    { id: 'Healthcare', label: 'Granules', icon: <Grip /> },
    { id: 'M&A', label: 'APIs & Intermediaries', icon: <FlaskConical /> },
    { id: 'M&A1', label: 'Finished Dosage Forms', icon: <Package /> },
    { id: 'SME Upliftment', label: 'Rraynex LUXE', icon: <ShoppingCart /> }
  ];

  
  
  const content = {
    'Ecosystem': {
      title: 'Pellets',
      description:
        'Our pelletization platform delivers uniform drug-release profiles and scale-ready processes. We engineer controlled-release pellets to meet regulatory expectations and commercial throughput — minimizing variation, maximizing yield.',
      ctaLabel: 'Explore Pellets',
      ctaLink: '/products/pellets'
    },
    'Healthcare': {
      title: 'Granules',
      description:
        'Granulation expertise for wet and dry processes that enable better flow, tableting consistency, and dose accuracy. We optimize particle size distribution and binder systems to support downstream manufacturing efficiency.',
      ctaLabel: 'View Granules',
      ctaLink: '/products/granules'
    },
    'M&A': {
      title: 'APIs & Intermediaries',
      description:
        'Strategic sourcing and development of APIs and intermediates to de-risk supply chains. We collaborate with partners to secure high-quality inputs, reduce COGS, and accelerate time-to-market for critical molecules.',
      ctaLabel: 'APIs & Intermediates',
      ctaLink: '/products/apis-intermediaries'
    },
    'M&A1': {
      title: 'Finished Dosage Forms',
      description:
        'From tablets and capsules to sachets and jellies — we provide full-service finished dosage capabilities including formulation, scale-up, and regulatory-ready documentation to fast-track product launches.',
      ctaLabel: 'Finished Dosage Forms',
      ctaLink: '/products/finished-dosage-forms'
    },
    'SME Upliftment': {
      title: 'Rraynex LUXE',
      description:
        'Rraynex LUXE is our SME enablement program: technology transfer, QC training, and market-readiness support to elevate small manufacturers to export-capable partners.',
      ctaLabel: 'Rraynex LUXE Program',
      ctaLink: '/rraynex-luxe'
    }
  };

  const handleCTAClick = (link) => {
    if (!link) return;
    // direct, deterministic redirect — no router assumptions
    window.location.href = link;
  };

  return (
    <section className="clean-glossy-section">
      <div className="clean-glossy-container">
        <div className="section-header">
          <h2 className="section-title">Our Healthcare Ecosystem</h2>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div className="tab-glass-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`clean-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="content-wrapper">
          <div className="clean-content-card">
            <div className="card-content">
              <h3 className="clean-content-title">{content[activeTab].title}</h3>
              <p className="clean-content-desc">{content[activeTab].description}</p>
              
              <div className="card-cta">
                <button
                  className="cta-button"
                  onClick={() => handleCTAClick(content[activeTab].ctaLink)}
                  aria-label={content[activeTab].ctaLabel}
                >
                  {content[activeTab].ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanGlossyEcosystem;