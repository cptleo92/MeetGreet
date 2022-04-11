import React from "react";

const SplashFooterSocials = () => {
  return (
    <div className="footer-socials">
      <div className="footer-socials-left">
        <p className="footer-links-title">Follow us</p>
        <div className="icons">
          <a><img
            src={window.socialFacebook}
            alt="facebook icon"
          /></a>
          <a><img
            src={window.socialTwitter}
            alt="twitter icon"
          /></a>
          <a><img
            src={window.socialYoutube}
            alt="youtube icon"
          /></a>
          <a><img
            src={window.socialInstagram}
            alt="instagram icon"
          /></a>
        </div>
      </div>
      <div className="footer-socials-right">
        <a href="https://apps.apple.com/us/app/meetup/id375990038" target="_blank">
          <img
            className="ios-button"
            src={window.iosDownload}
            alt="ios store download"
          />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.meetup&hl=en-US" target="_blank">
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