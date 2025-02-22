import React from 'react';
import { AlertCircle } from 'lucide-react';
import './Tours.css';

const Tours = () => {
    const postConferenceTours = [
        {
            tourNo: 1,
            name: 'Jindal (JSW Steel Ltd.) only',
            status: 'YET TO BE CONFIRMED',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['Minimum 8 and Maximum 14 people', 'A/C 2-Tier Sleeper Class Train', '8-hour one-way journey']
        },
        {
            tourNo: 2,
            name: 'Jindal (JSW Steel Ltd.) + Hampi',
            status: 'YET TO BE CONFIRMED',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['Minimum 8 and Maximum 14 people', 'A/C 2-Tier Sleeper Class Train', '8-hour one-way journey']
        },
        {
            tourNo: 3,
            name: 'Day return trip to Mysore',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['A/C Bus', 'Minimum 10 people required']
        },
        {
            tourNo: 4,
            name: 'Day return trip to Hassan',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['A/C Bus', 'Minimum 10 people required']
        }
    ];

    const otherTours = [
        {
            tourNo: 5,
            name: 'Bangalore city seeing',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['A/C Bus', 'Minimum 10 people required']
        },
        {
            tourNo: 6,
            name: 'Day return trip to Taj Kuteeram & Nirtyagram',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['A/C Bus', 'Minimum 10 people required']
        },
        {
            tourNo: 7,
            name: 'Day return trip to Bannerghatta National Park',
            departure: { date: 'To be', time: 'updated' },
            return: { date: 'To be', time: 'updated' },
            notes: ['A/C Bus', 'Minimum 10 people required']
        }
    ];

    const StatusBadge = ({ status }) => (
        <div className="status-badge">
            <AlertCircle className="animate-pulse text-amber-500" size={20} />
            <span className="badge-text">{status}</span>
        </div>
    );

    return (
        <div className="tour-container">
            <h1 className="tour-header">Tentative Tour Schedule</h1>
            
            <div className="tour-section">
                <h2>Post Conference Tours</h2>
                <div className="tours-grid post-conference">
                    {postConferenceTours.map((tour, index) => (
                        <div 
                            key={tour.tourNo} 
                            className={`tour-card ${tour.status ? 'pending-confirmation' : ''}`}
                        >
                            <div className="tour-number">Tour {tour.tourNo}</div>
                            <h3>{tour.name}</h3>
                            {tour.status && (
                                <StatusBadge status={tour.status} />
                            )}
                            <div className="tour-timing">
                                <p>
                                    <span>Departure:</span> {tour.departure.date} {tour.departure.time}
                                </p>
                                <p>
                                    <span>Return:</span> {tour.return.date} {tour.return.time}
                                </p>
                            </div>
                            <ul className="tour-notes">
                                {tour.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tour-section">
                <h2>Other Tours</h2>
                <div className="tours-grid">
                    {otherTours.map(tour => (
                        <div key={tour.tourNo} className="tour-card">
                            <div className="tour-number">Tour {tour.tourNo}</div>
                            <h3>{tour.name}</h3>
                            <div className="tour-timing">
                                <p>
                                    <span>Departure:</span> {tour.departure.date} at {tour.departure.time}
                                </p>
                                <p>
                                    <span>Return:</span> {tour.return.date} at {tour.return.time}
                                </p>
                            </div>
                            <ul className="tour-notes">
                                {tour.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tour-notes-section">
                <h3>Important Notes:</h3>
                <ul>
                    <li>All pickup points will be at the conference venue</li>
                    <li>Entrance fees and meals are not included</li>
                    <li>Tours may be cancelled due to insufficient participants</li>
                    <li>Full refund available if tour is cancelled by organizers</li>
                    <li>Prices will be updated soon</li>
                </ul>
            </div>
        </div>
    );
};

export default Tours;