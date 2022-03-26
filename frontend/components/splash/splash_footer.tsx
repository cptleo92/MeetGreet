import React from "react";
import { useDispatch } from "react-redux";
import SplashFooterLinks from "./splash_footer_links";
import SplashFooterSocials from "./splash_footer_socials";
import { openModal } from "../../actions/modal_actions";

const SplashFooter = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal("signup"))
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