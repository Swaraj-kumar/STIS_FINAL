import React, { useEffect, useState } from 'react';
import './Interest.css';

const Interest = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleFormClick = () => {
        window.open('https://forms.office.com/r/tDwrw0rFNa', '_blank');
    };

    return (
        <div className={`interest-page ${isVisible ? 'visible' : ''}`}>
            <div className="interest-container">
                <h1 className="interest-title">Expression of Interest - STIS-V 2025</h1>

                <div className="content-section">
                    <p className="intro-text">
                        The organizing committee of STIS-V 2025
                        is seeking an early indication of your intentions to participate in this prestigious conference.
                    </p>

                    <div className="info-box primary">
                        <h2 className="info-title">We'd like to know:</h2>
                        <ul className="info-list">
                            <li>Your interest in attending or participating in the conference</li>
                            <li>Whether you require accommodation assistance</li>
                            <li>Your interest in attending associated events</li>
                            <li>Potential sponsorship opportunities</li>
                        </ul>
                    </div>

                    <p className="notice-text">
                        Please note: This is not a registration document. By completing this form,
                        you will receive priority booking opportunities for accommodation and social events.
                    </p>

                    <div className="info-box secondary">
                        <p className="highlight-text">
                            Early expressions of interest will help us better plan and accommodate all participants' needs.
                        </p>
                    </div>

                    <div className="action-section">
                        <button
                            onClick={handleFormClick}
                            className="express-interest-btn"
                        >
                            Express Interest Now
                        </button>
                    </div>

                    <div className="contact-section">
                        Questions? Contact the conference secretariat at{' '}
                        <a href="mailto:stis.mte@iisc.ac.in" className="contact-link">
                        stis.mte@iisc.ac.in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interest;