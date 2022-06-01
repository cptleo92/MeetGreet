import React from "react";
import SplashFooterLinks from "./splash_footer_links";
import SplashFooterSocials from "./splash_footer_socials";
import { useLoggedIn } from "../../util/hooks";
import { useNavigate } from "react-router-dom";

const SplashFooter = () => {  
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  const handleClick = () => {
    loggedIn ? navigate("groups/new") : navigate("/login")
  }

  return (
    <footer className="splash-footer">     
      <div className="splash-footer-body">
        <div className="footer-head">
          <h4>Create your own MeetGreet group.</h4>
          <button className="footer-button" onClick={handleClick}>Get Started</button>
        </div>

        <SplashFooterLinks />
        <SplashFooterSocials />

        <ul className="footer-copy">
          <li>&copy; 2022 MeetGreet</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
          <li><a href="mailto:leo.cheng92@gmail.com?subject=Suggestions for MeetGreet!">Help</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default SplashFooter;