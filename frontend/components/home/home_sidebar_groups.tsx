import React from "react";
import HomeSidebarGroupsPreview from "./home_sidebar_groups_preview";

const HomeSidebarEvents = () => {
  return (
    <div className="home-sidebar-events">
      <section className="sidebar-header">
        <h4>Your groups</h4>
        <a>See all your groups</a>
      </section>
      <HomeSidebarGroupsPreview />
    </div>
  )
}

export default HomeSidebarEvents