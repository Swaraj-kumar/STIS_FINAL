import React, { useEffect } from 'react';
import './InternationalTravel.css';

const InternationalTravel = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="international-travel-container">
            <div className="content-wrapper">
                <h1 className="main-title">International Travel to Bengaluru</h1>
                
                <div className="info-card direct-flights">
                    <h2>Direct International Flights</h2>
                    <p>Most international airlines offer direct flights to Bengaluru International Airport (BLR). Popular carriers include:</p>
                    <ul className="airlines-list">
                        <li>Lufthansa</li>
                        <li>Singapore Airlines</li>
                        <li>Air France</li>
                        <li>British Airways</li>
                        <li>Malaysian Airlines</li>
                        <li>Air India</li>
                    </ul>
                    <div className="recommendation">
                        ✈️ We recommend flying directly into Bengaluru for the most convenient travel experience.
                    </div>
                </div>

                <div className="info-card alternative-routes">
                    <h2>Alternative Routes</h2>
                    <div className="city-connections">
                        <div className="city-card">
                            <h3>Via Chennai</h3>
                            <p>Flight Duration: 45 minutes</p>
                            <p className="highlight">✓ Recommended Transit Point</p>
                            <p>International and domestic terminals in the same building</p>
                        </div>
                        <div className="city-card">
                            <h3>Via Mumbai</h3>
                            <p>Flight Duration: 90 minutes</p>
                            <p>Requires terminal transfer by bus</p>
                        </div>
                        <div className="city-card">
                            <h3>Via Delhi</h3>
                            <p>Flight Duration: 2.5 hours</p>
                            <p>Requires terminal transfer by bus</p>
                        </div>
                    </div>
                </div>

                <div className="info-card transport-options">
                    <h2>Additional Transportation Options</h2>
                    <div className="transport-content">
                        <div className="train-info">
                            <h3>Train Travel</h3>
                            <p>The Shatabdi Express connects Chennai to Bengaluru:</p>
                            <ul>
                                <li>Journey Duration: 5 hours</li>
                                <li>Comfortable air-conditioned service</li>
                                <li>Advance reservations required</li>
                                <li><a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer">Book train tickets online</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="info-card travel-tips">
                    <h2>Travel Tips</h2>
                    <ul className="tips-list">
                        <li>Check for combo deals on international + domestic flights</li>
                        <li>Consider layover times when booking connecting flights</li>
                        <li>Keep local currency for terminal transfers if needed</li>
                        <li>Download the Bengaluru Airport app for real-time updates</li>
                    </ul>
                </div>

                <div className="useful-links">
                    <h2>Useful Links</h2>
                    <div className="links-grid">
                        <a href="https://www.bengaluruairport.com" target="_blank" rel="noopener noreferrer">Bengaluru Airport</a>
                        <a href="https://www.airindia.in" target="_blank" rel="noopener noreferrer">Air India</a>
                        <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer">Indian Railways</a>
                        <a href="https://www.incredibleindia.org" target="_blank" rel="noopener noreferrer">Incredible India</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternationalTravel;