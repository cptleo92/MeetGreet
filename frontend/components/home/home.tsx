import React, { useEffect } from "react";
import SplashFooter from '../splash/splash_footer';
import HomeHeader from "./home_header";
import HomeGreeting from "./home_greeting";
import HomeMain from "./home_main";

const Home = () => {


  return (
    <div className="home">
      <div className="body">
        <HomeGreeting />
        <HomeMain />
      </div>
    </div>
  )
}

export default Home;