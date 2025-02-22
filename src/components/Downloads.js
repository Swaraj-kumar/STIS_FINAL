import React from 'react';
import './Downloads.css';

const Downloads = () => {
    return (
        <div className="downloads-container">
            <div className="heading-image-downloads">
                <h1 className="downloads-heading">First Announcement</h1>
            </div>
            <div className="download-section">
                <a
                    href="./brochure.pdf"
                    download="STIS.pdf"
                    className="download-button"
                >
                    Download Brochure
                </a>
                <a
                    href="./flyer.pdf"
                    download="STIS_Flyer.pdf"
                    className="download-button"
                >
                    Download Flyer
                </a>
            </div>
        </div>
    );
};

export default Downloads;