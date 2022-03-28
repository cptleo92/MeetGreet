import React, { useEffect } from "react";
import SplashFooter from '../splash/splash_footer';
import HomeHeader from "./home_header";
import HomeGreeting from "./home_greeting";
import HomeMain from "./home_main";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../../actions/events_actions";
import { useLoading } from "../../util/hooks";

const Home = () => {


  return (
    <div className="home">
      <HomeHeader />
      <div className="home-body">
        <HomeGreeting />
        <HomeMain />
      </div>
      <SplashFooter />
    </div>
  )
}

export default Home;