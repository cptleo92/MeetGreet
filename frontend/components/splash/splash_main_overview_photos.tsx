import React from "react"
import { Link } from "react-router-dom"

const SplashMainOverviewPhotos = () => {

  return (
    <div className="splash-overview-photos">
      <Link to="/search/?keyword=coffee&location=&type=groups" className="splash-photo">
        <img 
          src={window.category1}
          alt="make new friends"
        />  
        <div className="caption">Make new friends</div>     
      </Link>

      <Link to="/search/?keyword=bird&location=&type=groups" className="splash-photo">
        <img
          src={window.category2}
          alt="explore the outdoors"
        />
        <div className="caption">Explore the outdoors</div>   
      </Link>

      <Link to="/search/?keyword=games&location=&type=groups" className="splash-photo">
        <img 
          src={window.category3}
          alt="connect over tech"
        />
        <div className="caption">Connect over tech</div>   
      </Link>
    </div>
  )
}

export default SplashMainOverviewPhotos