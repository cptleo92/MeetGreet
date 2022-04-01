import React from "react";
import HomeGroupsList from "./home_groups_list";
import { Link } from "react-router-dom";

const HomeSidebarEvents = () => {
  return (
    <div className="home-sidebar-events">
      <section className="sidebar-header">
        <h4>Your groups</h4>
        <Link to="mygroups">See all your groups</Link>
      </section>
      <HomeGroupsList preview={true} organizerOnly={false}/>
    </div>
  )
}

export default HomeSidebarEvents