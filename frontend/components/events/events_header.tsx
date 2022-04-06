import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types/types';
import { stringifyDate } from '../../util/event_util';
import { useUser, useLoggedIn } from '../../util/hooks';

function EventsHeader({ event }: { event: Event }) {
  const user = useUser();
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const userId = loggedIn ? user.id : 0

  const isEditable = () => {
    const current = new Date();
    return event.host_id === userId && (event.start_time > current.toISOString())
  }

  const handleEditEvent = () => {
    navigate('edit')
  }
  
  return (
    <div className="event-header body">
      <p className="date">{stringifyDate(event.start_time)}</p>
      <h2 className="title">{event.title}</h2>
      {!event.public && <p className="private">Private group</p>}
      <p>Hosted by</p>
      <p className="host">{event.host_name}</p>
      {
        isEditable() && 
        <button onClick={handleEditEvent} className="btn-red">Edit event</button>
      }
    </div>
  );
}

export default EventsHeader;