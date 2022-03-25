import React from "react";
import SplashMainOverview from "./splash_main_overview";
import SplashMainSuggestions from "./splash_main_suggestions";
import SplashMainMobile from "./splash_main_mobile";
import SplashMainStories from "./splash_main_stories";

const SplashMain = () => {
  return (
    <main className="splash-main">     
      <SplashMainOverview />
      <SplashMainSuggestions />
      <SplashMainMobile />
      <SplashMainStories />      
    </main>
  )

}

export default SplashMain;