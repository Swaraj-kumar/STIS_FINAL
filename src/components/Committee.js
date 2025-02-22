// src/components/Committee.js
import React from 'react';
import './Committee.css';

const Committee = () => {
    return (
        <div className="committee-container">
            <div className="heading-image-committee">
                <h1 className="committee-heading">Committee</h1>
            </div>

            <div className="committee-section">
                <h2 className="committee-subheading">International Advisory Committee</h2>
                <div className="committee-cards">
                    {['Bart Blanpain, KU Leuven, Belgium',
                        'Brian Monaghan, Univ. of Wollongong, Australia',
                        'Geoff Wang, The Univ. of Queensland, Australia',
                        'H Nogami, Tohoku University, Japan',
                        'Henrik Saxen, Abo Akademi Univ., Finland',
                        'Hong Yong Sohn, Univ. of Utah, USA',
                        'Jianliang Zhang, USTB, China',
                        'Jung-Wook Cho, POSTECH, South Korea',
                        'Keith Vining, CSIRO, Australia',
                        'Konstantin V Grigorovich, RAS, Russia',
                        'Lifeng Zhang, NCUT, China',
                        'Liu Jianhua, USTB, China',
                        'Mansoor Barati Sedeh, Univ. of Toronto, Canada',
                        'Miroslaw KARBOWNICZEK, AGH UST, Poland',
                        'N Chakraborti, Czech Technical Univ., Prague',
                        'Pasquale D Cavaliere, Univ. of Salento, Italy',
                        'Paulo Santos Assis, UFOP, Brazil',
                        'Pinakin Chaubal, ArcelorMittal, USA',
                        'Roderick I L Guthrie, McGill Univ., Canada',
                        'S Kitamura, Tohoku University, Japan',
                        'S Seetharaman, Sweden',
                        'Shigeru Ueda, Tohoku Univ., Japan',
                        'Volodymyr Shatokha, NAS, Ukraine'].map((name, index) => (
                            <div key={index} className="committee-card">
                                {name}
                            </div>
                        ))}
                </div>
            </div>

            <div className="committee-section">
                <h2 className="committee-subheading">National Advisory Committee</h2>
                <div className="committee-cards">
                    {['Brahma Deo, IIT Bhubaneswar',
                        'Dipak Mazumdar (Emer. Prof.), IIT Kanpur',
                        'G V Kiran, CMD, KIOCL, Bengaluru',
                        'K T Jacob (Emer. Prof.), IISc Bengaluru',
                        'Narasimha Mangadoddy, IIT Hyderabad',
                        'Naresh Sharma, ArcelorMittal, India',
                        'Nikhil Dhawan, IIT Roorkee',
                        'R H Tupkary (Former Prof.), VNIT Nagpur',
                        'Shatrughan Soren, IIT-ISM Dhanbad'].map((name, index) => (
                            <div key={index} className="committee-card">
                                {name}
                            </div>
                        ))}
                </div>
            </div>

            <div className="committee-section">
                <h2 className="committee-subheading">National Executive Committee (NEC)</h2>
                <div className="committee-cards">
                    {['Ahindra Ghosh, NEC – Advisor, Former Prof., IIT Kanpur ',
                        'Govind S Gupta, NEC - Chair, IISc Bengaluru',
                        'G G Roy, NEC - Co-ordinator, IIT-Kharagpur ',
                        'Alok Chandra, Five Point Zero Consultants, Mumbai',
                        'Atul Bhatt, CMD, RINL, Visakhapatnam',
                        'A K Singh, IIT – Kanpur',
                        'Bharat Bhushan, VP & CIO, TSDPL, Kolkata',
                        'Damodar Mittal, ED – Projects, JSPL, Angul',
                        'N N Viswanathan, IIT – Bombay',
                        'P K Murugan, President, JSW Steel Ltd,',
                        'R K Goel, MD, SLR Metalik Ltd., Bellary',
                        'Sabita Sarkar, IIT - Madras',
                        'Sachin Bhambure, VP, Mahindra Sanyo, Mumbai',
                        'Siddhartha Misra, Chief - Process Research, Tata Steel R&D, Jamshedpur'].map((name, index) => (
                            <div key={index} className="committee-card">
                                {name}
                            </div>
                        ))}
                </div>
            </div>

            <div className="committee-section">
                <h2 className="committee-subheading">Organizing Committee</h2>
                {/* <div className="committee-cards">
                    {['Name 10', 'Name 11', 'Name 12'].map((name, index) => (
                        <div key={index} className="committee-card">
                            {name}
                        </div>
                    ))}
                </div> */}
            </div>

            <div className="committee-section">
                <h2 className="committee-subheading">Chair</h2>
                <div className="committee-cards">
                    {['S. Subramanian (Emer. Prof.), IISc Bengaluru'].map((name, index) => (
                        <div key={index} className="committee-card">
                            {name}
                        </div>
                    ))}
                </div>
            </div>


            <div className="committee-section">
                <h2 className="committee-subheading">Convenor</h2>
                <div className="committee-cards">
                    {['Govind S Gupta, IISc Bengaluru'].map((name, index) => (
                        <div key={index} className="committee-card">
                            {name}
                        </div>
                    ))}
                </div>
            </div>


            <div className="committee-section">
                <h2 className="committee-subheading">Co-Convenor</h2>
                <div className="committee-cards">
                    {['Lakshminarayana Rao, IISc Bengaluru'].map((name, index) => (
                        <div key={index} className="committee-card">
                            {name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="committee-section">
                <h2 className="committee-subheading">Members</h2>
                <div className="committee-cards">
                    {['Ashok M Raichur, IISc Bengaluru',
                        'Babu Sathian, M.D., Process Pumps Pvt. ltd.',
                        'Pikee Priya, IISc Bengaluru',
                        'Praveen Ramamurthy, IISc Bengaluru',
                        'Prosenjit Das, IISc Bengaluru',
                        'R Ravi, IISc Bengaluru',
                        'Subodh Kumar, IISc Bengaluru',
                        'Satyam Suwas, IISc Bengaluru',
                        'T R R Rao, Director, Dhruvdesh Metasteel, Bengaluru'
                    ].map((name, index) => (
                        <div key={index} className="committee-card">
                            {name}
                        </div>
                    ))}
                </div>
            </div>

        </div >
    );
};

export default Committee;
