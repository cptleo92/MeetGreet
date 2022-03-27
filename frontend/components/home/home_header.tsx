import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../actions/session_actions";

const HomeHeader = () => {
  const dispatch = useDispatch();

  return (
    <nav className="splash-header-nav home-header"> 
      <img       
        src={window.meetupLogo}
        alt="meetgreet logo"
        className="splash-header-logo"
      />     
      <ul className="splash-header-nav-right">
        <li className="splash-header-nav-right-login">
          <a onClick={() => dispatch(logout())}>Log out</a>
        </li>
        <li className="splash-header-nav-right-signup">
          <a href="#">Your Profile</a>
        </li>
      </ul>
  
    </nav>
  )
}

export default HomeHeader;