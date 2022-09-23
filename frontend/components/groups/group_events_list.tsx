import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getEventsFromGroup } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import { Event, Group } from '../../types/types';
import { getUpcomingEvents, getPastEvents, sortByDate } from '../../util/event_util';
import GroupEventsItem from './group_event_item';

function GroupEventsList({ group, preview = true, pastOnly }: { group: Group, preview: boolean, pastOnly: boolean }) {
  const eventsFromStore = useSelector((state: RootState) => getEventsFromGroup(state, group))
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState(eventsFromStore)
  const [hasUpcoming, setHasUpcoming] = useState(true)

  const sortEvents = (fetchedEvents: Event[]) => {
    if (fetchedEvents.length > 0) {
      let sortedEvents = sortByDate(getUpcomingEvents(fetchedEvents));
      setHasUpcoming(true)
      if (sortedEvents.length === 0 || pastOnly) {
        sortedEvents = sortByDate(getPastEvents(fetchedEvents)).reverse();
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
    sortEvents(eventsFromStore)
  }, [group, pastOnly])

  const { pathname } = useLocation();

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
        if (pathname.includes("past") || !pathname.includes("allevents")) {
          return (
            <h2>Past events ({events.length})</h2>
            )
        } else {
          return (
            <h2>No upcoming events.<br/>See past events below.</h2>
          )
        }
    }
  }


  return (
    <div className="about-event-list">     
      { !loading &&
      <>
      { renderEventHeader() }  
        < ul >
        {
          events.map((event: Event) => <GroupEventsItem key={event.id} event={event} upcoming={pastOnly ? false : hasUpcoming} />)
        }
        </ul>     
      </>
      }  
    </div >
  );
}

export default GroupEventsList;