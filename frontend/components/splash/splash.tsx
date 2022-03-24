import React from "react";
import SplashHeader from "./splash_header";
import SplashMain from "./splash_main"

// this makes typescript happy when using images set on 
// the window property over in application.html.erb
declare global {
  interface Window {
    meetupLogo: string;
    onlineEvents: string;
    category1: string;
    category2: string;
    category3: string;
  }
}

const Splash: React.FC = () => {
  return (
    <div className="splash">   
      <div className="blob green-blob"></div>
      <div className="blob red-blob-top"></div>
      <div className="blob yellow-blob-top"></div>     
      <SplashHeader />
      <SplashMain />
      {/* <SplashFooter /> */}
    </div>
  )
}

export default Splash;