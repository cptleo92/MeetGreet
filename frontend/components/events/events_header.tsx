import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Event } from '../../types/types';
import { stringifyDate } from '../../util/event_util';

function EventsHeader({ event }: { event: Event }) {
  const hostId = event.host_id
  const hostFName = useSelector((state: RootState) => state.ui.event.attendees[hostId].fname)
  const hostLName = useSelector((state: RootState) => state.ui.event.attendees[hostId].lname)

  // const getHost = () => {
    
  // }

  return (
    <div className="event-header body">
      <p className="date">{stringifyDate(event.start_time)}</p>
      <h2 className="title">{event.title}</h2>
      <p>Hosted by</p>
      <p className="host">{hostFName} {hostLName}</p>
    </div>
  );
}

export default EventsHeader;