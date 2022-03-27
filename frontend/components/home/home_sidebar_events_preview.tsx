import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { Event, EventEntity } from "../../types/types";
import { fetchEvents } from "../../actions/events_actions"
import { RootState } from "../../store/store";

const HomeSidebarEventsPreview = () => {
  const dispatch = useDispatch();
  const currentUser = useUser();  
  // const allEvents = useSelector((state: RootState) => state.entities.events)
  console.log(currentUser)

  // const userEvents = currentUser.events.map(id => allEvents[id])


  return (
    <div className="sidebar-events-preview">
      <ul>
        {/* {
          userEvents.map((ev: Event) => <li>{ev.title}</li>)
        } */}
      </ul>
    </div>
  )
}

export default HomeSidebarEventsPreview