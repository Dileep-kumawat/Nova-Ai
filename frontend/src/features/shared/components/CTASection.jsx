import { Link } from "react-router-dom";

const CTASection = ({ user }) => {
  return (
    <section className="cta-section">
      <div className="cta-bg"></div>
      <div className="container cta-inner">
        <div className="glass-panel cta-card">
          <h2 className="cta-h2">
            ASCEND TO THE<br />
            CELESTIAL ARCHITECT
          </h2>
          <p className="cta-p">
            Stop searching. Start knowing. Join the elite vanguard of intelligence with NovaAI today.
          </p>
          <div className="cta-buttons">
            {
              user ?
                <>
                  <Link to='/dashboard'><button className="btn-cta-primary">Dashboard</button></Link>
                </>
                :
                <>
                  <Link to='/register'><button className="btn-cta-primary">INITIALIZE NOW</button></Link>
                  <Link to='/login'><button className="btn-cta-secondary">SIGN IN</button></Link>
                </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
