import React from "react";
import HomeSidebarTopicsPreview from "./home_sidebar_topics_preview"

const HomeSidebarTopicss = () => {
  return (
    <div className="home-sidebar-events">
      <section className="sidebar-header">
        <h4>Your interests</h4>
        <a>See all your interests</a>
      </section>
      <HomeSidebarTopicsPreview />
    </div>
  )
}

export default HomeSidebarTopicss