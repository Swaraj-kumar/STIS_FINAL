import React, { useEffect } from 'react';
import './Transport.css';

const Transport = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="transport-container">
            <div className="content-wrapper">
                <h1 className="main-title">Transport from/to the Bengaluru International Airport (BIAL)</h1>

                {/* <section className="info-section fade-in">
                    <h2>How to reach IISc Campus</h2>
                    <p>Local name for IISc is <strong>'Tata Institute'</strong>. Always use <strong>'Tata Institute'</strong> with the taxi, auto drivers, and bus conductors. IISc is about 35 km from the new Bengaluru International Airport (BIAL) (both domestic and International).</p>
                </section> */}

                <section className="info-section fade-in">
                    <h2>Commute To Bengaluru International Airport</h2>
                    <p>All phone numbers have an area code +91-80 (for landline) and +91 for mobile.</p>
                    <p>Airport helpline: <a href="tel:+914058-1111">4058-1111</a></p>
                    <p>Flight enquiry: <a href="tel:1-800-425-4425">1-800-425-4425</a></p>
                </section>

                <section className="info-section fade-in">
                    <h2>Taxi Service Providers</h2>
                    <ul className="service-list">
                        <li>AirLift: <a href="tel:+91-80-4052-8888">4052-8888</a></li>
                        <li>CelCabs: <a href="tel:+91-80-6060-9090">6060-9090</a></li>
                        <li>SGL Tours and Travels: <a href="tel:+91-80-4299-4399">4299-4399</a></li>
                    </ul>
                </section>

                <section className="info-section fade-in">
                    <h2>Basic Taxi Services</h2>
                    <ul className="service-list">
                        <li>Meru: <a href="tel:+91-80-4422-4422">4422-4422</a></li>
                        <li>EasyCab: <a href="tel:+919410561625">+91 94105-61625</a></li>
                        <li>Fares: Rs 15/km with waiting charge of Rs 60 per hour</li>
                        <li>You pay at the end of the journey based on the metered charge. Credit card payment with printed receipt facility is available.</li>
                    </ul>
                </section>

                <section className="info-section fade-in">
                    <h2>Limousine And Car Rental</h2>
                    <ul className="service-list">
                        <li>Akbar Travels: <a href="tel:1-800-226-000">1-800-226-000</a></li>
                        <li>Hertz: <a href="tel:+91-99725-02292">99725-02292</a></li>
                        <li>Choice of self-driven or chauffeured cars</li>
                        <li>Fare: indicative rate upto 25 km is Rs 1,200</li>
                    </ul>
                </section>

                <section className="info-section fade-in">
                    <h2>Airport Shuttle Service</h2>
                    <p>Bengaluru Metropolitan Transport Corporation (BMTC) runs buses from various points of the city every 30 minutes to the Bengaluru International Airport (BIAL).</p>

                    <h3>Contact Details:</h3>
                    <ul className="service-list">
                        <li>BMTC Control Room: <a href="tel:+91-80-2295-2522">2295-2522</a> / <a href="tel:+91-80-2295-2422">2295-2422</a></li>
                        <li>BMTC, Kempegowda Bus Stand: <a href="tel:+91-80-2295-2311">2295-2311</a> / <a href="tel:+91-80-2295-2314">2295-2314</a></li>
                        <li>BMTC, Shivajinagar Bus Stand: <a href="tel:+91-80-2295-2321">2295-2321</a> / <a href="tel:+91-80-2295-2324">2295-2324</a></li>
                    </ul>

                    <h3>Highlights:</h3>
                    <ul className="highlight-list">
                        <li>Pickup/drop off points will be from all key locations of the city</li>
                        <li>Services are provided with space for passenger's luggage</li>
                        <li>Fare includes luggage charges</li>
                        <li>The buses have public address system, LCD panel showing real-time route information</li>
                    </ul>

                    <p className="ticket-info">
                        Tickets on BMTC bus routes can also be looked up by logging on to{' '}
                        <a href="http://www.viaworld.in" target="_blank" rel="noopener noreferrer">www.viaworld.in</a>
                        {' '}or calling <a href="tel:+91-80-41431000">41431000</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Transport;