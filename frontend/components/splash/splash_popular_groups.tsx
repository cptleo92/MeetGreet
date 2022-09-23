import React from "react";
import { useDispatch } from "react-redux";
import SplashPopularGroupsIndex from "./splash_popular_groups_index";
import { openModal } from "../../actions/modal_actions";

const SplashPopularGroups = () => {
  const dispatch = useDispatch();

  return (
    <div className="splash-upcoming-events">
      <header className="suggestions-header">
        <h2>Popular Groups</h2>
        <a onClick={() => dispatch(openModal("signup"))}>Explore more groups</a>
      </header>
      <SplashPopularGroupsIndex />
    </div>
  )
}

export default SplashPopularGroups