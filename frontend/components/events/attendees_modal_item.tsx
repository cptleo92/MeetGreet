import React from 'react';
import { stringifyRSVPtime } from '../../util/event_util';
import { AttendeesWithDate } from './events_page';

function AttendeesModalItem({ attendee, isOrganizer }: {attendee: AttendeesWithDate, isOrganizer: boolean}) {
  return (
    <div className="attendee-modal-item">
      <div className="avatar"></div>
      <div className="attendee-info">
        <p className="name">{attendee.fname} {attendee.lname}</p>
        {isOrganizer && <p>Organizer</p>}
        <p className="rsvp-time">{stringifyRSVPtime(attendee.created_at)}</p>
      </div>
    </div>
  );
}

export default AttendeesModalItem;