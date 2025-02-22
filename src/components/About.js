import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-heading">ABOUT THE EVENT</h1>

            <div className="about-content">
                <div className="about-text">
                    <section className="history-section">
                        <h2>STIS Series</h2>
                        <p>
                            This Conference was initiated by India when there was dwindling manpower and lack of
                            technology development in the area of ironmaking and steelmaking. The first Conference entitled
                            Advances in the Theory of Ironmaking and Steelmaking (ATIS) was held in 2009 at the Indian
                            Institute of Science (IISc), Bangalore, focussing on the theoretical aspects of iron- and steel
                            making, as envisioned by Professor A. Ghosh, Professor Emeritus, Indian Institute of
                            Technology (IIT), Kanpur, India. The overwhelming success achieved by its organization,
                            resulted in the Conference becoming a quadrennial event and was rechristened as Science and
                            Technology of Ironmaking and Steelmaking (STIS) to include technology. The Second, Third,
                            and Fourth STIS Conferences were organised at Jamshedpur in 2013 (by National Metallurgical
                            Laboratory (NML)/Tata Steel), IIT Kanpur in 2017, and IIT Bombay in 2022, respectively.
                        </p>
                    </section>

                    <section className="current-section">
                        <h2>STIS-V 2025</h2>
                        <p>
                            The 21st century is witnessing significant development in technology and an ever-increasing
                            growth in the manufacturing and infrastructure sectors. With this swift pace of development,
                            there is an equivalent increase in the demand forecast for steel production all over the world. In
                            addition, there is a huge impetus towards the iron and steelmaking processes becoming more
                            sustainable by reducing harmful emissions and the carbon footprint. Consequently, researchers in
                            the process metallurgy domain are continuously engaged in developing existing technologies and
                            exploring alternatives. Keeping this view in mind, the Fifth Edition in the series of Science and
                            Technology for Ironmaking and Steelmaking (STIS-V - 2025) Conference is being organised to
                            showcase the advancements in the science and technology of ironmaking and steelmaking in
                            different parts of the world.
                        </p>
                    </section>

                    <div className="image-container">
                        <img
                            src="https://github.com/kmranimesh/Web-dev-toolkit/blob/main/IISc_Ansuman.png?raw=true"
                            alt="STIS Conference"
                            className="about-image"
                        />
                    </div>


                </div>
            </div>
        </div>
    );
};

export default About;