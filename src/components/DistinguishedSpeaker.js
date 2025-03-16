import React from 'react';
import './DistinguishedSpeaker.css';

const DistinguishedSpeaker = () => {
    return (
        <div className="distinguished-speaker-container">
            
            <section>
                <h2 className="category">Plenary Speakers</h2>
                <ul className="speaker-list">
                    <li><strong>Prof. Hiroshi Nogami</strong> - Institute of Multidisciplinary Research for Advanced Materials, Tohoku University, Japan</li>
                    <li><strong>Prof. Nirupam Chakraborti</strong> - Faculty of Mechanical Engineering, Czech Technical University in Prague</li>
                </ul>
            </section>
            
            <section>
                <h2 className="category">Invited Speakers</h2>
                <ul className="speaker-list">
                    <li><strong>Prof. Shigeru Ueda</strong> - Institute of Multidisciplinary Research for Advanced Materials, Tohoku University, Japan</li>
                    <li><strong>Prof. Ronald O’Malley</strong> - Missouri University of Science and Technology, USA</li>
                    <li><strong>Dr. Y Gordon</strong> - Technical Director-Ironmaking, Hatch, Canada</li>
                    <li><strong>Prof. Dr. Joohyun Park</strong> - Hanyang University, Korea</li>
                    <li><strong>Prof. H. Matsuura</strong> - The University of Tokyo, Japan</li>
                    <li><strong>Prof. Alberto Conejo</strong> - University of Science and Technology Beijing (USTB), China</li>
                    <li><strong>Prof. Geoff Wang</strong> - University of Queensland, Australia</li>
                    <li><strong>Prof. Jung-Wook Cho</strong> - Pohang University of Science and Technology (POSTECH), South Korea</li>
                    <li><strong>Prof. Konstantin V. Grigorovich</strong> - Russian Academy of Sciences, Russia</li>
                    <li><strong>Prof. Miroslaw Karbowniczek</strong> - AGH University of Science and Technology, Poland</li>
                    <li><strong>Prof. Paulo Santos Assis</strong> - UFOP, Brazil</li>
                    <li><strong>Prof. Pasquale D Cavaliere</strong> - University of Salento, Italy</li>
                    <li><strong>Prof. Kazuki Morita</strong> - The University of Tokyo, Japan</li>
                    <li><strong>Prof. G.A Brook</strong> - Swinburne University of Technology, Australia</li>
                    <li><strong>Prof. Olena Volkova</strong> - Technical University Frieberg, Germany</li>
                    <li><strong>Prof. S.J. KIM</strong> - Chosun University, Korea</li>
                    <li><strong>Prof. M. Hayashi</strong> - Institute of Science, Tokyo, Japan</li>
                    <li><strong>Dr. Ricardo Carli</strong> - Prosimet, Italy</li>
                    <li><strong>Prof. Jorge Madias</strong> - Metallion, Argentina</li>
                    <li><strong>Prof. Ko-ichiro OHNO</strong> - Kyushu University, Japan</li>
                </ul>
            </section>
        </div>
    );
};

export default DistinguishedSpeaker;






// import React, { useEffect, useRef, useState } from 'react';
// import './DistinguishedSpeaker.css';

// const plenarySpeakers = [
//   { name: "Prof. Hiroshi Nogami", affiliation: "Tohoku University, Japan" },
//   { name: "Prof. Nirupam Chakraborti", affiliation: "Czech Technical University in Prague" },
// ];

