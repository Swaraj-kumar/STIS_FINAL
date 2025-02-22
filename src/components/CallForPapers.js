import React from 'react';
import './CallForPapers.css';

const CallForPapers = () => {
    return (
        <div className="call-for-papers-container">
            <div className="heading-image-conf">
                <h1 className="themes-heading">Call For Papers</h1>
            </div>
            <div className="call-for-papers-content">
                <p className="papers-paragraph">
                    Authors are requested to submit abstracts within 250 words on any aspect given in the scope of
                    Conference. All abstracts will be peer reviewed, and the authors will be notified accordingly.
                    The abstracts may be prepared in MS word format and sent electronically to the Conference <strong>e -  mail address</strong> : <a href='mailto:stis.mte@iisc.ac.in' target='_blank'>stis.mte@iisc.ac.in</a>
                </p>

                <p className="papers-paragraph">
                    Participation of students is strongly encouraged. All student papers would be presented in
                    dedicated poster/oral session.
                </p>
            </div>
        </div>
    );
};

export default CallForPapers;