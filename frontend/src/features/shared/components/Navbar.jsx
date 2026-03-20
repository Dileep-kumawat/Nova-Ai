import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {
  return (
    <nav className="topnav">
      <div>
        <span className="nav-logo">NovaAI</span>
      </div>
      <div className="nav-links">
        <a className="nav-link active" href="#intelligence">Intelligence</a>
        <a className="nav-link" href="#architecture">Architecture</a>
        <a className="nav-link" href="#neuralNetwork">Neural Network</a>
        <a className="nav-link" href="#consensus">Consensus</a>
      </div>
      <div className="nav-actions">
        {
          user ?
            <Link to='/dashboard'><button className="btn-initialize-nav">Dashboard</button></Link>
            :
            <>
              <Link to='/login'><button className="btn-signin">Sign In</button></Link>
              <Link to='/register'><button className="btn-initialize-nav">Initialize</button></Link>
            </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
