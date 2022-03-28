import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { Event, EventEntity } from "../../types/types";
import { RootState } from "../../store/store";
import { sortByDate, getSoonestEvent, stringifyDate } from "../../util/event_util";
import { getEvents } from "../../selectors/selectors";

const HomeSidebarEventsPreview = () => {
  const userEvents: Event[] = useSelector((state: RootState) => getEvents(state))

  let firstEvent: Event | null;
  if (userEvents.length === 0) {
    firstEvent = null;
  } else if (userEvents.length === 1) {
    firstEvent = userEvents[0];
  } else {
    firstEvent = getSoonestEvent(userEvents);
  }

  const renderEvents = () => {
    if (firstEvent === null) {
      return (
        <div className="no-preview">          
          <strong>You have not registered for any events</strong>
          <p>Events you have registered for will appear here.</p>
        </div>
      )
    } else {
      return (
        <ul className="next-event">          
          <li><h2>{firstEvent.title}</h2></li>
          <li>{stringifyDate(firstEvent.start_time)}</li>                        
          <li>{firstEvent.attendees.length} attending</li>                                  
        </ul>
      )
    }

  }

  return (
    <div className="sidebar-preview">
      {renderEvents()}
    </div>
  )
}

export default HomeSidebarEventsPreview

