import React from 'react';
import './Programme.css';

const Programme = () => {
    return (
        <div className="programme-container">
            <div className="heading-image-programme">
                <h1 className="programme-heading">Conference Programme</h1>
            </div>

            <h2 className="important-dates-heading">Important Dates</h2>
            
            <div className="dates-cards-container">
                <div className="date-card">
                    <h3>Abstract Submission</h3>
                    <p>30th April 2025 </p>
                </div>
                <div className="date-card">
                    <h3>Acceptance of the Abstract</h3>
                    <p>30th May 2025</p>
                </div>
                <div className="date-card">
                    <h3>Submission of Paper / Extended Abstract</h3>
                    <p>30th September 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Programme;
