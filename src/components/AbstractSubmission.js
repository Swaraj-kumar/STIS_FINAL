// import React from 'react';
// import './AbstractSubmission.css';

// const AbstractSubmission = () => {
//   console.log("Rendering AbstractSubmission Component");
//   return (
//     <div className="abstract-submission-container">
//       <h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>Submission of Abstract</h1>
//       <p>
//         Authors are requested to submit abstracts within 250 words with all contact details
//         including the full postal address on any aspect given in the scope of the conference.
//         All abstracts will be peer reviewed and the authors will be notified accordingly.
//       </p>
//       <p>
//         The abstracts may be prepared in MS Word format and sent electronically to the Conference
//         e-mail address <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
//       </p>
      
//       <h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>Instruction to Authors</h1>
//       <ul>
//       <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
//       </ul>
//     </div>
//   );
// };

// export default AbstractSubmission;






// import React from 'react';
// import './AbstractSubmission.css';

// const AbstractSubmission = () => {
//   console.log("Rendering AbstractSubmission Component");
//   return (
//     <div className="abstract-submission-container">
//       <h1 className="abstract-title">Submission of Abstract</h1>
//       <p>
//         Authors are requested to submit abstracts within 250 words with all contact details
//         including the full postal address on any aspect given in the scope of the conference.
//         All abstracts will be peer-reviewed and the authors will be notified accordingly.
//       </p>
//       <p>
//         The abstracts may be prepared in MS Word format and sent electronically to the Conference
//         e-mail address <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
//       </p>
      
//       <button className="submit-abstract-button">Submit Abstract here</button>
      
//       <h1 className="abstract-title" style={{ marginTop: '20px' }}>Instruction to Authors</h1>
//       <ul>
//         <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
//       </ul>
//     </div>
//   );
// };

// export default AbstractSubmission;












// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AbstractSubmission.css';

// const AbstractSubmission = () => {
//   const navigate = useNavigate();

//   const handleRedirect = () => {
//     navigate('/submit-abstract');
//   };

//   return (
//     <div className="abstract-submission-container">
//       <h1 className="abstract-title">Submission of Abstract</h1>
//       <p>
//         Authors are requested to submit abstracts within 250 words with all contact details
//         including the full postal address on any aspect given in the scope of the conference.
//         All abstracts will be peer-reviewed and the authors will be notified accordingly.
//       </p>
//       <p>
//         The abstracts may be prepared in MS Word format and sent electronically to the Conference
//         e-mail address <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
//       </p>
      
//       <button className="submit-abstract-button" onClick={handleRedirect}>Submit Abstract here</button>
      
//       <h1 className="abstract-title" style={{ marginTop: '20px' }}>Instruction to Authors</h1>
//       <ul>
//         <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
//       </ul>
//     </div>
//   );
// };

// export default AbstractSubmission;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AbstractSubmission.css';

// const AbstractSubmission = () => {
//   const navigate = useNavigate();
//   const [isRegistered, setIsRegistered] = useState(false);

//   useEffect(() => {
//     // Check if user is registered (This could be fetched from local storage or an API)
//     const userRegistered = localStorage.getItem('userRegistered'); // Assume this is set during registration
//     setIsRegistered(userRegistered === 'true');
//   }, []);

//   const handleRedirect = () => {
//     if (isRegistered) {
//       navigate('/submit-abstract');
//     } else {
//       alert('Please register first before submitting an abstract.');
//       navigate('/conference-registration'); // Redirect to registration page
//     }
//   };

//   return (
//     <div className="abstract-submission-container">
//       <h1 className="abstract-title">Submission of Abstract</h1>
//       <p>
//         Authors are requested to submit abstracts within 250 words with all contact details
//         including the full postal address on any aspect given in the scope of the conference.
//         All abstracts will be peer-reviewed and the authors will be notified accordingly.
//       </p>
//       <p>
//         The abstracts may be prepared in MS Word format and sent electronically to the Conference
//         e-mail address <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
//       </p>

//       <button className="submit-abstract-button" onClick={handleRedirect}>
//         Submit Abstract here
//       </button>

//       <h1 className="abstract-title" style={{ marginTop: '20px' }}>Instruction to Authors</h1>
//       <ul>
//         <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
//       </ul>
//     </div>
//   );
// };

// export default AbstractSubmission;







// original

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AbstractSubmission.css';

// const AbstractSubmission = () => {
//   const navigate = useNavigate();
//   const [isRegistered, setIsRegistered] = useState(false);

//   useEffect(() => {
//     // Check if user is registered (This could be fetched from local storage or an API)
//     const userRegistered = localStorage.getItem('userRegistered'); // Assume this is set during registration
//     setIsRegistered(userRegistered === 'true');
//   }, []);

//   const handleRedirect = () => {
//     if (isRegistered) {
//       navigate('/submit-abstract');
//     } else {
//       alert('Please register first before submitting an abstract.');
//       navigate('/conference-registration'); // Redirect to registration page
//     }
//   };

//   return (
//     <div className="abstract-submission-container">
//       <h1 className="abstract-title">Submission of Abstract</h1>
//       <p>
//         Authors are requested to submit abstracts within 250 words with all contact details
//         including the full postal address on any aspect given in the scope of the conference.
//         All abstracts will be peer-reviewed and the authors will be notified accordingly.
//       </p>
//       <p>
//         The abstracts may be prepared in MS Word format and sent electronically to the Conference
//         e-mail address <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
//       </p>

//       <button className="submit-abstract-button" onClick={handleRedirect}>
//         Submit Abstract here
//       </button>

//       <h1 className="abstract-title" style={{ marginTop: '20px' }}>Instruction to Authors</h1>
//       <ul>
//         <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
//       </ul>
//     </div>
//   );
// };

// export default AbstractSubmission;




// working

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AbstractSubmission.css';

const AbstractSubmission = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in by verifying if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleRedirect = () => {
    if (isAuthenticated) {
      navigate('/submit-abstract'); // Redirect to Abstract Submission page
    } else {
      setErrorMessage('Please log in first before submitting an abstract.');
      setTimeout(() => {
        navigate('/conference-registration'); // Redirect to Login page after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="abstract-submission-container">
      <h1 className="abstract-title">Submission of Abstract</h1>
      <p>
        Authors are requested to submit abstracts within 250 words with all contact details
        including the full postal address on any aspect given in the scope of the conference.
        All abstracts will be peer-reviewed and the authors will be notified accordingly.
      </p>
      <p>
        The abstracts may be prepared in MS Word format and sent electronically to the Conference
        e-mail address <a href="mailto:stis.mte@iisc.ac.in">stis.mte@iisc.ac.in</a>
      </p>

      <button className="submit-abstract-button" onClick={handleRedirect}>
        Submit Abstract here
      </button>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <h1 className="abstract-title" style={{ marginTop: '20px' }}>Instruction to Authors</h1>
      <ul>
        <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
      </ul>
    </div>
  );
};

export default AbstractSubmission;
