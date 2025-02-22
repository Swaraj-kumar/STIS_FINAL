import './Accomodation.css';
import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Clock,
    Info,
    Coffee,
    Wifi,
    Car,
    Building2,
    Utensils,
    Dumbbell,
    Heart,
    CalendarCheck,
    AlertCircle,
    BadgeCheck,
    Bath,
    Home,
    Contact,
    ShieldCheck,
    Star,
    Plus,
    ExternalLink
} from 'lucide-react';

const Accommodation = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const hotels = [
        {
            id: 1,
            name: "Hotel Windsor Manor",
            category: "5★ Deluxe",
            website: "https://www.itchotels.com/in/en/itcwindsor-bengaluru",
            distance: "3 km from Venue",
            description: "Experience luxury at its finest with our signature hospitality and world-class amenities.",
            rates: {
                single: { inr: 12500, usd: 150, tax: 18 },
                double: { inr: 15000, usd: 180, tax: 18 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "Premium Service", icon: ShieldCheck },
                { name: "Fine Dining", icon: Utensils },
                { name: "Fitness Center", icon: Dumbbell },
                { name: "Airport Transfer", icon: Car }
            ]
        },
        {
            id: 2,
            name: "Hotel Le Meridien",
            category: "5★ Premium",
            website: "https://le-meridien.hotels-in-bangalore.com/en/",
            distance: "3 km from Venue",
            description: "Contemporary luxury hotel offering exceptional service and modern amenities.",
            rates: {
                single: { inr: 11000, usd: 132, tax: 18 },
                double: { inr: 13500, usd: 162, tax: 18 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "High-Speed WiFi", icon: Wifi },
                { name: "Business Center", icon: Building2 },
                { name: "Gym Access", icon: Dumbbell },
                { name: "Room Service", icon: Utensils }
            ]
        },
        {
            id: 3,
            name: "Hotel Lalit Ashok",
            category: "5★",
            website: "https://www.thelalit.com/",
            distance: "3 km from Venue",
            description: "Elegant accommodation with a perfect blend of luxury and comfort.",
            rates: {
                single: { inr: 10000, usd: 120, tax: 18 },
                double: { inr: 12000, usd: 145, tax: 18 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "Luxury Rooms", icon: Heart },
                { name: "Multiple Restaurants", icon: Utensils },
                { name: "Conference Facilities", icon: Building2 },
                { name: "Premium WiFi", icon: Wifi }
            ]
        },
        {
            id: 4,
            name: "Hotel Solitaire",
            category: "4★", 
            website: "https://the-solitaire.hotels-in-bangalore.com/en/",
            distance: "4 km from Venue",
            description: "Quality accommodation with excellent business facilities and comfortable stays.",
            rates: {
                single: { inr: 7500, usd: 90, tax: 18 },
                double: { inr: 9000, usd: 108, tax: 18 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "WiFi Access", icon: Wifi },
                { name: "Business Services", icon: Building2 },
                { name: "Restaurant", icon: Utensils },
                { name: "Shuttle Service", icon: Car }
            ]
        },
        {
            id: 5,
            name: "Hotel Monarch Luxor",
            category: "4★",
            website: "https://www.monarchhotels.in/",
            distance: "4 km from Venue",
            description: "Modern hotel offering comfortable accommodation with essential amenities.",
            rates: {
                single: { inr: 6500, usd: 78, tax: 18 },
                double: { inr: 8000, usd: 96, tax: 18 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "WiFi", icon: Wifi },
                { name: "Business Center", icon: Building2 },
                { name: "Dining", icon: Utensils },
                { name: "Parking", icon: Car }
            ]
        },
        {
            id: 6,
            name: "The Green Path",
            category: "Service Apartment",
            website: "https://thegreenpath.in/",
            distance: "2-3 km from Venue",
            description: "Luxurious service apartments offering home-like comfort with hotel amenities.",
            rates: {
                luxurySingle: { inr: 5000, usd: 60, tax: 12 },
                luxuryDouble: { inr: 6000, usd: 72, tax: 12 },
                penthouseSingle: { inr: 7000, usd: 84, tax: 12 },
                penthouseDouble: { inr: 8000, usd: 96, tax: 12 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "Full Kitchen", icon: Utensils },
                { name: "WiFi", icon: Wifi },
                { name: "Workspace", icon: Building2 },
                { name: "Premium Facilities", icon: Home }
            ]
        },
        {
            id: 7,
            name: "Krishinton Suites",
            category: "Boutique",
            website: "https://krishinton-suites.hotels-in-bangalore.com/en/",
            distance: "1.5-2 km from Venue",
            description: "Convenient and comfortable suites closest to the conference venue.",
            rates: {
                single: { inr: 5500, usd: 66, tax: 12 },
                double: { inr: 6500, usd: 78, tax: 12 }
            },
            amenities: [
                { name: "Breakfast Included", icon: Coffee },
                { name: "WiFi Access", icon: Wifi },
                { name: "Kitchenette", icon: Utensils },
                { name: "Work Desk", icon: Building2 },
                { name: "Local Transport", icon: Car }
            ]
        }
    ];


    const handleBooking = (hotelWebsite) => {
        window.open(hotelWebsite, '_blank');
    };

    const cancellationPolicies = [
        {
            period: "Within 7 days",
            charge: "100% of one night charges",
            icon: AlertCircle
        },
        {
            period: "7-30 days before",
            charge: "50% of one night charges",
            icon: Info
        },
        {
            period: "Beyond 30 days",
            charge: "No charges",
            icon: CalendarCheck
        }
    ];

    return (
        <div className="accommodation-container">
            <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
                <h1>Conference Accommodation</h1>

                <div className="key-info-grid">
                    <div className="key-info-card">
                        <Clock className="info-icon" />
                        <h3>Check-in/out</h3>
                        <p>12 Noon</p>
                    </div>
                    <div className="key-info-card">
                        <BadgeCheck className="info-icon" />
                        <h3>Includes</h3>
                        <p>Breakfast & WiFi</p>
                    </div>
                    <div className="key-info-card">
                        <Info className="info-icon" />
                        <h3>Booking</h3>
                        <p>First come, first served</p>
                    </div>
                </div>
            </section>

            <section className="hotels-grid">
                {hotels.map((hotel, index) => (
                    <div
                        key={hotel.id}
                        className={`hotel-card ${isVisible ? 'slide-in' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="hotel-card-header">
                            <div className="category-badge">{hotel.category}</div>
                            <div className="distance-badge">
                                <MapPin size={14} />
                                {hotel.distance}
                            </div>
                        </div>

                        <div className="hotel-card-content">
                            <h2>{hotel.name}</h2>
                            <p className="description">{hotel.description}</p>

                            <div className="amenities-list">
                                {hotel.amenities.map((amenity, i) => (
                                    <div key={i} className="amenity-item">
                                        <amenity.icon size={16} />
                                        <span>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="rates-grid">
                                {hotel.id !== 6 ? (
                                    <>
                                        <div className="rate-card">
                                            <span>Single</span>
                                            <strong>₹{hotel.rates.single.inr.toLocaleString()}</strong>
                                            <small>${hotel.rates.single.usd} + {hotel.rates.single.tax}% tax</small>
                                        </div>
                                        <div className="rate-card">
                                            <span>Double</span>
                                            <strong>₹{hotel.rates.double.inr.toLocaleString()}</strong>
                                            <small>${hotel.rates.double.usd} + {hotel.rates.double.tax}% tax</small>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rate-card">
                                            <span>Luxury Single</span>
                                            <strong>₹{hotel.rates.luxurySingle.inr.toLocaleString()}</strong>
                                            <small>${hotel.rates.luxurySingle.usd} + {hotel.rates.luxurySingle.tax}% tax</small>
                                        </div>
                                        <div className="rate-card">
                                            <span>Penthouse</span>
                                            <strong>₹{hotel.rates.penthouseSingle.inr.toLocaleString()}</strong>
                                            <small>${hotel.rates.penthouseSingle.usd} + {hotel.rates.penthouseSingle.tax}% tax</small>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button
                                className="book-button"
                                onClick={() => handleBooking(hotel.website)}
                            >
                                Book Now <ExternalLink size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <section className="cancellation-policy">
                <h2>Cancellation Policy</h2>
                <div className="policy-grid">
                    {cancellationPolicies.map((policy, index) => (
                        <div key={index} className="policy-card">
                            <policy.icon className="policy-icon" />
                            <h3>{policy.period}</h3>
                            <p>{policy.charge}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Accommodation;