import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { receiveEvents } from '../../actions/events_actions';
import { receiveGroups } from '../../actions/groups_actions';
import { fetchAttendances, fetchAttendees } from '../../actions/ui_actions';
import { RootState } from '../../store/store';
import { Event, Group } from '../../types/types';
import { fetchGroups, fetchEvents } from '../../util/entities_api_util';
import Loading from '../misc/loading';
import EventsHeader from './events_header';
import EventsPage from './events_page';

function EventsContainer() {
  const params = useParams();
  const group_id = parseInt(params.group_id)
  const id = parseInt(params.id)
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group>()
  const [event, setEvent] = useState<Event>()
  const dispatch = useDispatch();

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

  return (
    <div className="event-container">
      {loading && <Loading />}
      {!loading &&
        <>
        <EventsHeader event={event} /> 
        <EventsPage event={event} group={group} />
        {/* <EventsFooter event={event} /> */}
        </>
      }
    </div>
  );
}

export default EventsContainer;