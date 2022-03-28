import React, { useEffect, useState } from "react";
import HomeSidebar from "./home_sidebar";
import HomeFeed from "./home-feed";
import { useDispatch } from "react-redux";
import { fetchUserFeedItems } from "../../actions/users_actions";
import { useUser } from "../../util/hooks";

const HomeMain = () => {
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(true);
  const currentUser = useUser();

  useEffect(() => {
    dispatch(fetchUserFeedItems(currentUser))
      .then(() => {
        console.log("Finished loading user info")
        setLoading(false)
      })
  }, [])

  // console.log(loading)
  // debugger
  
  return (    
    <div className="home-main">      
      {!loading && <HomeSidebar />}
      {!loading && <HomeFeed /> } 

      {loading && <p>Loading...</p>}
    </div>
  )
}

export default HomeMain;