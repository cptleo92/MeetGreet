import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";

import HomeGreeting from "./home_greeting";
import HomeMain from "./home_main";
import Loading from "../misc/loading";
import { fetchEvents } from "../../actions/events_actions";
import { EventEntity } from "../../types/types";
import { fetchGroups } from "../../actions/groups_actions"

const Home = () => {
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(true);
  const currentUser = useUser();

  const fetchGroupsOfEvents = (events: EventEntity) => (dispatch: any) => {
    const eventGroups: number[] = [];
    const eventArray = Object.values(events)
    for (let i = 0; i < eventArray.length; i++) {
      eventGroups.push(eventArray[i].group_id)
    }
    return dispatch(fetchGroups(eventGroups))
  }

  useEffect(() => {
    dispatch(fetchEvents(currentUser.events))
      .then(({ payload }: { payload: EventEntity }) => {
        dispatch(fetchGroupsOfEvents(payload))      
          .then(() => {
            dispatch(fetchGroups(currentUser.groups))
              .then(() => {
                console.log('done fetching')
                setLoading(false)
              })
            })
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