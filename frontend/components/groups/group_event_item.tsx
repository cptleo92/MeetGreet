import React from 'react';
import { Event } from '../../types/types';
import { stringifyDateLong } from '../../util/event_util';

function GroupEventsItem({ event, upcoming }: {event: Event, upcoming: boolean}) {
  const className = () => {
    return upcoming ? "event-card upcoming" : "event-card past"
  }

  return (
    <div className={className()}>
      <h4 className="title">{stringifyDateLong(event.start_time)}</h4>
      <h2>{event.title}</h2>
      <p>{event.location}</p>
      <p>{event.attendees.length} attendees</p>
    </div>
  );
}

export default GroupEventsItem;