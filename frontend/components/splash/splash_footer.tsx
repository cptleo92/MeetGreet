import React from "react";
import SplashFooterLinks from "./splash_footer_links";
import SplashFooterSocials from "./splash_footer_socials";

const SplashFooter = () => {
  return (
    <footer className="splash-footer">
      <div className="splash-footer-body">
        <div className="footer-head">
          <h4>Create your own MeetGreet group.</h4>
          <button className="footer-button">Get Started</button>
        </div>

        <SplashFooterLinks />
        <SplashFooterSocials />

        <ul className="footer-copy">
          <li>2022 MeetGreet</li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Cookie Policy</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default SplashFooter;