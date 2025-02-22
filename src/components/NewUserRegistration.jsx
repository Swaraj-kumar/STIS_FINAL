import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./NewUserRegistration.css";

const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon",
  "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
  "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const NewUserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    givenName: "",
    familyName: "",
    fullName: "",
    country: "",
    affiliation: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to validate strong passwords
  const validatePassword = (password) => {
    // Password must be at least 8 characters and include at least one uppercase, one lowercase, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    // Validate strong password
    if (!validatePassword(formData.password)) {
      setMessage("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://stisv.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/conference-registration"), 2000);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server error, please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="registration-page">
      <h2 className="page-title">New User Registration</h2>
      <div className="registration-container">
        <form onSubmit={handleSubmit}>
          <label>E-mail <span className="required">*</span></label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            className="input-field" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <label>Create Password <span className="required">*</span></label>
          <input 
            type="password" 
            name="password" 
            placeholder="Create a password" 
            className="input-field" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />

          <label>Confirm Password <span className="required">*</span></label>
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm your password" 
            className="input-field" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />

          <label>Telephone <span className="required">*</span></label>
          <PhoneInput 
            country={"us"} 
            value={formData.phone} 
            onChange={handlePhoneChange} 
            inputClass="input-field" 
            enableSearch 
            autoFormat 
            required 
          />

          <label>Given Name / First Name <span className="required">*</span></label>
          <input 
            type="text" 
            name="givenName" 
            placeholder="Enter your given name" 
            className="input-field" 
            value={formData.givenName} 
            onChange={handleChange} 
            required 
          />

          <label>Family Name / Surname</label>
          <input 
            type="text" 
            name="familyName" 
            placeholder="Enter your family name" 
            className="input-field" 
            value={formData.familyName} 
            onChange={handleChange} 
          />

          <label>Full Name <span className="required">*</span></label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="Enter your full name" 
            className="input-field" 
            value={formData.fullName} 
            onChange={handleChange} 
            required 
          />

          <label>Country/Region <span className="required">*</span></label>
          <select 
            name="country" 
            className="input-field" 
            value={formData.country} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Select your country</option>
            {countryList.map((countryName, index) => (
              <option key={index} value={countryName}>{countryName}</option>
            ))}
          </select>

          <label>Affiliation <span className="required">*</span></label>
          <input 
            type="text" 
            name="affiliation" 
            placeholder="Enter your affiliation" 
            className="input-field" 
            value={formData.affiliation} 
            onChange={handleChange} 
            required 
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="return-btn" onClick={() => navigate("/conference-registration")}>
            Back to Login
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewUserRegistration;
