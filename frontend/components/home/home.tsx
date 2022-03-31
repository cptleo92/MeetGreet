import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";

import HomeGreeting from "./home_greeting";
import HomeMain from "./home_main";
import Loading from "../misc/loading";
import HomeAllEvents from "./home_all_events";
import { fetchEvents } from "../../actions/events_actions";
import { EventEntity, GroupEntity } from "../../types/types";
import { fetchGroups } from "../../actions/groups_actions"
import { AppDispatch } from "../../store/store";
import { AnyAction } from "redux";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(true);
  const currentUser = useUser();

  // make sure store has groups belonging to all user's events
  const fetchGroupsOfEvents = (userEvents: EventEntity) => (dispatch: any) => {
    const eventGroups: number[] = [];
    const eventArray = Object.values(userEvents)
    for (let i = 0; i < eventArray.length; i++) {
      eventGroups.push(eventArray[i].group_id)
    }
    return dispatch(fetchGroups(eventGroups))
  }

  // make sure store has upcoming events of all groups that user is member of
  const fetchAllEventsForUser = (userGroups: GroupEntity) => (dispatch: any) => {
    let allEventsOfUserGroups: number[] = [];
    const groupsArray = Object.values(userGroups)
    for (let i = 0; i < groupsArray.length; i++) {
      allEventsOfUserGroups = allEventsOfUserGroups.concat(groupsArray[i].events)      
    }
    return dispatch(fetchEvents(allEventsOfUserGroups))
  }

  useEffect(() => {
    dispatch(fetchEvents(currentUser.events))
      .then(({ payload }: { payload: EventEntity }) => {
        dispatch(fetchGroupsOfEvents(payload))      
          .then(() => {
            dispatch(fetchGroups(currentUser.groups))
              .then(({ payload }: {payload: GroupEntity}) => {
                dispatch(fetchAllEventsForUser(payload))
                .then(() => setLoading(false))
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
          <Routes>
            <Route index element={<HomeMain />} />
            <Route path="myevents" element={<HomeAllEvents />} />
          </Routes>
        </>
          
        }


        {loading && <Loading />}
      </div>
    </div>
  )
}

export default Home;