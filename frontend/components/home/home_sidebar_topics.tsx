import React from "react";
import { useDispatch } from "react-redux";

import HomeSidebarTopicsPreview from "./home_sidebar_topics_preview"
import { Link } from "react-router-dom";

const HomeSidebarTopicss = () => {

  const dispatch = useDispatch();

  return (
    <div className="home-sidebar-events">
      <section className="sidebar-header">
        <h4>Your interests</h4>
        <Link to="interests/edit">Edit interests</Link>
      </section>      
      <HomeSidebarTopicsPreview />     
    </div>
  )
}

export default HomeSidebarTopicss