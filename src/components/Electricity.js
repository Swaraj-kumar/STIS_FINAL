import React, { useState, useEffect } from 'react';
import './Electricity.css';

const Electricity = () => {
    const [activeTab, setActiveTab] = useState('voltage');
    const [showAdaptor, setShowAdaptor] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const specifications = {
        voltage: {
            title: "Standard Voltage & Frequency",
            content: "India uses 230V AC electricity at 50Hz frequency.",
            details: [
                "Voltage fluctuations are common in some areas",
                "Three-phase connections are used in some regions",
                "Power backup systems are available in most conference venues"
            ]
        },
        sockets: {
            title: "Power Sockets",
            content: "India primarily uses Type C and Type D sockets.",
            details: [
                "Type C: 2-pin European style (2.5 amp)",
                "Type D: 3-pin British style (5 amp)",
                "Type M: 3-pin (15 amp) for heavy appliances"
            ]
        },
        adaptors: {
            title: "Recommended Adaptors",
            content: "International visitors should carry universal adaptors.",
            details: [
                "Multi-socket universal adaptor",
                "Surge protection recommended",
                "USB ports for convenience"
            ]
        }
    };

    const handleAdaptorClick = () => {
        setShowAdaptor(!showAdaptor);
    };

    return (
        <div className="electricity-container">
            <div className="content-wrapper">
                <h1 className="main-title">Electrical Specifications In India</h1>
                
                <div className="tabs">
                    {Object.keys(specifications).map(key => (
                        <button 
                            key={key}
                            className={`tab-button ${activeTab === key ? 'active' : ''}`}
                            onClick={() => setActiveTab(key)}
                        >
                            {specifications[key].title}
                        </button>
                    ))}
                </div>

                <div className="info-section">
                    <h2>{specifications[activeTab].title}</h2>
                    <p className="main-content">{specifications[activeTab].content}</p>
                    <ul className="details-list">
                        {specifications[activeTab].details.map((detail, index) => (
                            <li key={index} className="detail-item">{detail}</li>
                        ))}
                    </ul>
                </div>

                {/* <div className="interactive-section">
                    <button className="adaptor-button" onClick={handleAdaptorClick}>
                        Need an Adaptor? Check Here
                    </button>
                    
                    {showAdaptor && (
                        <div className="adaptor-guide">
                            <h3>Adaptor Guide</h3>
                            <div className="adaptor-links">
                                <a href="https://www.amazon.in/travel-adaptors" target="_blank" rel="noopener noreferrer" className="shop-link">
                                    Shop on Amazon India
                                </a>
                                <a href="https://www.flipkart.com/travel-adaptors" target="_blank" rel="noopener noreferrer" className="shop-link">
                                    Shop on Flipkart
                                </a>
                            </div>
                        </div>
                    )}
                </div> */}

                <div className="safety-note">
                    <h3>⚠️ Important Safety Note</h3>
                    <p>Always ensure your devices are compatible with Indian power specifications. Consider using surge protectors for sensitive equipment.</p>
                </div>
            </div>
        </div>
    );
};

export default Electricity;