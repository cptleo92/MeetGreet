import React from 'react';
import { Group } from '../../types/types';
import { AttendeesWithDate } from './events_page';
import EventsPageAttendeeItem from './events_page_attendee_item';

function EventsPageAttendees({ group, attendees }: { group: Group, attendees: AttendeesWithDate[]}) {
  return (
    <div className="attendees-cards">
        {
          attendees.map(attendee => <EventsPageAttendeeItem key={attendee.id} group={group} attendee={attendee} />)
        }
    </div>
  );
}

export default EventsPageAttendees;