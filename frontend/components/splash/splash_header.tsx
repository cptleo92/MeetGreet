import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const SplashHeader = () => {
  const dispatch = useDispatch();

  return (
    <nav className="splash-header-nav"> 
      <img       
        src={window.meetupLogo}
        alt="meetgreet logo"
        className="splash-header-logo"
      />     
      <ul className="splash-header-nav-right">
        <li className="splash-header-nav-right-login">
          <a onClick={() => dispatch(openModal('login'))}>Log in</a>
        </li>
        <li className="splash-header-nav-right-signup">
          <a onClick={() => dispatch(openModal('signup'))}>Sign up</a>
        </li>
      </ul>
  
    </nav>
  )
}

export default SplashHeader;