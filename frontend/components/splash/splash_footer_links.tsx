import React from "react";

const SplashFooterLinks = () => {
  return (
    <div className="footer-links">
      <ul className="account">
        <li className="footer-links-title">Your Account</li>
        <li><a href="#">Sign up</a></li>
        <li><a href="#">Log in</a></li>
        <li><a href="#">Help</a></li>
      </ul>

      <ul className="discover">
        <li className="footer-links-title">Discover</li>
        <li> <a href="#">Groups</a></li>
        <li> <a href="#">Calender</a></li>
        <li> <a href="#">Topics</a></li>
        <li> <a href="#">Cities</a></li>
        <li> <a href="#">Online Events</a></li>
        <li> <a href="#">Local Guides</a></li>
      </ul>

      <ul className="meetgreet">
        <li className="footer-links-title">MeetGreet</li>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">MeetGreet Pro</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Apps</a></li>
      </ul>
    </div>
  )
}

export default SplashFooterLinks;