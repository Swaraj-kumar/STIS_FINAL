import React, { useState, useEffect } from 'react';
import './ReachIisc.css';

const ReachIisc = () => {
    const [activeStation, setActiveStation] = useState('mainStation');
    const [activeAirportTab, setActiveAirportTab] = useState('shuttle');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const transportModes = [
        {
            icon: '🚕',
            title: 'By Taxi',
            points: [
                'Always mention "Tata Institute" to drivers',
                'Available at airport and throughout city',
                'Use ride-hailing apps like Uber/Ola for convenience',
                'Approximate fare from airport: ₹800-1000',
                'Basic taxi fare: ₹15/km with ₹60/hour waiting charge',
                'Contact reliable services:',
                '• Meru Cabs: +91-80-4422-4422',
                '• AirLift: +91-80-4052-8888',
                '• CelCabs: +91-80-6060-9090'
            ]
        },
        {
            icon: '🛺',
            title: 'By Auto Rickshaw',
            points: [
                'Ask for "Tata Institute"',
                'Ensure meter usage or pre-negotiate fare',
                'Common and economical mode of transport',
                'Approximate fare from city center: ₹150-200 (Ola/Uber fare)'
            ]
        },
        {
            icon: '🚌',
            title: 'By Bus',
            points: [
                'Tell conductor "Tata Institute"',
                'Multiple routes available from major locations',
                'Most economical option',
                'Bus fare: ₹20-40',
                'BMTC Contact Numbers:',
                '• Control Room: +91-80-2295-2522 / 2295-2422',
                '• Kempegowda Bus Stand: +91-80-2295-2311 / 2295-2314',
                '• Shivajinagar Bus Stand: +91-80-2295-2321 / 2295-2324'
            ]
        }
    ];

    const airportInfo = {
        shuttle: {
            title: 'KSTDC Flybus',
            heading: 'Airport Shuttle Bus Service',
            details: [
                'Frequent AC bus service from BIAL',
                'Available 24/7 at 30-minute intervals',
                'Book tickets online or at airport counter',
                'Get down at Mekhri Circle stop',
                'Take auto/taxi to IISc (2 km)',
                'Fare: ₹250-300 per person',
                'For bus schedules and booking:',
                '• Visit www.viaworld.in',
                '• Call +91-80-41431000',
                'Airport Helpline: +91-80-4058-1111',
                'Flight Enquiry: 1-800-425-4425'
            ],
            link: 'https://www.bengaluruairport.com/transport/flybus.html'
        },
        taxi: {
            title: 'Airport Taxis',
            heading: 'Official Airport Taxi Service',
            details: [
                'Pre-paid taxi counter at arrival terminal',
                'Multiple operators available (Meru, Mega, KSTDC)',
                'Fixed government-approved rates',
                'Travel time: 60-90 minutes',
                'Direct drop to IISc main gate',
                'Fare: ₹800-1000',
                'Premium Services Available:',
                '• SGL Tours and Travels: +91-80-4299-4399',
                '• Akbar Travels: 1-800-226-000',
                '• Hertz: +91-99725-02292'
            ],
            link: 'https://www.bengaluruairport.com/transport/taxi.html'
        },
        rideshare: {
            title: 'Ride-Sharing Services',
            heading: 'App-Based Cab Services',
            details: [
                'Uber and Ola available at designated pickup points',
                'Follow airport signs for pickup location',
                'Competitive pricing with live tracking',
                'Book through respective apps',
                'Available 24/7',
                'Fare: ₹700-900',
                'Alternative Options:',
                '• EasyCab: +91-94105-61625',
                'Credit card payment available with printed receipt'
            ],
            link: 'https://www.bengaluruairport.com/transport/ride-hailing.html'
        }
    };

    const stationInfo = {
        mainStation: {
            title: 'Main Railway Station (Bengaluru City)',
            distance: '7 km from IISc',
            transport: [
                'Pre-paid Auto: Ask for "Tata Institute"',
                'Bus Routes: 252 E, 258 C, 271 E, 273 C, 275, 276, 99 A and B',
                'Stop: TATA INSTITUTE Bus Stop'
            ]
        },
        cantonmentStation: {
            title: 'Cantonment Railway Station',
            distance: '7 km from IISc',
            transport: [
                'Pre-paid Auto available',
                'Bus Routes: 94 A and E, 252 A, 270 A, 272, 276 A'
            ]
        },
        yeshwantpurStation: {
            title: 'Yeshwantpur Railway Station',
            distance: '3 km from IISc',
            transport: [
                'Limited trains stop here',
                'No prepaid auto facility',
                'Closest station to IISc',
                'Regular auto and bus services available'
            ]
        }
    };

    return (
        <div className="iisc-container">
            <div className="content-wrapper">
                <h1 className="main-title">How to Reach IISc Campus</h1>

                <div className="important-note">
                    <h2>Important Note</h2>
                    <p>IISc is locally known as <strong>"Tata Institute"</strong></p>
                    <p>Distance from Airport: <strong>35 km</strong> from Bengaluru International Airport (BIAL)</p>
                    <p><strong>Note:</strong> All landline numbers have area code +91-80</p>
                </div>

                <div className="airport-section">
                <h2>From Bengaluru International Airport (BIAL)</h2>
                <div className="airport-info">
                    <div className="airport-header">
                        <span className="airport-icon">✈️</span>
                        <div className="airport-text">
                            <h3>Airport Information</h3>
                            <p>Distance: 35 km | Travel Time: 60-90 minutes</p>
                        </div>
                    </div>

                    <div className="airport-tabs">
                        {Object.keys(airportInfo).map((mode) => (
                            <button
                                key={mode}
                                className={`tab-button ${activeAirportTab === mode ? 'active' : ''}`}
                                onClick={() => setActiveAirportTab(mode)}
                            >
                                {airportInfo[mode].title}
                            </button>
                        ))}
                    </div>

                    <div className="airport-content">
                        <h4 className="content-heading">{airportInfo[activeAirportTab].heading}</h4>
                        <ul>
                            {airportInfo[activeAirportTab].details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                        <a
                            href={airportInfo[activeAirportTab].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="info-link"
                        >
                            More Information →
                        </a>
                    </div>
                </div>
            </div>

                <div className="transport-section">
                    <h2>Transport Options Within City</h2>
                    <div className="transport-cards">
                        {transportModes.map((mode, index) => (
                            <div className="transport-card" key={index}>
                                <div className="card-header">
                                    <span className="transport-icon">{mode.icon}</span>
                                    <h3>{mode.title}</h3>
                                </div>
                                <ul>
                                    {mode.points.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="railway-section">
                    <h2>Railway Station Information</h2>
                    <div className="tab-buttons">
                        {Object.keys(stationInfo).map((station) => (
                            <button
                                key={station}
                                className={`tab-button ${activeStation === station ? 'active' : ''}`}
                                onClick={() => setActiveStation(station)}
                            >
                                {stationInfo[station].title}
                            </button>
                        ))}
                    </div>
                    <div className="station-info">
                        <h3>{stationInfo[activeStation].title}</h3>
                        <p className="distance">{stationInfo[activeStation].distance}</p>
                        <ul>
                            {stationInfo[activeStation].transport.map((info, index) => (
                                <li key={index}>{info}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="map-section">
                    <h2>Campus Location</h2>
                    <div className="location-section">
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.867420936048!2d77.5652489!3d13.0148257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae166b2e68f1a3%3A0x8583c93d79113b6f!2sIndian%20Institute%20of%20Science!5e0!3m2!1sen!2sin!4v1693847769244!5m2!1sen!2sin"
                                width="100%"
                                height="400"
                                style={{ border: "0", borderRadius: "10px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="IISc Location"
                            ></iframe>
                        </div>
                        <button
                            className="directions-button"
                            onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Indian+Institute+of+Science,+Bengaluru', '_blank')}
                        >
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReachIisc;