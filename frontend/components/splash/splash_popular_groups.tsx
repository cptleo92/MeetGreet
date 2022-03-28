import React from "react";
import SplashPopularGroupsIndex from "./splash_popular_groups_index";

const SplashPopularGroups = () => {
  return (
    <div className="splash-upcoming-events">
      <header className="suggestions-header">
        <h2>Popular Groups</h2>
        <a>Explore more groups</a>
      </header>
      <SplashPopularGroupsIndex />
    </div>
  )
}

export default SplashPopularGroups