import React, { useEffect, useState } from "react";
import HomeSidebar from "./home_sidebar";
import HomeFeed from "./home_feed";

const HomeMain = () => {
  
  return (    
    <div className="home-main">      
      <HomeSidebar />
      <HomeFeed /> 
    </div>
  )
}

export default HomeMain;