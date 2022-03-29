import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { fetchUserFeedItems } from "../../actions/users_actions";

import HomeGreeting from "./home_greeting";
import HomeMain from "./home_main";
import Loading from "../misc/loading";

const Home = () => {
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(true);
  const currentUser = useUser();

  useEffect(() => {
    dispatch(fetchUserFeedItems(currentUser))
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="home">
      <div className="body">
        
        { !loading &&
          <>
          <HomeGreeting />
          <HomeMain />
          </>
        }


        {loading && <Loading />}
      </div>
    </div>
  )
}

export default Home;