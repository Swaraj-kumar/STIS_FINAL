import React, { useState } from 'react';
import './Sponsors.css';
import Navbar from './Navbar';
import Footer from './Footer';

const SponsorsSection = () => {
  const [imageError, setImageError] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  const sponsorInfo = {
    name: 'RESCONS Solutions Pvt. Limited',
    location: 'Bengaluru, India - 560012',
    website: 'https://www.rescons.in',
    imageUrl: 'https://raw.githubusercontent.com/kmranimesh/Web-dev-toolkit/main/rescons_logo%20.jpg',
  };

  const mediaPartner = {
    name: 'All Conference Alert',
    location: 'Media Partner',
    website: 'https://allconferencealert.net/',
    imageUrl: 'https://raw.githubusercontent.com/VishwasPrabhakara/STISV/refs/heads/main/public/All-conference-alert.png', // Add logo raw URL here
  };

  return (
    <>
      <Navbar />
      <div className="sponsors-wrapper">
        {/* Header */}
        <div className="sponsors-header">
          <h1>Our Esteemed Sponsors & Media Partner</h1>
          <p>We proudly partner with industry leaders and global outreach platforms to promote innovation and visibility.</p>
        </div>

        {/* Sponsor Cards Side-by-Side */}
        <div className="sponsor-cards-row">
          {/* Sponsor */}
          <div className="sponsor-card">
            {!imageError ? (
              <div className="sponsor-logo">
                <img
                  src={sponsorInfo.imageUrl}
                  alt="Sponsor Logo"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="fallback-image">
                <p>{sponsorInfo.name}</p>
              </div>
            )}
            <div className="sponsor-details">
              <h3>{sponsorInfo.name}</h3>
              <p className="sponsor-location">{sponsorInfo.location}</p>
              <a
                href={sponsorInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-button"
              >
                Visit Website →
              </a>
            </div>
          </div>

          {/* Media Partner */}
          <div className="sponsor-card">
            {!mediaError && mediaPartner.imageUrl ? (
              <div className="sponsor-logo">
                <img
                  src={mediaPartner.imageUrl}
                  alt="Media Partner Logo"
                  onError={() => setMediaError(true)}
                />
              </div>
            ) : (
              <div className="fallback-image">
                <p>{mediaPartner.name}</p>
              </div>
            )}
            <div className="sponsor-details">
              <h3>{mediaPartner.name}</h3>
              <p className="sponsor-location">{mediaPartner.location}</p>
              <a
                href={mediaPartner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-button"
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <Footer />
    </>
  );
};

export default SponsorsSection;
