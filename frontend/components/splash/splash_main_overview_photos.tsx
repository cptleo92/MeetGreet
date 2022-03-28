import React from "react"

const SplashMainOverviewPhotos = () => {
  return (
    <div className="splash-overview-photos">
      <a className="splash-photo">
        <img 
          src={window.category1}
          alt="make new friends"
        />  
        <div className="caption">Make new friends</div>     
      </a>

      <a className="splash-photo">
        <img
          src={window.category2}
          alt="explore the outdoors"
        />
        <div className="caption">Explore the outdoors</div>   
      </a>

      <a className="splash-photo">
        <img 
          src={window.category3}
          alt="connect over tech"
        />
        <div className="caption">Connect over tech</div>   
      </a>
    </div>
  )
}

export default SplashMainOverviewPhotos