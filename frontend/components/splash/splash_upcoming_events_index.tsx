import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../../actions/events_actions";
import { Event } from "../../types/types";


const SplashUpcomingEventsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const dispatch = useDispatch();

  const fetchGroupsOfEvents = (events: Event[]) => {
    const groupIds: number[] = []
    events.forEach(event => groupIds.push(event.group_id))
    console.log(groupIds);
  }

  useEffect(() => {
    setLoading(true)
    dispatch(fetchEvents("splash"))
        .then(eventsData => {        
        setEvents(Object.values(eventsData.payload))        
        fetchGroupsOfEvents(events)
          // .then(() => setLoading(false))
      })
  }, [])



  return (
    <div className="splash-suggestions-list">
      { !loading &&
        events.map(event => <li>{event.title}</li>)
      }
    </div>
  )
}

export default SplashUpcomingEventsIndex