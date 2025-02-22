import React, { useEffect } from 'react';
import './Venue.css';

const Venue = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="venue-container">
            <h1 className="venue-heading">Conference Venue</h1>
            <p className="venue-description">
                The STIS-V 2025 Conference will be held at the prestigious Indian Institute of Science (IISc), Bengaluru. Known for its lush green campus and cutting-edge research facilities, IISc provides the perfect environment for fostering discussions and collaborations in the field of iron and steelmaking.
                <br /> <br />
                All technical sessions will be held in the National Science Seminar Complex
                (J.N. Tata Auditorium), located within the Indian Institute of Science campus,
                Bengaluru, India, during December 9-12, 2025. International communication facilities
                including fax, phone and e-mail will be provided to delegates.
            </p>

            <div className="location-section">
                <h2 className="location-heading">Location</h2>
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
    );
};

export default Venue;
