import React from "react";
import HomeSidebar from "./home_sidebar";
import HomeFeed from "./home_feed";

const HomeMain = () => {
  
  return (    
    <div className="home-main">      
      <HomeSidebar />
      <HomeFeed attendingOnly={false} pastOnly={false}/> 
    </div>
  )
}

export default HomeMain;