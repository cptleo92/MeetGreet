import React from 'react';
import { useSelector } from 'react-redux';
import { getMemberships } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import { AttendeesWithDate, getAttendeesWithJoinDate } from './events_page';
import AttendeesModalItem from './attendees_modal_item';

function AttendeesModal() {
  const attendeesWithJoinDate = getAttendeesWithJoinDate();
  const memberships = useSelector((state: RootState) => getMemberships(state))

  const isOrganizer = (attendee: AttendeesWithDate) => {
    if (memberships[attendee.id] === undefined) return false;
    return memberships[attendee.id].organizer
  }

    
  return (
    <ul className="attendee-modal">
    {
      attendeesWithJoinDate.map(attendee => {
        return <AttendeesModalItem 
        key={attendee.id} 
        attendee={attendee} 
        isOrganizer={isOrganizer(attendee)} />
      })
    }
    </ul>
  )
}

export default AttendeesModal;