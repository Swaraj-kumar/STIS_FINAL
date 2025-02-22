import React, { useState, useEffect } from 'react';
import './HomePage.css';

const calculateTimeRemaining = (endTime) => {
  const now = new Date().getTime();
  const timeRemaining = endTime - now;

  if (timeRemaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const HomePage = () => {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const endTime = new Date('2025-12-09T00:00:00').getTime();
    setIsVisible(true);

    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(endTime));
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container">
      <div className="home-background">
        <div className={`home-content ${isVisible ? 'fade-in' : ''}`}>
        {/* Marquee for Last Date of Submission */}
        <marquee className="marquee-text">
  Last Date of Abstract Submission: 30th April 2025 • Acceptance of the abstract: 30th May 2025 • Submission of paper/extended abstract: 30th September 2025
</marquee>

<p className="abstract-note">
  *Abstract Template is now Available
</p>


          <h1 className="home-title">
            FIFTH INTERNATIONAL CONFERENCE ON THE SCIENCE & TECHNOLOGY OF IRONMAKING AND STEELMAKING <br />
            <span className="title-highlight">STIS - V 2025</span>
          </h1>
          
          <div className="conference-dates">
            <div className="date-container">
              <i className="date-icon">📅</i>
              <span className="date-text">9 - 12 December 2025</span>
            </div>
          </div>

          <div className="home-timer">
            <div className="time-unit">
              <span className="time-value">{String(timeRemaining.days).padStart(2, '0')}</span>
              <span className="time-label">Days</span>
            </div>
            <span className="blink">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeRemaining.hours).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="blink">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeRemaining.minutes).padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <span className="blink">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeRemaining.seconds).padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;