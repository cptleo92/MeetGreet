import React from "react";

const SplashMainOverviewExplore = () => {
  return (
    <div className="splash-explore">
      <section className="explore-search">
        <h2>What do you want to do?</h2>
        <div className="explore-inputs">
          <div className="input-search">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.  */}
            <svg className="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
            <input           
              type="text"
              placeholder='Search for "Tennis"'
            />    
          </div>  
          <div className="input-location">   
              <svg className="marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">{/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.*/}<path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
            <input         
              type="text"
              placeholder='City or zip code'
            />                
          </div>
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