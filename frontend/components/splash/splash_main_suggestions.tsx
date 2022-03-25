import React from "react";
import SplashUpcomingEvents from "./splash_upcoming_events";
import SplashPopularGroups from "./splash_popular_groups";

const SplashMainSuggestions = () => {
  return (
    <div className="splash-suggestions">
      <SplashUpcomingEvents />
      <SplashPopularGroups />
    </div>
  )
}

export default SplashMainSuggestions