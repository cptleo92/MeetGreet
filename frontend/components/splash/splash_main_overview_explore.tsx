import React from "react";

const SplashMainOverviewExplore = () => {
  return (
    <div className="splash-explore">
      <section className="explore-search">
        <h2>What do you want to do?</h2>
        <div className="explore-inputs">
          <input           
            type="text"
            placeholder='Search for "Tennis"'
          />
          <input                     
            type="text"
            placeholder='City or zip code'
          />
        </div>
        <button className="explore-search-btn">Search</button>
      </section>

      <section className="explore-buttons">
        <h2>See what's happening</h2>
        <div className="explore-btn-group">
          <button className="splash-button">Starting soon</button>
          <button className="splash-button">Today</button>
          <button className="splash-button">Tomorrow</button>
          <button className="splash-button">This week</button>
          <button className="splash-button">Online</button>
          <button className="splash-button">In person</button>
          <button className="splash-button">Trending near you</button>
        </div>
      </section>
    </div>
  )
}

export default SplashMainOverviewExplore