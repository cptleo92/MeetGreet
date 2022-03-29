import React from "react";
import SplashHeader from "./splash_header";
import SplashMain from "./splash_main"
import SplashFooter from "./splash_footer"

// this makes typescript happy when using images set on 
// the window property over in application.html.erb
declare global {
  interface Window {
    meetupLogo: string;
    onlineEvents: string;
    category1: string;
    category2: string;
    category3: string;
    joinGroup: string;
    findEvent: string;
    startGroup: string;
    smallLogo: string;
    ios: string;
    android: string;
    iosDownload: string;
    androidDownload: string;
    socialFacebook: string;
    socialInstagram: string;
    socialTwitter: string;
    socialYoutube: string;
    firstArticle: string;
    secondArticle: string;
    thirdArticle: string;
    currentUser: any;
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
      <SplashFooter />
    </div>
  )
}

export default Splash;