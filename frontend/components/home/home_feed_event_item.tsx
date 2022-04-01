import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getGroups } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import { Event } from '../../types/types';
import { stringifyDate, stringifyDateLong } from '../../util/event_util';
import { useUser } from '../../util/hooks';

function HomeFeedEventItem({ day, events }: { day: string, events: Event[] }) {
  const user = useUser();
  const today = stringifyDate(Date.now())

  const renderHeader = () => {
    return day === today ? "Today" : day
  }

  const groupsFromStore = useSelector((state: RootState) => state.entities.groups)

  const renderGroupName = (event: Event) => {
    return (
      <p className="group">{groupsFromStore[event.group_id].title}</p>
    )
  }

  const isAttending = (event: Event) => {
    if (event.attendees.includes(user.id)) {
      return (
        <li className="attending">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
            {event.host_id === user.id ? "Hosting" : "Attending"}
            </li>
      )
    }
  }  

  // const navigate = useNavigate();

  const generateEventPath = (event: Event) => {
    const group_id = event.group_id;
    return(`/groups/${group_id}/events/${event.id}`)
  }

  return (
    <div className="feed-event">
      <h2 className="header">{renderHeader()}</h2>
      {
        events.map(event =>
        (
          <Link key={event.id} to={generateEventPath(event)}>
          <div className="item" >
            <div className="avatar"></div>
            <div className="info">
              <p className="date">{stringifyDateLong(event.start_time)}</p>
              <p className="title">{event.title}</p>
              {renderGroupName(event)}
              <p className="attendees">{event.attendees.length} attendees</p>
              {isAttending(event)}
            </div>
          </div>
          </Link>
        )
        )
      }

    </div>
  );
}

export default HomeFeedEventItem;