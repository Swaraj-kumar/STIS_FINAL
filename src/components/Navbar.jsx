import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Re-read localStorage every time the location changes.
  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setUserFullName(storedFullName);
    } else {
      setUserFullName(null);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo({ top: 0 });
    }
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo(0, 0);
  };

  const handleMouseEnter = (dropdown) => {
    if (window.innerWidth > 1024) {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setActiveDropdown(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("fullName");
    setUserFullName(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".navbar-dropdown") === null) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" onClick={handleLogoClick}>
          <img
            src="https://iisc.ac.in/wp-content/themes/iisc/images/favicon/apple-icon-57x57.png"
            alt="STIS-V 2025 Logo"
          />
          <span className="logo-text">STIS-V 2025</span>
        </NavLink>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`navbar-items ${isOpen ? "active" : ""}`}>
        <li className="navbar-dropdown">
          <NavLink to="/" onClick={() => handleDropdownClick("/")}>
            Home
          </NavLink>
        </li>
        <li
          className="navbar-dropdown"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
        >
          <button className="dropdown-toggle" onClick={() => toggleDropdown("about")}>
            About
          </button>
          <div className={`dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
            <NavLink to="/about" onClick={() => handleDropdownClick("/about")}>
              About the Conference
            </NavLink>

            <NavLink to="/message-to-chairman" onClick={() => handleDropdownClick("/message-to-chairman")}>
               Message from the Conference Chair
            </NavLink>
            <NavLink to="/official-language" onClick={() => handleDropdownClick("/official-language")}>
              Official Language
            </NavLink>
            <NavLink to="/downloads" onClick={() => handleDropdownClick("/downloads")}>
              Announcements
            </NavLink>
            <NavLink to="/sponsors" onClick={() => handleDropdownClick("/sponsors")}>
              Sponsors
            </NavLink>
          </div>
        </li>
        <li
          className="navbar-dropdown"
          onMouseEnter={() => handleMouseEnter("programme")}
          onMouseLeave={handleMouseLeave}
        >
          <button className="dropdown-toggle" onClick={() => toggleDropdown("programme")}>
            Programme
          </button>
          <div className={`dropdown-menu ${activeDropdown === "programme" ? "show" : ""}`}>
            <NavLink to="/conference-themes" onClick={() => handleDropdownClick("/conference-themes")}>
              Conference Themes & Topics
            </NavLink>
            <NavLink to="/conference-schedule" onClick={() => handleDropdownClick("/conference-schedule")}>
              Conference Schedule
            </NavLink>
            <NavLink to="/conference-proceedings" onClick={() => handleDropdownClick("/conference-proceedings")}>
              Conference Proceedings
            </NavLink>
            <NavLink to="/programme" onClick={() => handleDropdownClick("/programme")}>
              Important Dates
            </NavLink>
            <li className="navbar-dropdown">
              <NavLink to="/distinguished-speaker" onClick={() => handleDropdownClick("/distinguished-speaker")}>
                Speakers
              </NavLink>
            </li>
          </div>
        </li>
        <li
          className="navbar-dropdown"
          onMouseEnter={() => handleMouseEnter("abstract-submission")}
          onMouseLeave={handleMouseLeave}
        >
          <button className="dropdown-toggle" onClick={() => toggleDropdown("abstract-submission")}>
            Abstract Submission
          </button>
          <div className={`dropdown-menu ${activeDropdown === "abstract-submission" ? "show" : ""}`}>
            <NavLink to="/abstractsubmission" onClick={() => handleDropdownClick("/abstract-submission")}>
              Submit Abstract
            </NavLink>
          </div>
        </li>
        <li
          className="navbar-dropdown"
          onMouseEnter={() => handleMouseEnter("registration")}
          onMouseLeave={handleMouseLeave}
        >
        </li>
        <li className="navbar-dropdown">
          <NavLink to="/committee" onClick={() => handleDropdownClick("/committee")}>
            Committee
          </NavLink>
        </li>
        <li
          className="navbar-dropdown"
          onMouseEnter={() => handleMouseEnter("venue")}
          onMouseLeave={handleMouseLeave}
        >
          <button className="dropdown-toggle" onClick={() => toggleDropdown("venue")}>
            Venue
          </button>
          <div className={`dropdown-menu ${activeDropdown === "venue" ? "show" : ""}`}>
            <NavLink to="/venue" onClick={() => handleDropdownClick("/venue")}>
              Conference Venue
            </NavLink>
            <NavLink to="/reach-iisc" onClick={() => handleDropdownClick("/reach-iisc")}>
              Reach IIsc
            </NavLink>
            <NavLink to="/accomodation" onClick={() => handleDropdownClick("/accomodation")}>
              Accommodation
            </NavLink>
          </div>
        </li>
        <li className="navbar-dropdown">
          <NavLink to="/contact" onClick={() => handleDropdownClick("/contact")}>
            Contact
          </NavLink>
        </li>
        <li
          className="navbar-dropdown"
          onMouseEnter={() => handleMouseEnter("information")}
          onMouseLeave={handleMouseLeave}
        >
          <button className="dropdown-toggle" onClick={() => toggleDropdown("information")}>
            Information
          </button>
          <div className={`dropdown-menu ${activeDropdown === "information" ? "show" : ""}`}>
            <NavLink to="/about-bengaluru" onClick={() => handleDropdownClick("/about-bengaluru")}>
              About Bengaluru
            </NavLink>
            <NavLink to="/weather" onClick={() => handleDropdownClick("/weather")}>
              Weather
            </NavLink>
            <NavLink to="/travel-information" onClick={() => handleDropdownClick("/travel-information")}>
              Travel Information
            </NavLink>
            <NavLink to="/tours-and-social-events" onClick={() => handleDropdownClick("/tours-and-social-events")}>
              Tours and Social Events
            </NavLink>
            {/* <NavLink to="/interest" onClick={() => handleDropdownClick("/interest")}>
              Expression of Interest
            </NavLink> */}
          </div>
        </li>
        <li className="navbar-item">
          {userFullName ? (
            <div className="user-info">
              <span>Welcome, {userFullName}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/conference-registration"
              onClick={() => handleDropdownClick("/conference-registration")}
            >
              Login/SignUp
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

