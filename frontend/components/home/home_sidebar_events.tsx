import React from "react";
import HomeSidebarEventsPreview from "./home_sidebar_events_preview";

const HomeSidebarEvents = () => {
  return (
    <div className="home-sidebar-events">
      <section className="sidebar-event-header">
        <h4>Your next event</h4>
        <a>See all your events</a>
      </section>
      <HomeSidebarEventsPreview />
    </div>
  )
}

export default HomeSidebarEvents