// const invitedSpeakers = [
//   { name: "Prof. Shigeru Ueda", affiliation: "Tohoku University, Japan" },
//   { name: "Prof. Ronald O'Malley", affiliation: "Missouri University, USA" },
//   { name: "Dr. Y Gordon", affiliation: "Hatch, Canada" },
//   { name: "Prof. Joohyun Park", affiliation: "Hanyang University, Korea" },
//   { name: "Prof. H. Matsuura", affiliation: "University of Tokyo, Japan" },
//   { name: "Prof. Alberto Conejo", affiliation: "USTB, China" },
//   { name: "Prof. Geoff Wang", affiliation: "University of Queensland, Australia" },
//   { name: "Prof. Jung-Wook Cho", affiliation: "POSTECH, Korea" },
//   { name: "Prof. Konstantin V. Grigorovich", affiliation: "RAS, Russia" },
//   { name: "Prof. Miroslaw Karbowniczek", affiliation: "AGH University, Poland" },
//   { name: "Prof. Paulo Santos Assis", affiliation: "UFOP, Brazil" },
//   { name: "Prof. Pasquale D Cavaliere", affiliation: "University of Salento, Italy" },
//   { name: "Prof. Kazuki Morita", affiliation: "Tokyo, Japan" },
//   { name: "Prof. G.A Brook", affiliation: "Swinburne University, Australia" },
//   { name: "Prof. Olena Volkova", affiliation: "Technical University Frieberg, Germany" },
//   { name: "Prof. S.J. KIM", affiliation: "Chosun University, Korea" },
//   { name: "Prof. M. Hayashi", affiliation: "Institute of Science, Tokyo, Japan" },
//   { name: "Dr. Ricardo Carli", affiliation: "Prosimet, Italy" },
//   { name: "Prof. Jorge Madias", affiliation: "Metallion, Argentina" },
//   { name: "Prof. Ko-ichiro OHNO", affiliation: "KYUSHU University, Japan" },
// ];

// const DistinguishedSpeaker = () => {
//   const carouselRef = useRef(null);
//   const [autoScrollPaused, setAutoScrollPaused] = useState(false);

//   // Manual Arrow Controls
//   const scrollLeft = () => {
//     setAutoScrollPaused(true);
//     carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//   };

//   const scrollRight = () => {
//     setAutoScrollPaused(true);
//     carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//   };

//   // Auto-scroll every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!autoScrollPaused && carouselRef.current) {
//         carouselRef.current.scrollBy({ left: 1, behavior: 'smooth' });
//       }
//     }, 20); // smaller value = smoother motion

//     return () => clearInterval(interval);
//   }, [autoScrollPaused]);

//   // Restart auto-scroll after a pause
//   useEffect(() => {
//     if (autoScrollPaused) {
//       const resume = setTimeout(() => setAutoScrollPaused(false), 4000); // 4s pause after user interaction
//       return () => clearTimeout(resume);
//     }
//   }, [autoScrollPaused]);

//   const duplicatedSpeakers = [...invitedSpeakers, ...invitedSpeakers]; // seamless loop

//   return (
//     <div className="distinguished-speaker-container">
//       {/* <h2 className="title">Distinguished Speakers</h2> */}

//       <h3 className="section-heading">Plenary Speakers</h3>
//       <div className="carousel-wrapper no-scroll">
//         <div className="carousel-track no-animation">
//           {plenarySpeakers.map((speaker, index) => (
//             <div key={index} className="speaker-card">
//               <div className="speaker-avatar">
//                 <img src={`https://i.pravatar.cc/150?u=plenary-${index}`} alt={speaker.name} />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h3 className="section-heading">Invited Speakers</h3>
//       <div className="carousel-wrapper arrow-enabled">
//         <button className="carousel-button prev" onClick={scrollLeft}>&#10094;</button>

//         <div className="carousel-track scrollable" ref={carouselRef}>
//           {duplicatedSpeakers.map((speaker, index) => (
//             <div key={index} className="speaker-card">
//               <div className="speaker-avatar">
//                 <img src={`https://i.pravatar.cc/150?u=invited-${index}`} alt={speaker.name} />
//               </div>
//               <div className="speaker-info">
//                 <h3>{speaker.name}</h3>
//                 <p>{speaker.affiliation}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="carousel-button next" onClick={scrollRight}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default DistinguishedSpeaker;
