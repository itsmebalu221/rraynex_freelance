import React from "react"; // Capital R
import "./home.css"
import InfoCard from "../Components/Card/card";
import EcosystemSection from "../Components/Ecosystem/eco";
import image4 from './image1.png'
import GrowTogether from "../Components/GrowTogeather/grow";
import {BulbOutlined,RiseOutlined,HeartOutlined} from '@ant-design/icons';
import TrustedBy from "../Components/TrustedBy/TrustedBy";



export default function Home() {
  return (
    <>
      {/* Header component will go here */}
      <div className="home-container">
        <div style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
            <h1 className="home-title" style={{fontSize:'70px',color:'black'}} align="center">Delivering Quality Healthcare <br></br>Across <span style={{ color: '#d26c1fff',textShadow:'2px 2px 4px rgba(255, 255, 255, 0.5)' }}>58+ Countries</span></h1>
            <p className="home-subtitle" style={{fontSize:'20px' ,color:'black'}} align="center">Every <span style={{ color: '#ba6829ff' }}>Dose</span> Counts. Every <span style={{ color: '#1b1283ff' }}>Day</span> Matters.</p>
            <div className="button-container">
            <button type="button">Learn More</button>
            <button type="button">Get Started</button>
            </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'150px',flexDirection:'column'}}>
            <svg style={{margin:'-25px'}}  xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
            </svg>
            <svg style={{margin:'-25px'}} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
            </svg>
            <svg  style={{margin:'-10px'}} xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
            </svg>
        </div>
        
      </div>
      
      {/* Second Section*/}
      <div className="second-section">
        <h1 style={{fontSize:'40px'}} align="center">What We Stand For</h1>
        <div className="card-container">
            <InfoCard className="info-card"
            icon={<BulbOutlined style={{ fontSize: "50px" }} />}
        title="Innovation"
        description="At Rraynex Pharmaceuticals Private Limited, we are committed to driving innovation in the industry through our cutting-edge Research and Development activities."
        buttonText="Know More"
      />

      <InfoCard className="info-card"
        title="Trust"
        icon={<HeartOutlined style={{ fontSize: "50px" }} />}
        description="Developing innovative drugs and drug delivery systems that provide superior treatment options at an affordable price while placing a high value on quality ."
        buttonText="Know More"
      />

      <InfoCard className="info-card"
        title="Growth"
        icon={<RiseOutlined  style={{ fontSize: "50px" }} />}
        description="We believe in contributing to the growth and development of the ecosystem we operate in India presents a significant opportunity for us to support and grow with manufacturers"
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
    <div className="fourth-section">
        <h1 style={{fontSize:'40px',color:'#CE6200',width:'fit-content',alignContent:'center',margin:'0 auto'}} align="center">Business Development</h1>
        <div className="content-container">
            <img className="business-development-image" src={image4} alt="Business Development"/>
            <div style={{width:'fit-content'}}>
                <h2 className="business-development-title">Preferred Global Health Choice</h2>
                <p>Rraynex offers comprehensive solutions for partners from research and development to commercial supply, covering both emerging and regulated markets. This is achieved by combining our value-added products and manufacturing partners, certified by various international regulatory agencies, to work with partners globally. Our facilities’ accreditations allow for timely and streamlined product launches across diverse regions. Overall, our end-to-end solutions offer a one-stop-shop for partners, ensuring compliance with global regulatory requirements and attracting customers looking for high-quality, compliant products</p>
            </div>
        </div>
    </div>
    {/* Fifth Section */}
    <div className="fifth-section">
        <GrowTogether />
    </div>
    </>
  );
  
}
