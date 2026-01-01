import React from 'react';

// You might need to install 'react-router-dom' if you haven't: npm install react-router-dom
// If you don't use Router yet, just change the <Link> to a standard <a href="#events"> or button.
import { Link } from 'react-router-dom'; 

const Home = () => {
  return (
    <div className="home-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        .home-wrapper {
          background-color: #050505;
          min-height: 100vh;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        /* Animated Background Gradient */
        .home-wrapper::before {
          content: "";
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background: radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.2), transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.2), transparent 40%);
          animation: pulse 10s ease-in-out infinite alternate;
          z-index: 0;
        }

        /* Grain Overlay */
        .noise-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .content-container {
          z-index: 2;
          text-align: center;
          max-width: 800px;
          padding: 2rem;
        }

        /* Massive Kinetic Typography */
        .hero-title {
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 700;
          line-height: 0.85;
          letter-spacing: -0.05em;
          margin-bottom: 2rem;
          background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 3rem;
          font-weight: 300;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Glowing Button */
        .cta-button {
          padding: 1rem 3rem;
          font-size: 1.2rem;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
        }

        /* Scrolling Ticker at Bottom */
        .ticker-wrap {
          position: absolute;
          bottom: 0;
          width: 100%;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(5px);
          z-index: 2;
          padding: 1rem 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .ticker {
          display: flex;
          white-space: nowrap;
          animation: ticker 20s linear infinite;
        }

        .ticker-item {
          padding: 0 2rem;
          font-size: 1rem;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          letter-spacing: 2px;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="noise-overlay"></div>

      <div className="content-container">
        <h1 className="hero-title">
          BEYOND<br />REALITY
        </h1>
        <p className="hero-subtitle">
          Curated experiences for the digital age. Join the movement and discover events that defy expectations.
        </p>
        
        {/* If using React Router */}
        <Link to="/events" className="cta-button">
          Explore Events
        </Link>
        
        {/* OR if you just want a simple HTML button for now:
        <button onClick={() => window.location.href='/events'} className="cta-button">Explore Events</button> 
        */}
      </div>

      {/* Decorative Infinite Scroll Bar */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item">LIVE MUSIC • ART EXHIBITIONS • TECH CONFERENCES • IMMERSIVE EXPERIENCES •</div>
          <div className="ticker-item">LIVE MUSIC • ART EXHIBITIONS • TECH CONFERENCES • IMMERSIVE EXPERIENCES •</div>
          <div className="ticker-item">LIVE MUSIC • ART EXHIBITIONS • TECH CONFERENCES • IMMERSIVE EXPERIENCES •</div>
          <div className="ticker-item">LIVE MUSIC • ART EXHIBITIONS • TECH CONFERENCES • IMMERSIVE EXPERIENCES •</div>
        </div>
      </div>

    </div>
  );
};

export default Home;