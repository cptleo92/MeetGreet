import React, { useEffect, useState } from "react";
import HomeSidebar from "./home_sidebar";
import HomeFeed from "./home_feed";

const HomeMain = () => {
  // const dispatch = useDispatch(); 
  // const [loading, setLoading] = useState(true);
  // const currentUser = useUser();

  // useEffect(() => {
  //   dispatch(fetchUserFeedItems(currentUser))
  //     .then(() => {
  //       setLoading(false)
  //     })
  // }, [])

  
  return (    
    <div className="home-main">      
      <HomeSidebar />
      <HomeFeed /> 
    </div>
  )
}

export default HomeMain;