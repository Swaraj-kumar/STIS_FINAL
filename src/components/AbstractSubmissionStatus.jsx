import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AbstractSubmissionStatus.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const AbstractSubmissionStatus = () => {
  const [abstract, setAbstract] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [isFinalized, setIsFinalized] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedAbstract, setUpdatedAbstract] = useState({});
  const [newFile, setNewFile] = useState(null);
  const [showFinalizePopup, setShowFinalizePopup] = useState(false);

  const token = sessionStorage.getItem("token");
  const uid = sessionStorage.getItem("uid");

  useEffect(() => {
    if (!uid || !token) {
      window.location.href = "/login-signup";
      return;
    }

    const fetchAbstract = async () => {
      try {
        const response = await axios.get(`https://stisv.onrender.com/get-abstract/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.abstract;
        let parsedAuthors = [];
        try {
          parsedAuthors = Array.isArray(data.otherAuthors)
            ? data.otherAuthors
            : JSON.parse(data.otherAuthors || "[]");
        } catch (e) {
          parsedAuthors = [];
        }

        setAbstract(data);
        setUpdatedAbstract({ ...data, otherAuthors: parsedAuthors });
        setStatus(data?.status || "Pending");
        setIsFinalized(data?.isFinalized || false);
      } catch (err) {
        setError("Failed to fetch abstract");
      } finally {
        setLoading(false);
      }
    };

    fetchAbstract();
  }, [uid, token]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("uid", uid);

      let hasUpdates = false;
      const fields = [
        "title", "scope", "presentingType",
        "firstAuthorName", "firstAuthorAffiliation",
        "otherAuthors", "presentingAuthorName",
        "presentingAuthorAffiliation", "mainBody"
      ];

      fields.forEach(field => {
        if (JSON.stringify(updatedAbstract[field]) !== JSON.stringify(abstract[field])) {
          formData.append(field, JSON.stringify(updatedAbstract[field]));
          hasUpdates = true;
        }
      });

      if (newFile) {
        formData.append("abstractFile", newFile);
        hasUpdates = true;
      }

      if (!hasUpdates) {
        setError("No changes detected. Please modify your abstract before attempting to save.");
        setUpdating(false);
        return;
      }

      const response = await axios.put("https://stisv.onrender.com/update-abstract", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAbstract(response.data.abstract); // ✅ update download link
      setUpdatedAbstract(response.data.abstract);
      setEditMode(false);
      setNewFile(null);
      setError(null);
    } catch (err) {
      setError("Error updating abstract.");
    } finally {
      setUpdating(false);
    }
  };

  const confirmFinalize = async () => {
    setFinalizing(true);
    try {
      await axios.post("https://stisv.onrender.com/finalize-abstract", { uid }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFinalized(true);
      setEditMode(false);
      setShowFinalizePopup(false);
    } catch (err) {
      setError("Error finalizing submission.");
    } finally {
      setFinalizing(false);
    }
  };

  const handleFileChange = (e) => {
    if (!isFinalized) setNewFile(e.target.files[0]);
  };

  const handlePayment = () => {
    window.location.href = "https://www.onlinesbi.sbi/sbicollect/";
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(abstract.abstractCode);
    alert("Abstract Code copied to clipboard!");
  };

  return (
    <>
      <Navbar />
      <div className="abstract-status-container">
        <h2>Abstract Submission Status</h2>

        {showFinalizePopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Are you sure you want to submit?</h3>
              <p>Once submitted, you will not be able to edit your abstract.</p>
              <div className="popup-buttons">
                <button className="confirm-button" onClick={confirmFinalize} disabled={finalizing}>
                  {finalizing ? "Submitting..." : "Yes, Submit"}
                </button>
                <button className="cancel-button" onClick={() => setShowFinalizePopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {abstract && (
          <div className="abstract-details">
            {abstract.abstractCode && (
              <div className="abstract-row abstract-code-row">
                <strong>Abstract Code:</strong>
                <div className="abstract-code-box">
                  <span className="abstract-code">{abstract.abstractCode}</span>
                  <FontAwesomeIcon icon={faCopy} className="copy-icon" title="Copy to clipboard" onClick={copyToClipboard} />
                </div>
              </div>
            )}

            {[
              { label: "Title", key: "title" },
              { label: "Theme", key: "scope" },
              { label: "Mode of Presentation", key: "presentingType", type: "select", options: ["Oral", "Poster"] },
              { label: "First Author Name", key: "firstAuthorName" },
              { label: "First Author Affiliation", key: "firstAuthorAffiliation" },
              { label: "Other Author(s)", key: "otherAuthors", type: "authorsTable" },
              { label: "Presenting Author Name", key: "presentingAuthorName" },
              { label: "Presenting Author Affiliation", key: "presentingAuthorAffiliation" },
              { label: "Main Body", key: "mainBody", type: "textarea" },
            ].map((field) => (
              <div className="abstract-row" key={field.key}>
                <strong>{field.label}:</strong>
                {field.type === "authorsTable" ? (
                  editMode ? (
                    <div className="authors-edit-list">
                      {Array.isArray(updatedAbstract[field.key]) &&
                        updatedAbstract[field.key].map((author, idx) => (
                          <div key={idx} className="author-edit-row">
                            <input
                              type="text"
                              placeholder="Name"
                              value={author.name}
                              onChange={(e) => {
                                const updatedAuthors = [...updatedAbstract[field.key]];
                                updatedAuthors[idx].name = e.target.value;
                                setUpdatedAbstract({ ...updatedAbstract, [field.key]: updatedAuthors });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Affiliation"
                              value={author.affiliation}
                              onChange={(e) => {
                                const updatedAuthors = [...updatedAbstract[field.key]];
                                updatedAuthors[idx].affiliation = e.target.value;
                                setUpdatedAbstract({ ...updatedAbstract, [field.key]: updatedAuthors });
                              }}
                            />
                            <button
                              type="button"
                              className="remove-author-button"
                              onClick={() => {
                                const updatedAuthors = updatedAbstract[field.key].filter((_, i) => i !== idx);
                                setUpdatedAbstract({ ...updatedAbstract, [field.key]: updatedAuthors });
                              }}
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      {updatedAbstract[field.key]?.length < 5 && (
                        <button
                          className="add-author-button"
                          type="button"
                          onClick={() => {
                            const updatedAuthors = Array.isArray(updatedAbstract[field.key])
                              ? [...updatedAbstract[field.key]]
                              : [];
                            updatedAuthors.push({ name: "", affiliation: "" });
                            setUpdatedAbstract({ ...updatedAbstract, [field.key]: updatedAuthors });
                          }}
                        >
                          + Add Author
                        </button>
                      )}
                    </div>
                  ) : (
                    (() => {
                      let authorsArray = [];
                      try {
                        authorsArray = Array.isArray(abstract[field.key])
                          ? abstract[field.key]
                          : JSON.parse(abstract[field.key] || "[]");
                      } catch (e) {
                        authorsArray = [];
                      }

                      return authorsArray.length > 0 ? (
                        <table className="authors-table">
                          <thead>
                            <tr><th>Name</th><th>Affiliation</th></tr>
                          </thead>
                          <tbody>
                            {authorsArray.map((author, idx) => (
                              <tr key={idx}>
                                <td>{author.name}</td>
                                <td>{author.affiliation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <span>No other authors</span>
                      );
                    })()
                  )
                ) : editMode ? (
                  field.type === "select" ? (
                    <select
                      value={updatedAbstract[field.key] || ""}
                      onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [field.key]: e.target.value })}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={updatedAbstract[field.key] || ""}
                      onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [field.key]: e.target.value })}
                    />
                  ) : (
                    <input
                      type="text"
                      value={updatedAbstract[field.key] || ""}
                      onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, [field.key]: e.target.value })}
                    />
                  )
                ) : (
                  <span>{abstract[field.key]}</span>
                )}
              </div>
            ))}

            <div className="abstract-row">
              <strong>Abstract File:</strong>
              {abstract.abstractFile ? (
                <div>
                  <a
                    href={abstract.abstractFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-link"
                  >
                    Download
                  </a>
                  <span style={{ marginLeft: "10px", fontSize: "0.9rem", color: "#555" }}>
                    (Please open using MS Word)
                  </span>
                </div>
              ) : (
                <span>No file uploaded</span>
              )}
            </div>

            {editMode && !isFinalized && (
              <div className="abstract-row">
                <strong>Upload New File:</strong>
                <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                <span style={{ fontSize: "0.9rem", color: "#555" }}>
                  (Please upload a Word document or PDF)
                </span>
              </div>
            )}

            <div className="abstract-row">
              <strong>Status:</strong>
              <span className={
                status === "Approved" ? "status-accepted" :
                  status === "Rejected" ? "status-rejected" :
                    "status-pending"
              }>
                {status}
              </span>
            </div>

            {isFinalized && status === "Pending" && (
              <p className="finalized-message">
                Your abstract is currently under review. You will be notified upon the completion of the evaluation process.
              </p>
            )}

            {status === "Rejected" && (
              <div className="main-action-row">
                <button className="submit-again-button" onClick={() => window.location.href = "/submit-abstract"}>
                  Resubmit Abstract
                </button>
                <button className="back-button" onClick={goHome}>Back to Home</button>
              </div>
            )}

            {status === "Approved" && isFinalized && (
              <div className="main-action-row">
                <button className="pay-button" onClick={handlePayment}>Pay Now</button>
                <button className="back-button" onClick={goHome}>Back to Home</button>
              </div>
            )}

            {!isFinalized && status !== "Rejected" && (
              <>
                {editMode && error && (
                  <p className="error-message">{error}</p>
                )}

                {editMode && (
                  <div className="edit-action-row">
                    <button className="save-button" onClick={handleUpdate} disabled={updating}>
                      {updating ? "Saving..." : "Save Changes"}
                    </button>
                    <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                )}

                <p className="submission-note">
                  Your abstract is still <strong>under review</strong>. We will update you once the review is complete.
                </p>
                <p className="submission-instruction">
                  Please make changes if needed and then click on <strong>"Submit Abstract"</strong> to confirm the final version for review.
                </p>

                <div className="main-action-row">
                  {!editMode && (
                    <button className="edit-button" onClick={() => setEditMode(true)}>
                      Edit / Resubmit Abstract
                    </button>
                  )}
                  <button className="finalize-button" onClick={() => setShowFinalizePopup(true)}>
                    Submit Abstract
                  </button>
                  <button className="back-button" onClick={goHome}>Back to Home</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <br /><br />
      <Footer />
    </>
  );
};

export default AbstractSubmissionStatus;
