import React, { useEffect, useRef, useState } from 'react';
import './DistinguishedSpeaker.css';
import Navbar from './Navbar';
import Footer from './Footer';


const DistinguishedSpeaker = () => {
  const plenaryRef = useRef(null);
  const invitedRef = useRef(null);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  const plenarySpeakers = [
    {
      name: "Prof. Hiroshi Nogami",
      affiliation: "Tohoku University, Japan",
      url: "https://www.r-info.tohoku.ac.jp/en/3ace24fb652e45919a59410fd85caede.html",
      imagePath: "/assets/speakers/Hiroshi.jpg"
    },
    {
      name: "Prof. Nirupam Chakraborti",
      affiliation: "Czech Technical University in Prague",
      url: "https://scholar.google.co.kr/citations?user=RONBrJ0AAAAJ&hl=en",
      imagePath: "/assets/speakers/Nirupam.jpg"
    },
    {
      name: "Prof. Henrik Saxén",
      affiliation: "Abo Akademi University, Finland",
      url: "https://users.abo.fi/hsaxen/",
      imagePath: "/assets/speakers/Henrik.jpg"
    },
  ];
  
  const invitedSpeakers = [
    {
      name: "Prof. Shigeru Ueda",
      affiliation: "Tohoku University, Japan",
      url: null,
      imagePath: "/assets/speakers/shigeru ueda.jpg"
    },
    {
      name: "Prof. Ronald O'Malley",
      affiliation: "Missouri University of Science and Technology, USA",
      url: "https://scholar.google.com/citations?user=S_R3hM0AAAAJ&hl=en",
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Dr. Y Gordon",
      affiliation: "Hatch, Canada",
      url: null,
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Prof. Dr. Joohyun Park",
      affiliation: "Hanyang University, Korea",
      url: "https://scholar.google.co.kr/citations?user=fgty4vUAAAAJ&hl=en",
      imagePath: "/assets/speakers/Joohyun.jpg"
    },
    {
      name: "Prof. H. Matsuura",
      affiliation: "University of Tokyo, Japan",
      url: "https://www.material.t.u-tokyo.ac.jp/faculty/hiroyuki_matsuura_e.html",
      imagePath: "/assets/speakers/Matsuura.jpg"
    },
    {
      name: "Prof. Alberto Conejo",
      affiliation: "USTB, China",
      url: "https://www.researchgate.net/profile/Alberto-Conejo",
      imagePath: "/assets/speakers/Alberto.png"
    },
    {
      name: "Prof. Geoff Wang",
      affiliation: "University of Queensland, Australia",
      url: "https://about.uq.edu.au/experts/525",
      imagePath: "/assets/speakers/Geoff.png"
    },
    {
      name: "Prof. Jung-Wook Cho",
      affiliation: "POSTECH, Korea",
      url: "https://www.researchgate.net/profile/Jungwook-Cho",
      imagePath: "/assets/speakers/Jung-wook cho.jpg"
    },
    {
      name: "Prof. Konstantin V. Grigorovich",
      affiliation: "RAS, Russia",
      url: "https://www.researchgate.net/profile/Konstantin-Grigorovich",
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Prof. Miroslaw Karbowniczek",
      affiliation: "AGH University, Poland",
      url: "https://www.researchgate.net/profile/Miroslaw-Karbowniczek",
      imagePath: "/assets/speakers/Miroslaw.jpg"
    },
    {
      name: "Prof. Paulo Santos Assis",
      affiliation: "UFOP, Brazil",
      url: "https://www.researchgate.net/profile/Paulo-Assis-2",
      imagePath: "/assets/speakers/Paulo.png"
    },
    {
      name: "Prof. Pasquale D Cavaliere",
      affiliation: "University of Salento, Italy",
      url: "https://www.unisalento.it/scheda-utente/-/people/pasquale.cavaliere",
      imagePath: "/assets/speakers/pasquale.jpg"
    },
    {
      name: "Prof. Kazuki Morita",
      affiliation: "Tokyo, Japan",
      url: "https://www.material.t.u-tokyo.ac.jp/faculty/morita_e.html",
      imagePath: "/assets/speakers/Kazuki.png"
    },
    {
      name: "Prof. G.A Brook",
      affiliation: "Swinburne University, Australia",
      url: "https://geography.uga.edu/directory/people/george-brook",
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Prof. Olena Volkova",
      affiliation: "Technical University Frieberg, Germany",
      url: "https://www.researchgate.net/profile/Olena-Volkova-2",
      imagePath: "/assets/speakers/Olena.png"
    },
    {
      name: "Prof. S.J. KIM",
      affiliation: "Chosun University, Korea",
      url: "https://www.unlv.edu/people/sj-kim",
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Prof. M. Hayashi",
      affiliation: "Institute of Science, Tokyo, Japan",
      url: "https://www.s.u-tokyo.ac.jp/en/people/hayashi_masamitsu/",
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Dr. Ricardo Carli",
      affiliation: "Prosimet, Italy",
      url: "https://gift.postech.ac.kr/bbs/board.php?bo_table=eng5_4&wr_id=157",
      imagePath: "/assets/speakers/dummy.webp"
    },
    {
      name: "Prof. Jorge Madias",
      affiliation: "Metallion, Argentina",
      url: "https://www.researchgate.net/profile/Jorge-Madias",
      imagePath: "/assets/speakers/Jorge-Madias.png"
    },
    {
      name: "Prof. Ko-ichiro OHNO",
      affiliation: "KYUSHU University, Japan",
      url: "https://www.researchgate.net/profile/Ko-Ichiro-Ohno",
      imagePath: "/assets/speakers/ichiro.png"
    },
    {
      name: "Prof. Charlotte Anderson",
      affiliation: "Lulea University of Technology, Sweden",
      url: "https://www.physicaltherapy.utoronto.ca/charlotte-anderson",
      imagePath: "/assets/speakers/Charlotte.webp"
    },
  ];
  

  const handleScroll = (ref, amount) => {
    setAutoScrollPaused(true);
    ref.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (!autoScrollPaused) {
        plenaryRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
        invitedRef.current?.scrollBy({ left: 1, behavior: 'smooth' });
      }
    }, 20);
    return () => clearInterval(autoScroll);
  }, [autoScrollPaused]);

  useEffect(() => {
    if (autoScrollPaused) {
      const timeout = setTimeout(() => setAutoScrollPaused(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [autoScrollPaused]);

  const renderSpeakerCard = (speaker, index, isPlenary = false) => (
    <a
      key={`${isPlenary ? 'plenary' : 'invited'}-${index}`}
      href={speaker.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="speaker-card"
    >
      <div className="speaker-avatar">
        <img src={speaker.imagePath} alt={speaker.name} />
      </div>
      <div className="speaker-info">
        <h4>{speaker.name}</h4>
        <p>{speaker.affiliation}</p>
      </div>
    </a>
  );

  return (
  <>
    <Navbar />
    <div className="distinguished-speakers-container">
      {/* Plenary Section */}
      <section className="speakers-section">
        <h2 className="section-title">Plenary Speakers</h2>
        <div className="carousel static-scroll" ref={plenaryRef}>
          {plenarySpeakers.map((speaker, index) => renderSpeakerCard(speaker, index, true))}
        </div>
      </section>

      {/* Invited Section */}
      <section className="speakers-section">
        <h2 className="section-title">Invited Speakers</h2>
        <div className="carousel-wrapper">
          <button className="carousel-btn prev" onClick={() => handleScroll(invitedRef, -300)}>&#10094;</button>
          <div className="carousel scrollable" ref={invitedRef}>
            {invitedSpeakers.map((speaker, index) => renderSpeakerCard(speaker, index))}
          </div>
          <button className="carousel-btn next" onClick={() => handleScroll(invitedRef, 300)}>&#10095;</button>
        </div>
      </section>
    </div>
    <br />
    <br />
    <Footer />
  </>
  );
};

export default DistinguishedSpeaker;
