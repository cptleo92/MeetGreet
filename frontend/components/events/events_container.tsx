import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { receiveEvents } from '../../actions/events_actions';
import { receiveGroups } from '../../actions/groups_actions';
import { fetchAttendances, fetchAttendees } from '../../actions/ui_actions';
import { RootState } from '../../store/store';
import { Event, Group, _nullGroup } from '../../types/types';
import { fetchGroups, fetchEvents } from '../../util/entities_api_util';
import { useUser, useLoggedIn } from '../../util/hooks';
import Loading from '../misc/loading';
import EventsHeader from './events_header';
import EventsPage from './events_page';
import EventsFooter from './events_footer';
import { _nullEvent } from '../../types/types';


function EventsContainer() {
  const params = useParams();
  const group_id = parseInt(params.group_id)
  const id = parseInt(params.id)
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group>(_nullGroup)
  const [event, setEvent] = useState<Event>(_nullEvent)
  const dispatch = useDispatch();
  const user = useUser();
  const loggedIn = useLoggedIn();
  const userId = loggedIn ? user.id : 0

  useEffect(() => {
    setLoading(true);
    fetchGroups([group_id])
      .then(data => {
        dispatch(receiveGroups(data))
        let group = Object.values(data)[0]
        setGroup(group)             
        fetchEvents([id])
          .then(data => {
            dispatch(receiveEvents(data))
            let event = Object.values(data)[0]
            setEvent(event)
            dispatch(fetchAttendees(event))
              .then(() => {
                dispatch(fetchAttendances(event))
                  .then(() => setLoading(false))
              })
          })
      })
  }, [params])

  const isFull = () => {
    if (event.capacity !== 0) {
      return event.capacity - event.attendees.length === 0
    }
    return false;
  }

  const isAttending = () => {
    return event.attendees.includes(userId)
  }

  return (
    <div className="event-container">
      {loading && <Loading />}
      {!loading &&
        <>
        {
          isAttending() && 
          <header>You are going to this event!</header>
        }
        {
          (!isAttending() && isFull()) ?
          <header className="full">This event is full!</header> : <></>
        }
        <EventsHeader event={event} /> 
        <EventsPage event={event} group={group} />
        <EventsFooter event={event} />
        </>
      }
    </div>
  );
}

export default EventsContainer;