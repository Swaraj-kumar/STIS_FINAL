import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConRegistration.css";
import axios from "axios";

const ConferenceRegistration = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("uid", response.data.uid);
        localStorage.setItem("fullName", response.data.fullName);
        navigate("/abstractsubmission");
      }      
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
      console.error("Login failed:", error);
    }
  };
  
  return (
    <div className="registration-page">
      <h2 className="page-title">Member Login</h2>

      <div className="login-container">
        <input
          type="email"
          placeholder="Please enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Please enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="remember-forgot">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
          <button
            onClick={() => navigate("/forgot-password")}
            className="forgot-password"
          >
            Forgot password?
          </button>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>
        <button className="register-btn" onClick={() => navigate("/register")}>
          New User Registration
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ConferenceRegistration;



































