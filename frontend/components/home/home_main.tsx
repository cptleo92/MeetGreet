import React, { useEffect, useState } from "react";
import HomeSidebar from "./home_sidebar";
import HomeFeed from "./home-feed";
import { useDispatch } from "react-redux";
import { fetchUserFeedItems } from "../../actions/users_actions";
import { useUser } from "../../util/hooks";
import Loading from "../misc/loading";

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

  // console.log(loading)
  // debugger
  
  return (    
    <div className="home-main">      
      <HomeSidebar />
      <HomeFeed /> 
    </div>
  )
}

export default HomeMain;