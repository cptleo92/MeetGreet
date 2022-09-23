import React from "react";
import { useDispatch } from "react-redux";
import SplashUpcomingEventsIndex from "./splash_upcoming_events_index";
import { openModal } from "../../actions/modal_actions";

const SplashUpcomingEvents = () => {
  const dispatch = useDispatch();

  return (
    <div className="splash-upcoming-events">
      <header className="suggestions-header">
        <h2>Upcoming events</h2>
        <a onClick={() => dispatch(openModal("signup"))}>Explore more events</a>
      </header>
      <SplashUpcomingEventsIndex />
    </div>
  )
}

export default SplashUpcomingEvents