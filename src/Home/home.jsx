import React from "react"; // Capital R
import "./home.css"
import InfoCard from "../Components/Card/card";
import EcosystemSection from "../Components/Ecosystem/eco";
import image4 from './image1.png'
import GrowTogether from "../Components/GrowTogeather/grow";
import {BulbOutlined,RiseOutlined,HeartOutlined} from '@ant-design/icons';
import TrustedBy from "../Components/TrustedBy/TrustedBy";
import { Helmet } from "react-helmet-async";
import HeroCarousel from "../Components/ImgSlide/herocar";
import H1Underline from "../Components/H1/H1Underline";


export default function Home() {
  
  return (
    <>
    <Helmet>
  {/* Primary meta */}
  <title>Delivering Quality Healthcare — Rraynex Pharmaceuticals</title>
  <meta
    name="description"
    content="Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries. Research & development, compliant manufacturing and global partnerships."
  />
  <link rel="canonical" href="https://myapp.com/" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Delivering Quality Healthcare — Rraynex Pharmaceuticals" />
  <meta
    property="og:description"
    content="Rraynex Pharmaceuticals — research, manufacturing, and global health partnerships across regulated and emerging markets."
  />
  <meta property="og:url" content="https://myapp.com/" />
  <meta property="og:image" content="https://myapp.com/og-image.jpg" />
  <meta property="og:image:alt" content="Rraynex logo and team" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourhandle" />
  <meta name="twitter:title" content="Delivering Quality Healthcare — Rraynex Pharmaceuticals" />
  <meta name="twitter:description" content="Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries." />
  <meta name="twitter:image" content="https://myapp.com/twitter-image.jpg" />

  {/* JSON-LD structured data (Organization) */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Rraynex Pharmaceuticals Private Limited",
      url: "https://myapp.com/",
      logo: "https://myapp.com/path-to-logo.png",
      sameAs: [
        "https://www.facebook.com/yourpage",
        "https://www.linkedin.com/company/yourpage",
        "https://twitter.com/yourhandle"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-XXXXXXXXXX",
          contactType: "customer service",
          areaServed: "IN"
        }
      ]
    })}
  </script>
</Helmet>

      {/* Header component will go here */}
      {/* <div className="home-container"> */}
        {/* <div style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
            <h1 className="home-title" style={{color:'black'}} align="center">Delivering Quality Healthcare <br></br>Across <span style={{ color: '#d26c1fff',textShadow:'2px 2px 4px rgba(255, 255, 255, 0.5)' }}>58+ Countries</span></h1>
            <p className="home-subtitle" style={{fontSize:'20px' ,color:'black'}} align="center">Every <span style={{ color: '#ba6829ff' }}>Dose</span> Counts. Every <span style={{ color: '#1b1283ff' }}>Day</span> Matters.</p>
            <div className="button-container">
            <button type="button">Learn More</button>
            <button type="button">Get Started</button>
            </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'150px',flexDirection:'column'}}>
            <svg style={{margin:'-25px'}}  xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
            </svg>
            <svg style={{margin:'-25px'}} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
            </svg>
            <svg  style={{margin:'-10px'}} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
            </svg>
        </div> */}

        
        
      {/*  </div>*/}
      <HeroCarousel />
      
      {/* Second Section*/}
      <div className="second-section">
        <h1>Delivering Quality Healthcare</h1>
        <div className="card-container">
            <InfoCard className="info-card"
            icon={<BulbOutlined style={{ fontSize: "50px" }} />}
        title="Innovation"
        description="Manufacturing pharmaceutical pellets, granules, APIs, and intermediaries with cutting-edge technology. We blend local expertise with global standards, ensuring world-class quality at every production stage. #LocalToGlobal"
        buttonText="Know More"
      />

      <InfoCard className="info-card"
        title="Value"
        icon={<HeartOutlined style={{ fontSize: "50px" }} />}
        description="Quality is our unwavering commitment from inception to delivery. Every raw material, every manufacturing process, and every finished product undergoes rigorous quality assurance, ensuring that we deliver nothing but excellence to our global partners."
        buttonText="Know More"
      />

      <InfoCard className="info-card"
        title="Growth"
        icon={<RiseOutlined  style={{ fontSize: "50px" }} />}
        description="Beyond pharmaceuticals, Rraynex is diversifying into complementary sectors including engineering solutions and real estate development. We are strategically positioning ourselves to enter the energy sector, creating a robust, multi-dimensional enterprise."
        buttonText="Know More"
      />

        </div>
        
      </div>
      {/* First Section */}
      <div>
        <TrustedBy />
      </div>
      {/* Third Section */}
      <div className="third-section">
       
        <div className="selection-container">
            <EcosystemSection />
        </div>
      </div>
   
    
    {/* Fourth Section */}
    <div className="fifth-section">
        <GrowTogether />
    </div>
    </>
  );
  
}
