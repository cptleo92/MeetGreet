import React from "react";
import { Link } from "react-router-dom";
import HomeSidebarEventsPreview from "./home_sidebar_events_preview";

const HomeSidebarEvents = () => {
  return (
    <div className="home-sidebar-events">
      <section className="sidebar-header">
        <h4>Your next event</h4>
        <Link to="myevents">See all your events</Link>
      </section>
      <HomeSidebarEventsPreview />
    </div>
  )
}

export default HomeSidebarEvents