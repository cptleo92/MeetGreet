import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../selectors/selectors";
import { RootState } from "../../store/store";

const HomeGreeting = () => {
  const currentUser = useSelector((state: RootState) => getCurrentUser(state))

  return (
    <div className="home-greeting">
      <h1>Welcome, {currentUser.fname} 👋</h1>
      <h3>Events from your groups</h3>
    </div>
  )
}

export default HomeGreeting;