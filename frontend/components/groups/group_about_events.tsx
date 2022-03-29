import React, { useState, useEffect } from 'react';
import { Event, Group } from '../../types/types';
import { fetchEvents } from '../../util/entities_api_util';
import { getUpcomingEvents, getPastEvents, sortByDate } from '../../util/event_util';
import GroupEventsItem from './group_event_item';

function GroupEvents({ group }: {group: Group}) {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<any>([])
  const [hasUpcoming, setHasUpcoming] = useState(true)

  const sortEvents = (fetchedEvents: Event[]) => {
    if (fetchedEvents.length > 0) {      
      let sortedEvents = sortByDate(getUpcomingEvents(fetchedEvents));
      setHasUpcoming(true)
      if (sortedEvents.length === 0) {
        sortedEvents = sortByDate(getPastEvents(fetchedEvents));    
        setHasUpcoming(false)  
      }
      setEvents(sortedEvents)
    } else {
      setEvents([])
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchEvents(group.events)
      .then((data) => {
        sortEvents(Object.values(data))        
      })
  }, [group])

  const renderEventHeader = () => {
    if (events.length === 0) {
      return (
        <h2>No events!</h2>
      )
    } else if (hasUpcoming) {
      return (
        <h2>Upcoming events ({events.length})</h2>
      )
    } else {
      return (
        <h2>Past events ({events.length})</h2>
      )
    }
  }

  return (
    <div className="about-event-list">
      { !loading && 
        <>
          {renderEventHeader()}       
        <ul>
          {
            events.map((event: Event) => <GroupEventsItem key={event.id} event={event} upcoming={hasUpcoming} />)
          }
        </ul>
        </>
      }
    </div>
  );
}

export default GroupEvents;