import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AbstractSubmissionStatus.css'; // Import the CSS file

const AbstractSubmissionStatus = ({ uid, token }) => {
  const [abstract, setAbstract] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbstract = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-abstract/${uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAbstract(response.data.abstract);

        // Mock status handling (replace with actual backend status handling)
        if (response.data.abstract) {
          setStatus(response.data.abstract.status || "Pending");
        }
      } catch (err) {
        setError("Failed to fetch abstract");
      }
    };

    fetchAbstract();
  }, [uid, token]);

  return (
    <div className="abstract-status-container">
      <h2>Submitted Abstract</h2>
      {error && <p className="error-message">{error}</p>}
      {abstract ? (
        <div className="abstract-details">
          <div className="abstract-row"><strong>Title:</strong> <span>{abstract.title}</span></div>
          <div className="abstract-row"><strong>Theme:</strong> <span>{abstract.theme}</span></div>
          <div className="abstract-row"><strong>Presenting Type:</strong> <span>{abstract.presentingType}</span></div>
          <div className="abstract-row"><strong>First Author:</strong> <span>{abstract.firstAuthorName}</span></div>
          <div className="abstract-row"><strong>Affiliation:</strong> <span>{abstract.firstAuthorAffiliation}</span></div>
          <div className="abstract-row">
            <strong>Status:</strong> 
            <span className={status === "Accepted" ? "status-accepted" : "status-rejected"}>{status}</span>
          </div>
          {abstract.abstractFile && (
            <div className="abstract-row">
              <strong>Abstract File:</strong> 
              <a href={`http://localhost:5000/${abstract.abstractFile}`} target="_blank" rel="noopener noreferrer">Download</a>
            </div>
          )}
        </div>
      ) : (
        <p>No abstract submitted yet.</p>
      )}
    </div>
  );
};

export default AbstractSubmissionStatus;
