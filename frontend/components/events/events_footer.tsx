import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAttendance, deleteAttendance } from '../../actions/users_actions';
import { RootState } from '../../store/store';
import { AttendancePost, Event } from '../../types/types';
import { stringifyDateLong } from '../../util/event_util';
import { useUser } from '../../util/hooks';

// get info footer to stick when off screen
window.onscroll = () => {
    const footer = document.querySelector(".event-footer")
    if (window.scrollY < 389) {
      footer.classList.add("sticky")
    } else {
      footer.classList.remove("sticky")
    }
  
}

function EventsFooter({ event }: { event: Event }) {
  const user = useUser();
  const dispatch = useDispatch();
  let attendancesFromStore = useSelector((state: RootState) => state.ui.event.attendances)
  let attendance = attendancesFromStore[user.id];

  const [updating, setUpdating] = useState(false);
  
  const inPast = () => {
    const date = new Date(event.start_time)
    const current = new Date(Date.now())
    return date.valueOf() - current.valueOf() < 0
  }

  const leaveEvent = () => {
    if (!inPast() && attendance !== undefined) {
      setUpdating(true)
      const attendanceId = attendance.id
      dispatch(deleteAttendance(attendanceId))
        .then(() => window.location.reload(false))
    }
  }

  const attendEvent = () => {
    const data: AttendancePost = {
      attendee_id: user.id,
      event_id: event.id
    }
    setUpdating(true)
    dispatch(createAttendance(data))
      .then(() => window.location.reload(false))
  }
  
  const renderButton = () => {
    if (inPast()) {
      return (
        <button className="btn-red">
          Event over!
          </button>
      )
    } else if (event.attendees.includes(user.id)) {
      return (
        <button onClick={leaveEvent} className="btn-red edit-rsvp">
          {updating ? "Updating..." : "Cancel RSVP"}
          </button>
      )
    } else {
      return (
        <button onClick={attendEvent} className="btn-red">
          {updating ? "Updating..." : "Attend Event"}
        </button>
      )
    }
  }

  return (
    <footer className="event-footer">
      <div className="body">
        
      <div className="info">
        <p>{stringifyDateLong(event.start_time)}</p>
        <p className="title">{event.title}</p>
      </div>
      {renderButton()}
      </div>
    </footer>
  );
}

export default EventsFooter;