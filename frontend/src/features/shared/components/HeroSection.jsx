import { Link } from "react-router-dom";

const HeroSection = ({ user }) => {
  return (
    <section id="intelligence">
      <div className="hero-blob-primary"></div>
      <div className="hero-blob-secondary"></div>

      <div className="container hero-content">
        <span className="hero-label">Evolutionary Neural Systems</span>

        <h1 className="hero-h1">
          SUPERHUMAN<br />
          <span className="gradient-text">INTELLIGENCE</span>
        </h1>

        <p className="hero-p">
          Access the world's most advanced neural architect. NovaAI synthesizes complex data into cinematic
          insights, operating at the speed of thought.
        </p>

        {/* Search Bar */}
        <div className="search-group">
          <div className="search-glow"></div>
          <div className="search-inner">
            <span className="material-symbols-outlined search-icon">search</span>
            <input className="search-input" placeholder="Query the neural network..." type="text" />
            <Link to={user ? '/dashboard' : '/login'}>
              <button className="btn-execute">
                <span>Execute</span>
                <span className="material-symbols-outlined">bolt</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cinematic Background */}
      <div className="hero-bg">
        <img
          alt="Cinematic abstract neural network visualization"
          src="heroSectionImage.png"
        />
        <div className="hero-bg-overlay"></div>
      </div>
    </section>
  );
};

export default HeroSection;
