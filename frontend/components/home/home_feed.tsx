import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getEvents, getUserEvents } from "../../selectors/selectors"
import { stringifyDateLong, sortByDate, stringifyDate, getUpcomingEvents, getPastEvents } from "../../util/event_util";
import { Event } from "../../types/types";
import HomeFeedEventItem from "./home_feed_event_item";
import { useUser } from "../../util/hooks";

export interface EventsByDay {
  [day: string]: Event[]
}

const HomeFeed = ({ attendingOnly, pastOnly, hosting }: { attendingOnly: boolean, pastOnly: boolean, hosting: boolean }) => {
  let eventsFromStore;
  if (attendingOnly) {
    eventsFromStore = useSelector((state: RootState) => getUserEvents(state))      
  } else {
    eventsFromStore = useSelector((state: RootState) => getEvents(state))  
  }

  let events;
  if (pastOnly) {
    events = sortByDate(getPastEvents([...eventsFromStore])).reverse();
  } else {
    events = sortByDate(getUpcomingEvents([...eventsFromStore]))
  }

  const user = useUser();
  events = events.filter(event => 
    user.groups.includes(event.group_id) || event.attendees.includes(user.id)
  )

  if (hosting) {
    events = events.filter(event => event.host_id === user.id)
  }

  // create an object grouping events by day
  const userEventsByDay: EventsByDay = {};
  
  events.forEach(event => {
    const day = stringifyDate(event.start_time)

    if (userEventsByDay[day] === undefined) {
      userEventsByDay[day] = [event];
    } else {
      userEventsByDay[day].push(event)
    }
  })

  const renderNoEventsHeader = () => {
    if (events.length === 0) {
      if (hosting) {
        return (
          <h2>You are not hosting any events!</h2>
        )
      }
      return(
        <h2>You have no events!</h2>
      )
    }
  }

  return (
    <div className="home-feed">
      {renderNoEventsHeader()}
      <ul>
        {
          Object.entries(userEventsByDay).map(([day, events], idx) =>       
            <HomeFeedEventItem key={idx} day={day} events={events} />)
        }
      </ul>
    </div>
  )
}

export default HomeFeed;