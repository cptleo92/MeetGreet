import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getEvents } from "../../selectors/selectors"
import { stringifyDateLong, sortByDate, stringifyDate, getUpcomingEvents } from "../../util/event_util";
import { Event } from "../../types/types";
import HomeFeedEventItem from "./home_feed_event_item";
import { useUser } from "../../util/hooks";

export interface EventsByDay {
  [day: string]: Event[]
}

const HomeFeed = () => {
  const eventsFromStore = useSelector((state: RootState) => getEvents(state))  
  let events = sortByDate(getUpcomingEvents([...eventsFromStore]))
  const groupsFromStore = useSelector((state: RootState) => state.entities.groups)
  const user = useUser();

  events = events.filter(event => user.groups.includes(event.group_id))

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
      return(
        <h2>You have no upcoming events!</h2>
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