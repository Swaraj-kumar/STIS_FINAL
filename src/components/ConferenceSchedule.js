import React, { useEffect } from 'react';
import './ConferenceSchedule.css';

const ConferenceSchedule = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="conference-schedule-container">
            <h1 className="coming-soon-text">COMING SOON</h1>
        </div>
    );
};

export default ConferenceSchedule;