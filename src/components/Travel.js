import React from 'react';
import { Link } from 'react-router-dom';
import './Travel.css';

const Travel = () => {
    return (
        <div className="travel-container">
            <div className="travel-content">
                <h1>Conference Travel Information</h1>

                <section className="travel-checklist">
                    <h2>Travel Information</h2>
                    <ul className="travel-links">
                        <li>
                            <Link to="/travel-checklist" className="travel-nav-link">
                                Travel Checklist ->
                            </Link>
                        </li>
                        <li>
                            <Link to="/international-travel" className="travel-nav-link">
                                International Travel to Bengaluru ->
                            </Link>
                        </li>
                        <li>
                            <Link to="/transport" className="travel-nav-link">
                                Transport from/to the new BIAL Airport ->
                            </Link>
                        </li>
                        <li>
                            <Link to="/local-bengaluru" className="travel-nav-link">
                                Getting around Bengaluru ->
                            </Link>
                        </li>
                        <li>
                            <Link to="/electricity" className="travel-nav-link">
                                Electrical Specifications in India ->
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/travel-info" className="travel-nav-link">
                                Additional Travel Information ->
                            </Link>
                        </li> */}
                    </ul>
                </section>

                <section className="airport-info">
                    <h2>Airport Information</h2>
                    <p>The new Bengaluru International Airport is located 35 kms from the city.
                        For detailed information, visit the official airport website:
                        <a href="http://www.bengaluruairport.com/" className="airport-link">
                            www.bengaluruairport.com
                        </a></p>
                </section>

                <section className="tour-packages">
                    <h2>Rail Tour Packages</h2>
                    <p>Take this opportunity to explore other Indian cities. Book e-tickets through
                        Indian Railway Catering and Tourism Corporation.
                        <a href="https://www.irctc.co.in/nget/train-search" className="airport-link">
                            Book now !</a><br />
                        The Rail tour packages offer selection on attractive theme categories, such as: <strong>Adventure, Spiritual, Wildlife, Heritage, Hills, etc.</strong>
                    </p>
                    <p></p>
                </section>
            </div>
        </div>
    );
};

export default Travel;