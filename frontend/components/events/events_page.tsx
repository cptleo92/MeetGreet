import React, { useEffect } from 'react';
import { Event, Group, UserName, Attendance } from '../../types/types';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import EventsPageAttendees from './events_page_attendees';
import EventsPageGroupCard from './events_page_group_card';
import EventsPageDetails from './events_page_details';
import Modal from '../splash/modal';
import { openModal } from '../../actions/modal_actions';

export interface AttendeesWithDate{
    created_at: string;
    id: number;
    fname: string;
    lname: string;
}

// function to add in "created_at" value to Attendees object
export function getAttendeesWithJoinDate() {
  const attendeesFromStore: UserName[] = useSelector((state: RootState) => Object.values(state.ui.event.attendees))
  const attendancesFromStore: Attendance = useSelector((state: RootState) => state.ui.event.attendances)

  let attendeesWithJoinDate = attendeesFromStore.map(attendee => {
    return {
      ...attendee,
      created_at: attendancesFromStore[attendee.id.toString()].created_at
    }
  })
  
  // sorting by last joined
  return attendeesWithJoinDate.sort((a, b) => {
    const user1 = new Date(a.created_at).valueOf();
    const user2 = new Date(b.created_at).valueOf();
    return user2 - user1
  })
}

function EventsPage({ group, event }: {group: Group, event: Event}) {
  const attendeesWithJoinDate = getAttendeesWithJoinDate();

  const modal = useSelector((state: RootState) => state.ui.modal)
  const dispatch = useDispatch();
  const openAttendeesModal = () => {
    dispatch(openModal("attendees"))
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div className="content-bg">
      <div className="event-main body">
        <div className="event-main-left">
          <h4>Details</h4>
          <p className="description">{event.description}</p>
          <div className="attendees-container">
            <div className="header">
              <h4>Attendees ({event.attendees.length})</h4>
              <a onClick={openAttendeesModal}>See all</a>
              <Modal modal={modal} />
            </div>
            <EventsPageAttendees group={group} attendees={attendeesWithJoinDate.slice(0,8)}/>
          </div>
        </div>
        <div className="event-main-right">
          <EventsPageGroupCard group={group} />
          <EventsPageDetails event={event} />
        </div>
      </div>      
    </div>
  );
}

export default EventsPage;