import React from "react";
import SplashHeader from "./splash_header";
import SplashMain from "./splash_main"

// this makes typescript happy when using images set on 
// the window property over in application.html.erb
declare global {
  interface Window {
    meetupLogo: string;
    onlineEvents: string;
    greenBlob: string;
    redBlob: string;
    yellowBlob: string;
  }
}

const Splash: React.FC = () => {
  return (
    <div>
      <div className="blobs">
        {/* <img 
          src={window.greenBlob}
          alt="green blob"
          className="green-blob"
        />
        <img 
          src={window.redBlob}
          alt="red blob"
          className="red-blob-top"
        />
        <img 
          src={window.yellowBlob}
          alt="yellow blob"
          className="yellow-blob-top"
        /> */}
        <div className="green-blob"></div>
        <div className="red-blob-top"></div>
        <div className="yellow-blob-top"></div>
      </div>
      <SplashHeader />
      <SplashMain />
      {/* <SplashFooter /> */}
    </div>
  )
}

export default Splash;