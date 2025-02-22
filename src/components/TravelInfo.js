// import React, { useState, useEffect } from 'react';
// import './TravelInfo.css';

// const TravelInfo = () => {
//     const [activeSection, setActiveSection] = useState('all');

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     return (
//         <div className="travel-info-page">
//             <div className="travel-container">
//                 <h1 className="travel-title">Travel Information</h1>

//                 <section className="travel-section">
//                     <h2>How to reach IISc Campus</h2>
//                     <div className="info-card">
//                         <div className="key-info">
//                             <p><strong>Important Note:</strong> IISc is locally known as "Tata Institute"</p>
//                             <p><strong>Distance from Airport:</strong> 35 km from Bengaluru International Airport (BIAL)</p>
//                         </div>

//                         <div className="transport-options">
//                             <div className="transport-card">
//                                 <h3>🚕 By Taxi</h3>
//                                 <ul>
//                                     <li>Always mention "Tata Institute" to drivers</li>
//                                     <li>Available at airport and throughout city</li>
//                                     <li>Use ride-hailing apps like Uber/Ola for convenience</li>
//                                 </ul>
//                             </div>

//                             <div className="transport-card">
//                                 <h3>🛺 By Auto Rickshaw</h3>
//                                 <ul>
//                                     <li>Ask for "Tata Institute"</li>
//                                     <li>Ensure meter usage or pre-negotiate fare</li>
//                                     <li>Common and economical mode of transport</li>
//                                 </ul>
//                             </div>

//                             <div className="transport-card">
//                                 <h3>🚌 By Bus</h3>
//                                 <ul>
//                                     <li>Tell conductor "Tata Institute"</li>
//                                     <li>Multiple routes available from major locations</li>
//                                     <li>Most economical option</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section className="travel-section">
//                     <h2>IISc Campus Location</h2>
//                     <div className="map-container">
//                         <iframe
//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.867420936048!2d77.5652489!3d13.0148257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae166b2e68f1a3%3A0x8583c93d79113b6f!2sIndian%20Institute%20of%20Science!5e0!3m2!1sen!2sin!4v1693847769244!5m2!1sen!2sin"
//                             width="100%"
//                             height="450"
//                             style={{ border: 0 }}
//                             allowFullScreen=""
//                             loading="lazy"
//                             referrerPolicy="no-referrer-when-downgrade"
//                             title="IISc Campus Map"
//                             className="google-map"
//                         ></iframe>
//                     </div>
//                     <div className="map-actions">
//                         <a
//                             href="https://www.google.com/maps/dir//Indian+Institute+of+Science"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="button"
//                         >
//                             Get Directions to IISc
//                         </a>
//                     </div>
//                 </section>

//                 <section className="travel-section">
//                     <h2>Tourism Information</h2>
//                     <div className="tourism-card">
//                         <h3>Karnataka State Tourism Development Corporation</h3>
//                         <div className="tourism-info">
//                             <div className="contact-info">
//                                 <h4>Contact Details:</h4>
//                                 <p><strong>Tourist Helpline:</strong> 1800-425-2323</p>
//                                 <p><strong>Email:</strong> info@kstdc.co</p>
//                                 <p><strong>Working Hours:</strong> 9:00 AM to 6:00 PM (All days)</p>
//                             </div>
//                             <div className="tourism-links">
//                                 <a
//                                     href="https://www.kstdc.co/"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="button"
//                                 >
//                                     Visit Tourism Website
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default TravelInfo;