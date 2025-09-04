import React, { useState } from 'react';
import { Building2, Heart, TrendingUp, Users } from 'lucide-react';
import './eco.css';

const CleanGlossyEcosystem = () => {
  const [activeTab, setActiveTab] = useState('Ecosystem');
  
  const tabs = [
    { id: 'Ecosystem', label: 'Ecosystem', icon: <Building2 size={18} /> },
    { id: 'Healthcare', label: 'Healthcare', icon: <Heart size={18} /> },
    { id: 'M&A', label: 'M&A', icon: <TrendingUp size={18} /> },
    { id: 'SME Upliftment', label: 'SME Upliftment', icon: <Users size={18} /> }
  ];
  
  const content = {
    'Ecosystem': {
      title: 'Building a Sustainable Healthcare Ecosystem',
      description: 'We are a pharmaceutical company committed to delivering high-quality, affordable, and relevant medicines to communities across the globe. Our operations are centered on supporting pharmaceutical providers to serve communities with the highest quality products. To achieve this, we have established partnerships in each region that our foundations meet international standards of safety and efficacy. This customer-first approach helps us build strong relationships that extend beyond transactions and grow into partnerships built on trust. At the same time, we continuously invest in research and technology to improve our product portfolio and keep pace with the evolving demands of global healthcare.'
    },
    'Healthcare': {
      title: 'Advancing Global Healthcare Standards',
      description: 'Our healthcare initiatives focus on improving access to quality medicines worldwide. Through strategic partnerships and innovative distribution networks, we ensure that essential medications reach underserved communities while maintaining the highest standards of safety and efficacy.'
    },
    'M&A': {
      title: 'Strategic Mergers & Acquisitions',
      description: 'Our M&A strategy is designed to expand our global footprint and enhance our pharmaceutical capabilities. We actively seek partnerships that align with our mission of delivering quality healthcare solutions to emerging markets.'
    },
    'SME Upliftment': {
      title: 'Supporting Small & Medium Enterprises',
      description: 'We believe in empowering local pharmaceutical manufacturers through knowledge transfer, technology sharing, and capacity building programs that help SMEs meet international quality standards.'
    }
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanGlossyEcosystem;