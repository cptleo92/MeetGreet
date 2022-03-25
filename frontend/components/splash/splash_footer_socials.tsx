import React from "react";

const SplashFooterSocials = () => {
  return (
    <div className="footer-socials">
      <div className="footer-socials-left">
        <p className="footer-links-title">Follow us</p>
        <div className="icons">
          <a href="#"><img
            src={window.socialFacebook}
            alt="facebook icon"
          /></a>
          <a href="#"><img
            src={window.socialTwitter}
            alt="twitter icon"
          /></a>
          <a href="#"><img
            src={window.socialYoutube}
            alt="youtube icon"
          /></a>
          <a href="#"><img
            src={window.socialInstagram}
            alt="instagram icon"
          /></a>
        </div>
      </div>
      <div className="footer-socials-right">
        <a href="#">
              <img 
                className="ios-button"
                src={window.iosDownload}
                alt="ios store download"
              />
            </a>
            <a href="#">
              <img 
                className="android-button"
                src={window.androidDownload}
                alt="android store download"
              />
            </a>
      </div>
    </div>
  )
}

export default SplashFooterSocials