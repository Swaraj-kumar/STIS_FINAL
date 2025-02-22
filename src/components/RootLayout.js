import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function RootLayout() {
    return (
        <div className='root-layout'>
            <header>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                {/* Render Footer only if it's loaded */}
                {Footer && <Footer />}
            </footer>
        </div>
    );
}
// Add this to your RootLayout.js temporarily
console.log('Footer component:', Footer);

export default RootLayout;


