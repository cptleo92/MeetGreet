import React from 'react';
import { Group } from '../../types/types';
import { AttendeesWithDate } from './events_page';

function EventsPageAttendeeItem({ attendee, group }: {attendee: AttendeesWithDate, group: Group }) {
  const attendeeTitle = () => {
    const organizers = group.organizers
    return organizers.includes(attendee.id) ? "Organizer" : "Member"
  }

  return (
    <div className="attendee-card">
      <div className="avatar"></div>
      <div className="attendee-info">
        <h5>{attendee.fname}</h5> 
        <h5>{attendee.lname}</h5>
        <p>{attendeeTitle()}</p>
      </div>
    </div>
  );
}

export default EventsPageAttendeeItem;