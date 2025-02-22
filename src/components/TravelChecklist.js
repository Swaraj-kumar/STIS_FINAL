import React, { useState, useEffect } from 'react';
import './TravelChecklist.css';

const TravelChecklist = () => {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: 'visa',
            title: 'Visa',
            content: `All non-Indian-citizens are required to have an Indian visa to enter the country. Please allow yourself sufficient time (say 2-3 weeks) to procure an appropriate visa from your nearest Indian consulate.\n\n\nIf you are a participant in this conference, you are advised to state the purpose of your visit as "Attending a Conference". We have obtained an approval for conducting this Conference from the Ministry of External Affairs (MEA). If required by the consulate to which you are applying for your visa, we can fax you or the consulate a copy of this letter. In practice, a letter of invitation might suffice; please feel free to send an email to Conference Secretariat who will then fax you a letter. Please mention your full name, affiliation and address.`,
            link: 'https://indianvisaonline.gov.in/visa/',
            linkText: 'Apply for Indian Visa Online'
        },
        {
            id: 'flights',
            title: 'Flight Reservations',
            content: `There are direct convenient flights from several European cities (and from a few US cities) to Bengaluru and we recommend that you arrive in Bengaluru directly instead of landing in other Indian cities and connecting to Bengaluru. \n\n\nPlease make your flight reservations well in advance, to be on the safe side as December is a very busy season.`,
            link: 'https://www.bengaluruairport.com/travellers/flight-information/international-flights.html',
            linkText: 'Check Bengaluru International Flights'
        },
        {
            id: 'electricity',
            title: 'Electrical Specifications',
            content: `India operates on 230V/50Hz - Please ensure your devices are compatible and bring appropriate adaptors.`,
            link: 'https://materials.iisc.ac.in/stis2025/#/electricity',
            linkText: 'Check Electrical Specifications In India'
        },
        {
            id: 'forex',
            title: 'Foreign Exchange',
            content: `While international credit cards are widely accepted in India, several places rely on cash transactions in Indian Rupee (INR). We suggest carrying some Indian currency or exchanging at airport forex counters.`,
            link: 'https://www.incredibleindia.gov.in/en/currency',
            linkText: 'Currency Converter'
        },
        {
            id: 'emergency',
            title: 'Emergency Numbers',
            content: `Important Emergency Contact Numbers in India. Follow the link for more.`,
            link: 'https://www.incredibleindia.gov.in/en/emergency',
            linkText: 'Emergency Numbers'
        }
    ];

    return (
        <div className="travel-checklist-container">
            <div className="header">
                <h1 className="title">Travel Checklist</h1>
                <p className="subtitle">Essential information for traveling to India</p>
            </div>

            <div className="sections-container">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`section ${activeSection === section.id ? 'active' : ''}`}
                    >
                        <div 
                            className="section-header"
                            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                        >
                            <h2>{section.title}</h2>
                            <span className="expand-icon">
                                {activeSection === section.id ? '−' : '+'}
                            </span>
                        </div>
                        <div className="section-content">
                            {section.content.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                            <a
                                href={section.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="learn-more-link"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {section.linkText} →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelChecklist;