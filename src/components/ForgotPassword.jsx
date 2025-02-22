import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to validate strong passwords
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
  
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
  
    if (!validatePassword(newPassword)) {
      setMessage("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });
  
      setMessage(response.data.message);
      setTimeout(() => navigate("/conference-registration"), 2000);
  
    } catch (error) {
      console.error("Error resetting password:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "Failed to reset password. Please try again.");
    }
  };
  

  return (
    <div className="forgot-password-page">
      <h2 className="page-title">Reset Password</h2>
      <div className="forgot-password-container">
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-btn">Reset Password</button>
          {message && <p className="message">{message}</p>}
        </form>
        <button className="back-btn" onClick={() => navigate("/conference-registration")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
































