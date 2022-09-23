import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { useUser } from "../../util/hooks";
import { Link } from "react-router-dom";

const SplashFooterLinks = () => {
  const currentUser = useUser();
  const dispatch = useDispatch();  

  const accountLinks = () => {
    if (currentUser) {
      return (
        <>
          <li><Link to="/myprofile">Your Profile</Link></li>
          <li><Link to="/home/myevents">Your Events</Link></li>
          <li><Link to="/home/mygroups">Your Groups</Link></li>
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
        <li>Groups</li>
        <li>Topics</li>
        <li>Cities</li>
        <li>Events</li>
        <li>Local Guides</li>
      </ul>

      <ul className="meetgreet">
        <li className="footer-links-title">MeetGreet</li>
        <li>About</li>
        <li>Blog</li>
        <li>MeetGreet Pro</li>
        <li>Careers</li>
      </ul>
    </div>
  )
}

export default SplashFooterLinks;