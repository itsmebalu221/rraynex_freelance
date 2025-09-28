import React from 'react';
import './TrustedBy.css';

// Demo company logos from Pexels
const companyLogos = [
  { name: 'Tech Corp', url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Innovation Labs', url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Digital Solutions', url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Global Systems', url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Smart Tech', url: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Future Works', url: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cloud Nine', url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Data Dynamics', url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Pixel Perfect', url: 'https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Code Masters', url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Web Wizards', url: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'App Architects', url: 'https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cyber Solutions', url: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Network Pro', url: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Digital Edge', url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Tech Titans', url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Innovation Hub', url: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Smart Systems', url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Future Tech', url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cloud Connect', url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Data Drive', url: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Code Craft', url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Web Works', url: 'https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'App Avenue', url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cyber Core', url: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Network Next', url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Digital Dawn', url: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Tech Trends', url: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Innovation Inc', url: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Smart Start', url: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Future Flow', url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cloud Craft', url: 'https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Data Dash', url: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Code Connect', url: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Web Wave', url: 'https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'App Apex', url: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cyber Stream', url: 'https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Network Nova', url: 'https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Digital Dynamics', url: 'https://images.pexels.com/photos/2228555/pexels-photo-2228555.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Tech Tower', url: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Innovation Island', url: 'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Smart Solutions', url: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Future Force', url: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Cloud Castle', url: 'https://images.pexels.com/photos/2480072/pexels-photo-2480072.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Data Domain', url: 'https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
  { name: 'Code Castle', url: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' }
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