import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { useUser } from "../../util/hooks";

const SplashFooterLinks = () => {
  const currentUser = useUser();
  const dispatch = useDispatch();  

  const accountLinks = () => {
    if (currentUser) {
      return (
        <>
          <li><a>Your Profile</a></li>
          <li><a>Your Events</a></li>
          <li><a>Your Groups</a></li>
        </>
      )
    } else {
      return (
        <>
          <li><a onClick={() => dispatch(openModal('signup'))}>Sign up</a></li>
          <li><a onClick={() => dispatch(openModal('login'))}>Log in</a></li>
        </>
      )
    }
  }


  return (
    <div className="footer-links">
      <ul className="account">
        <li className="footer-links-title">Your Account</li>         
        {accountLinks()}
        <li><a href="mailto:leo.cheng92@gmail.com?subject=Suggestions for MeetGreet!">Help</a></li>
      </ul>

      <ul className="discover">
        <li className="footer-links-title">Discover</li>
        <li><a>Groups</a></li>
        <li><a>Topics</a></li>
        <li><a>Cities</a></li>
        <li><a>Events</a></li>
      </ul>

      <ul className="meetgreet">
        <li className="footer-links-title">MeetGreet</li>
        <li><a>About</a></li>
        <li><a>Blog</a></li>
        <li><a>MeetGreet Pro</a></li>
        <li><a>Careers</a></li>
      </ul>
    </div>
  )
}

export default SplashFooterLinks;