import React, { useState, useEffect } from 'react';
import './Local.css';

const Local = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cityInfo = [
        {
            title: "Getting Around Bengaluru",
            content: `Auto-rickshaws are a convenient mode of transport in Bengaluru. Most drivers are multilingual and familiar with the city's layout.

            Fare Details:
            • Base fare: ₹30 for first 2 km
            • ₹15 per additional km
            • Night Charges (10 PM - 5 AM): 1.5x normal fare
            • Waiting charges: ₹5 per 15 minutes
            
            Pro Tips:
            • Use ride-hailing apps for fixed prices
            • Keep Google Maps handy
            • Pre-paid auto services available at major locations`
        },
        {
            title: "Metro Rail System",
            content: `Namma Metro is Bengaluru's rapid transit system.

            Key Information:
            • Operating Hours: 5 AM - 11 PM
            • Purple Line: Whitefield to Challaghatta
            • Green Line: Nagasandra to Silk Institute
            • Frequency: Every 5-10 minutes during peak hours
            
            Benefits:
            • Faster than road transport
            • Air-conditioned comfort
            • Digital payment options
            • Free WiFi at stations`
        },
        {
            title: "Cultural Hotspots",
            content: `Must-Visit Cultural Venues:
            • Ravindra Kalakshetra - Traditional performances
            • Chowdiah Memorial Hall - Classical music concerts
            • National Gallery of Modern Art
            • Bangalore Palace - Historical architecture
            • Karnataka Chitrakala Parishath - Art exhibitions
            
            Annual Events:
            • Bengaluru International Film Festival (February)
            • Bengaluru Habba (December)
            • Karaga Festival (March-April)
            • Kadalekai Parishe (November)`
        },
        {
            title: "Food & Dining",
            content: `Famous Local Delicacies:
            • Masala Dosa at CTR (Central Tiffin Room)
            • Filter Coffee at Indian Coffee House
            • Biryani at Meghana Foods
            • Street Food at VV Puram Food Street
            
            Popular Areas for Dining:
            • Koramangala - Modern cafes and pubs
            • Indiranagar - Rooftop restaurants
            • Brigade Road - Fast food and casual dining
            • Church Street - Iconic eateries
            
            Must-Try Local Specialties:
            • Benne Masala Dosa
            • Dharwad Butter
            • Mysore Pak
            • Ragi Mudde`
        },
        {
            title: "Shopping Districts",
            content: `Popular Shopping Areas:
            • Commercial Street - Fashion & accessories
            • Brigade Road - Modern retail
            • MG Road - Mix of traditional and modern
            • UB City - Luxury shopping
            
            Traditional Markets:
            • Krishna Rajendra Market (City Market) - Flowers & produce
            • Malleswaram Market - Traditional items
            • Russell Market - Fresh produce
            
            Shopping Tips:
            • Bargaining is acceptable in traditional markets
            • Weekends are usually crowded
            • Many shops close by 9 PM
            • Most malls open from 10 AM - 10 PM`
        }
    ];

    const filteredInfo = cityInfo.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="local-container">
            <h1 className="title">Bengaluru City Guide</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for information..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="info-sections">
                {filteredInfo.map((section, index) => (
                    <div 
                        key={index} 
                        className={`info-section ${activeSection === index ? 'active' : ''}`}
                    >
                        <button 
                            className="section-header"
                            onClick={() => setActiveSection(activeSection === index ? null : index)}
                        >
                            <h2>{section.title}</h2>
                            <span className="arrow"></span>
                        </button>
                        <div className="section-content">
                            <p>{section.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Local;