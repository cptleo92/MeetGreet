import React, { useEffect } from "react";
import HomeSidebar from "./home_sidebar";
import HomeFeed from "./home-feed";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../../actions/events_actions";

const HomeMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <div className="home-main">
      <HomeSidebar />
      <HomeFeed />
    </div>
  )
}

export default HomeMain;