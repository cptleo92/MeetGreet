import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAttendance, deleteAttendance } from '../../actions/users_actions';
import { RootState } from '../../store/store';
import { AttendancePost, Event } from '../../types/types';
import { stringifyDateLong } from '../../util/event_util';
import { useUser } from '../../util/hooks';
import { userNotMemberPrivateGroup } from '../../util/user_util';

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
        .then(() => navigate(0))
    }
  }

  const navigate = useNavigate();

  const attendEvent = () => {
    const data: AttendancePost = {
      attendee_id: user.id,
      event_id: event.id
    }
    setUpdating(true)
    dispatch(createAttendance(data))
      .then(() => navigate(0))
  }

  const renderSpotsLeft = () => {
    if (event.capacity !== 0) {
      const spotsLeft = event.capacity - event.attendees.length
      return (
        <p>{spotsLeft} spot{spotsLeft === 1 ? "" : "s"} left</p>
        )
    }
  }

  const isFull = () => {
    if (event.capacity !== 0) {
      return event.capacity - event.attendees.length === 0
    }
    return false;
  }

  const renderButton = () => {    
    if (userNotMemberPrivateGroup(event)) {
      return (
        <button className="btn-red">
          Members only!
        </button>
      )
    } else if (inPast()) {
      return (
        <button className="btn-red">
          Event over!
        </button>
      )
    } else if (isFull()) {
      return (
        <button className="btn-red">
          Event is full!
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
      {renderSpotsLeft()}
      {renderButton()}
      </div>
    </footer>
  );
}

export default EventsFooter;