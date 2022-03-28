import React from "react";
import HomeSidebarEvents from "./home_sidebar_events";
import HomeSidebarGroups from "./home_sidebar_groups";

const HomeSidebar = () => {
  return (
    <div className="home-sidebar">
      <HomeSidebarEvents />
      <HomeSidebarGroups />
      {/* <HomeSidebarTopics /> */}
    </div>
  )
}

export default HomeSidebar;