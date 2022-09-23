import React from "react";

const SplashMainOverviewBanner = () => {
  return (
    <div className="splash-banner">
      <div className="banner-left">
        <h1>Celebrating 20 years of real connections on MeetGreet</h1>
        <p>Whatever you're looking to do this year, MeetGreet can help. For 20 years, people have turned to 
          MeetGreet to meet people, make friends, find support, grow a business, and explore their interets.
          Thousands of events are happening every day--join the fun. 
        </p>
      </div>
      <div className="banner-right">
        <img
          src={window.onlineEvents}
          alt="online events"                
        />
      </div>
    </div>
  )
}

export default SplashMainOverviewBanner