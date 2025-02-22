// src/components/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-info">
                <h1 className="contact-heading">Contact Us</h1>
                <p className="contact-details">
                    <strong>ORGANIZER</strong> <br />
                    INDIAN INSTITUTE OF SCIENCE, BENGALURU, INDIA<br />
                </p>
                <p className="contact-details">
                    <strong>Conference Secretariat:</strong><br />
                    Ms. Roopashree Gowda <br />
                    Prof. Govind S. Gupta<br />
                    Department of Materials Engineering<br />
                    Indian Institute of Science (IISc)<br />
                    Bengaluru – 560 012, India
                </p>
                <p className="contact-details">
                    <strong>E-mail:</strong><br />
                    <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a><br />
                    <strong>Website:</strong><br />
                    <a href="https://materials.iisc.ac.in/stis2025/" target="_blank" rel="noopener noreferrer">https://materials.iisc.ac.in/stis2025/</a><br />
                    <strong>Tel.:</strong> <br /> +91 80 22933240
                </p>
            </div>
        </div>
    );
};

export default Contact;
