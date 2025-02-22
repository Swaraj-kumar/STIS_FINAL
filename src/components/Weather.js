// Weather.js
import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
    const [timeOfDay, setTimeOfDay] = useState('');
    const [showTip, setShowTip] = useState(false);
    const [activeTab, setActiveTab] = useState('current');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay('morning');
        else if (hour < 17) setTimeOfDay('afternoon');
        else setTimeOfDay('evening');
    }, []);

    const weatherData = {
        current: {
            temp: '24°C',
            humidity: '65%',
            windSpeed: '12 km/h',
            description: 'Partly Cloudy'
        },
        forecast: [
            { day: 'Tomorrow', high: '29°C', low: '18°C', condition: 'Sunny' },
            { day: 'Wednesday', high: '27°C', low: '17°C', condition: 'Clear' },
            { day: 'Thursday', high: '28°C', low: '18°C', condition: 'Partly Cloudy' }
        ],
        tips: {
            morning: 'Perfect time for a morning walk in Cubbon Park!',
            afternoon: 'Consider visiting indoor attractions like museums during peak heat.',
            evening: 'Enjoy the pleasant evening at UB City rooftop restaurants.'
        }
    };

    const handleCheckWeather = () => {
        window.open('https://openweathermap.org/city/1277333', '_blank');
    };

    return (
        <div className={`weather-container ${timeOfDay}`}>
            <div className="weather-content">
                <h2 className="weather-title">Bengaluru's Weather</h2>
                
                <div className="weather-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
                        onClick={() => setActiveTab('current')}
                    >
                        Current
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
                        onClick={() => setActiveTab('forecast')}
                    >
                        Forecast
                    </button>
                </div>

                {activeTab === 'current' && (
                    <div className="current-weather animate-fade-in">
                        <div className="weather-card">
                            <div className="main-temp">{weatherData.current.temp}</div>
                            <div className="weather-details">
                                <div className="detail-item">
                                    <span className="label">Humidity:</span>
                                    <span className="value">{weatherData.current.humidity}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Wind:</span>
                                    <span className="value">{weatherData.current.windSpeed}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Condition:</span>
                                    <span className="value">{weatherData.current.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'forecast' && (
                    <div className="forecast-weather animate-fade-in">
                        {weatherData.forecast.map((day, index) => (
                            <div key={day.day} className="forecast-card" style={{animationDelay: `${index * 0.2}s`}}>
                                <h3>{day.day}</h3>
                                <div className="forecast-details">
                                    <span className="high">H: {day.high}</span>
                                    <span className="low">L: {day.low}</span>
                                </div>
                                <div className="condition">{day.condition}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="weather-tip"
                    onMouseEnter={() => setShowTip(true)}
                    onMouseLeave={() => setShowTip(false)}
                >
                    <div className={`tip-content ${showTip ? 'show' : ''}`}>
                        {weatherData.tips[timeOfDay]}
                    </div>
                    <button className="tip-trigger">Local Tip</button>
                </div>

                <button
                    onClick={handleCheckWeather}
                    className="weather-button"
                >
                    Check Live Weather
                </button>
            </div>
        </div>
    );
};

export default Weather;