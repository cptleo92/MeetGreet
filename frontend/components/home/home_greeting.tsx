import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../../selectors/selectors";
import { RootState } from "../../store/store";

const HomeGreeting = () => {
  const currentUser = useSelector((state: RootState) => getCurrentUser(state))
  const { pathname } = useLocation();

  const renderHeader = () => {
    if (pathname.includes("mygroups")) {
      return (
        <h3>Your groups</h3>
      )
    } else if (pathname.includes("myevents")) {
      return (
        <h3>Your events</h3>
      )
    } else {
      return (
        <h3>Events from your groups</h3>
      )
    }
  }

  return (
    <div className="home-greeting">
      <h1>Welcome, {currentUser.fname} 👋</h1>
      {renderHeader()}
    </div>
  )
}

export default HomeGreeting;