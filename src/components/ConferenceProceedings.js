import React, { useEffect } from 'react';
import './ConferenceProceedings.css';

const ConferenceProceedings = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="conference-proceedings-container">
            <div className="heading-image-proceedings">
                <h1 className="proceedings-heading">Conference Proceedings</h1>
            </div>
            <div className="proceedings-paragraph">
                <p>
                    Papers/extended abstract after peer-review process will be published in a Conference Proceeding.
                    Attempts are being made to publish selected papers in identified international journals after due
                    refereeing process as per journal requirements.
                </p>
            </div>
        </div>
    );
};

export default ConferenceProceedings;
