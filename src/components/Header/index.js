import { NavLink } from 'react-router-dom';
import './style.scss';

/**
 * Main website header
 */
const Header = () => {
  // Logo | Add listing | Login | Sign Up | My Account | Wallet connect
  return (
    <div className="header">
      <div className="row">
        <div className="logo">Whipmart</div>
        <button>SIGN IN</button>
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/results">Search</NavLink>
        <NavLink to="/details" className="details">
          Details
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
