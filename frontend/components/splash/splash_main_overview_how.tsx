import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const SplashMainOverviewHow = () => {
  const dispatch = useDispatch();

  return (
    <div className="splash-how">
      <h3>How MeetGreet Works</h3>
      <h6>Meet new people who share your interests through online and in-person events. It’s free to create an account.</h6>
      <section className="splash-how-cards">
        <div className="how-card">
          <img 
            src={window.joinGroup}
            alt="join a group"
          />
          <a>Join a group</a>
          <p>Do what you love, meet others who love it, find your community. The rest is history!</p>
        </div>

        <div className="how-card">
          <img
            src={window.findEvent}
            alt="find an event"
          />
          <a>Find an event</a>
          <p>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</p>
        </div>

        <div className="how-card">
        <img
            src={window.startGroup}
            alt="start a group"
          />
          <a>Start a group</a>
          <p>You don’t have to be an expert to gather people together and explore shared interests.</p>
        </div>
      </section>
      <button onClick={() => dispatch(openModal("signup"))} className="splash-button">Join MeetGreet</button>
    </div>
  )
}

export default SplashMainOverviewHow