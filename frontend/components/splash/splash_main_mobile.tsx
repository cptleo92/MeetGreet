import React from "react";

const SplashMainMobile = () => {
  return (
    <div className="splash-mobile">
        <img 
          className="ios"
          src={window.ios}
          alt="ios screen"
        />
        <img 
          className="android"
          src={window.android}
          alt="android screen"
        />
        <img 
          className="small-logo"
          src={window.smallLogo}
          alt="small logo"
        />

        <p className="mobile-text">Stay connected.</p>
        <p className="mobile-text">Download the app.</p>

        <div className="download-buttons">
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

export default SplashMainMobile