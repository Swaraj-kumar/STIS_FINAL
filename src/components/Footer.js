import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { ref, onValue, get, update, runTransaction } from 'firebase/database';
import { database } from '../firebase/firebase-config';
import './Footer.css';

const Footer = () => {
    const [visitorCount, setVisitorCount] = useState(0);
    const [displayCount, setDisplayCount] = useState(0);
    const countingRef = useRef(null);
    const initialLoadRef = useRef(true);
    const hasIncrementedRef = useRef(false);  // Track if we've already incremented

    const animateCount = (start, end, duration = 2000) => {
        if (countingRef.current) {
            clearInterval(countingRef.current);
        }

        const startTime = Date.now();
        const difference = end - start;

        countingRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed >= duration) {
                setDisplayCount(end);
                clearInterval(countingRef.current);
                return;
            }

            const progress = elapsed / duration;
            const currentCount = Math.floor(start + difference * progress);
            setDisplayCount(currentCount);
        }, 16);
    };

    useEffect(() => {
        if (!database) {
            console.error('Database not initialized');
            return;
        }

        const visitorCountRef = ref(database, 'visitors/count');

        const updateVisitorCount = async () => {
            const sessionKey = 'visitRecorded';

            // Check both session storage and our ref to prevent double counting
            if (!sessionStorage.getItem(sessionKey) && !hasIncrementedRef.current) {
                try {
                    // Use transaction to ensure atomic increment
                    await runTransaction(visitorCountRef, (currentCount) => {
                        if (currentCount === null) return 37;  // Initial value if database is empty
                        return currentCount + 1;  // Increment by exactly 1
                    });

                    // Mark as incremented in both session storage and ref
                    sessionStorage.setItem(sessionKey, 'true');
                    hasIncrementedRef.current = true;

                    console.log('Visit recorded successfully');
                } catch (error) {
                    console.error('Error updating visitor count:', error);
                }
            }
        };

        // Listen for real-time updates
        const unsubscribe = onValue(visitorCountRef, (snapshot) => {
            const newCount = snapshot.val();
            if (newCount !== null) {
                if (initialLoadRef.current) {
                    setVisitorCount(newCount);
                    setDisplayCount(newCount);
                    initialLoadRef.current = false;
                    // Only try to increment after we have the initial value
                    updateVisitorCount();
                } else if (newCount !== visitorCount) {
                    setVisitorCount(newCount);
                    animateCount(displayCount, newCount);
                }
            }
        }, (error) => {
            console.error('Error reading visitor count:', error);
        });

        return () => {
            unsubscribe();
            if (countingRef.current) {
                clearInterval(countingRef.current);
            }
        };
    }, [visitorCount, displayCount]);

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <div className="footer-logo">
                        <img src='https://iisc.ac.in/wp-content/themes/iisc/images/favicon/apple-icon-57x57.png' alt="STIS 2025 Logo" />
                        <span>STIS-V - 2025</span>
                    </div>
                    <div className="footer-info">
                        <p><strong>Location:</strong> IISc Bengaluru, India</p>
                        <p><strong>Date:</strong> December 9 - 12, 2025</p>
                        <p><strong>Telephone:</strong> +91 80 22933240</p>
                        <p><strong>Email:</strong> stis.mte@iisc.ac.in</p>
                    </div>
                </div>
                <div className="footer-center">
                    <span>Jump To :</span>
                    <div className="footer-links">
                        <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
                        <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
                        <NavLink to="/distinguished-speaker" onClick={handleLinkClick}>Speakers</NavLink>
                        <NavLink to="/programme" onClick={handleLinkClick}>Programme</NavLink>
                        <NavLink to="/register" onClick={handleLinkClick}>Registration</NavLink>
                        <NavLink to="/conference-proceedings" onClick={handleLinkClick}>Conference Proceeding</NavLink>
                        <NavLink to="/conference-themes" onClick={handleLinkClick}>Conference Themes</NavLink>
                        <NavLink to="/committee" onClick={handleLinkClick}>Committee</NavLink>
                        <NavLink to="/venue" onClick={handleLinkClick}>Venue</NavLink>
                        <NavLink to="/sponsors" onClick={handleLinkClick}>Sponsors</NavLink>
                        <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
                        <NavLink to="/downloads" onClick={handleLinkClick}>Downloads</NavLink>
                    </div>
                </div>
                <div className="footer-right">
                    <span>Connect with Us : <br /></span>
                    <div className="footer-social">
                        <br />
                        <a href="https://x.com/stis_v2025" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://www.instagram.com/stisv25/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/stis-v-221269344/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a> */}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <hr className="footer-divider" />
                <p>&copy; STIS-V - 2025, All Rights Reserved</p>
                <p className='animesh'>Designed by:<a href='https://www.linkedin.com/in/animeshk13/' className='designer-link'> Animesh Kumar</a></p>
                <p>Visitors: <span id="visitor-count">{displayCount.toString().padStart(4, '0')}</span></p>
            </div>
        </footer>
    );
};

export default Footer;