import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { Event, EventEntity, Group, GroupEntity } from "../../types/types";
import { RootState } from "../../store/store";
import { sortByDate, getSoonestEvent, stringifyDateLong } from "../../util/event_util";
import { getUserEvents } from "../../selectors/selectors";
import { useNavigate, generatePath } from "react-router-dom";

const HomeSidebarEventsPreview = () => {
  const userEvents: Event[] = useSelector((state: RootState) => getUserEvents(state))
  const groups: GroupEntity = useSelector((state: RootState) => state.entities.groups)  

  let firstEvent: Event | null;
  if (userEvents.length === 0) {
    firstEvent = null;
  } else if (userEvents.length === 1) {
    firstEvent = userEvents[0];
  } else {
    firstEvent = getSoonestEvent(userEvents);
  }
  const getFirstEventGroup = () => {
    if (firstEvent !== null) {
      const eventGroup: Group = groups[firstEvent.group_id]
      return (
        eventGroup.title
      )
    } else {
      return (
        "Couldn't find group!"
      )
    }
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
          <h3>{getFirstEventGroup()}</h3>    
          <li className="date">{stringifyDateLong(firstEvent.start_time)}</li>                    
          <li className="title">{firstEvent.title}</li>
          <li className="group">{getFirstEventGroup()}</li>
          <li className="location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc */}
            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
            <p>{firstEvent === undefined ? "" : firstEvent.location || "Location not provided!"}</p>
          </li>          
          <li className="attending">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
            Attending
            </li>
        </ul>
      )
    }

  }

  const navigate = useNavigate();

  const handleClick = () => { 
    if (firstEvent !== null) {
      const path = generatePath("/groups/:group_id/events/:id", {
        group_id: firstEvent.group_id.toString(),
        id: firstEvent.id.toString()
      })
      navigate(path);
    }
  }

  return (
    <div className="sidebar-preview event" onClick={handleClick}>
      {renderEvents()}
    </div>
  )
}

export default HomeSidebarEventsPreview

