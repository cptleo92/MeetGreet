import React from 'react';
import { Event } from '../../types/types';
import { stringifyDate } from '../../util/event_util';

function EventsHeader({ event }: { event: Event }) {

  return (
    <div className="event-header body">
      <p className="date">{stringifyDate(event.start_time)}</p>
      <h2 className="title">{event.title}</h2>
      {!event.public && <p className="private">Private group</p>}
      <p>Hosted by</p>
      <p className="host">{event.host_name}</p>
    </div>
  );
}

export default EventsHeader;