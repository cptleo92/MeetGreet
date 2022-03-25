import React from "react";
import SplashUpcomingEventsIndex from "./splash_upcoming_events_index";

const SplashUpcomingEvents = () => {
  return (
    <div className="splash-upcoming-events">
      <header className="suggestions-header">
        <h2>Upcoming events</h2>
        <a href="#">Explore more events</a>
      </header>
      <SplashUpcomingEventsIndex />
    </div>
  )
}

export default SplashUpcomingEvents