import React from 'react';

const Language = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      padding: '50px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'whitesmoke',
    },
    heading: {
      marginTop: '80px',
      fontSize: '3rem',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'fadeInUp 1.5s ease-out, pulse 2s infinite',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    messageContainer: {
      padding: '30px',
      fontSize: '1.2rem',
      lineHeight: '1.8',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderLeft: '5px solid #e84949',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      animation: 'fadeInScale 1s ease-out',
    },
    text: {
      margin: 0,
      background: 'linear-gradient(45deg, #2c3e50, #3498db, #2c3e50)',
      backgroundSize: '200% 200%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      animation: 'gradientFlow 5s ease infinite',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }
  };

  return (
    <div className="language-container" style={styles.container}>
      <h1 className="proceedings-heading" style={styles.heading}>
        Official Language
      </h1>
      <div 
        className="message-container" 
        style={styles.messageContainer}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }}
      >
        <p style={styles.text}>
          Official language for STIS - V 2025 is English
        </p>
      </div>
    </div>
  );
};

export default Language;