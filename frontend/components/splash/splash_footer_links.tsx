import React from "react";

const SplashFooterLinks = () => {
  return (
    <div className="footer-links">
      <ul className="account">
        <li className="footer-links-title">Your Account</li>
        <li><a>Sign up</a></li>
        <li><a>Log in</a></li>
        <li><a>Help</a></li>
      </ul>

      <ul className="discover">
        <li className="footer-links-title">Discover</li>
        <li> <a>Groups</a></li>
        <li> <a>Calender</a></li>
        <li> <a>Topics</a></li>
        <li> <a>Cities</a></li>
        <li> <a>Online Events</a></li>
        <li> <a>Local Guides</a></li>
      </ul>

      <ul className="meetgreet">
        <li className="footer-links-title">MeetGreet</li>
        <li><a>About</a></li>
        <li><a>Blog</a></li>
        <li><a>MeetGreet Pro</a></li>
        <li><a>Careers</a></li>
        <li><a>Apps</a></li>
      </ul>
    </div>
  )
}

export default SplashFooterLinks;