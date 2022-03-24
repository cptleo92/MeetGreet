import React from "react";
import { Link } from "react-router-dom";

const SplashHeader = () => {
  return (
    <nav className="splash-header-nav"> 
      <img       
        src={window.meetupLogo}
        alt="meetgreet logo"
        className="splash-header-logo"
      />     
      <ul className="splash-header-nav-right">
        <li className="splash-header-nav-right-login">
          <Link to="/login">Log in</Link>
        </li>
        <li className="splash-header-nav-right-signup">
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
  
    </nav>
  )
}

export default SplashHeader;