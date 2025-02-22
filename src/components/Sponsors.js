import React, { useState } from 'react';
import './Sponsors.css';

const SponsorsSection = () => {
  const [imageError, setImageError] = useState(false);

  const sponsorInfo = {
    name: "RESCONS Solutions Pvt. Limited",
    location: "Bengaluru, India - 560012",
    website: "https://www.rescons.in",
    imageUrl: "https://raw.githubusercontent.com/kmranimesh/Web-dev-toolkit/main/rescons_logo%20.jpg"
  };

  return (
    <div className="sponsors-container">
      <div className="sponsors-content">
        <h2 className="coming-soon-sponsors">Our Sponsors</h2>
        
        <div className="sponsor-card">
          <div className="sponsor-image-container">
            {imageError ? (
              <div className="fallback-image">
                <p>Rescons Solutions</p>
              </div>
            ) : (
              <div className="image-wrapper">
                <img 
                  src={sponsorInfo.imageUrl}
                  alt="Rescons Solutions Logo" 
                  onError={() => setImageError(true)}
                />
              </div>
            )}
            
            <div className="sponsor-info">
              <h3 className="sponsor-name">{sponsorInfo.name}</h3>
              <p className="sponsor-location">{sponsorInfo.location}</p>
              <a 
                href={sponsorInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-website"
              >
                Visit Website
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;