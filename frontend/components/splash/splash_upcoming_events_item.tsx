import React from 'react';
import { Event } from '../../types/types';
import { stringifyDateLongAbrv } from '../../util/event_util';

function SplashUpcomingEventsItem({ event }: {event: Event}) {

  const truncate = (string: string) => {
    if (string.length > 25) {
      return string.slice(0, 22) + "..."
    } else {
      return string
    }
  }

  return (
    <div className="splash-event-card">        
          <div className="item" >
            <div className="avatar"></div>
            <div className="info">
              <p className="date">{stringifyDateLongAbrv(event.start_time)}</p>
              <p className="title">{truncate(event.title)}</p>
              <p className="group">{truncate(event.group_title)}</p>
              <p className="attendees">{event.attendees.length} attendees</p>
            </div>
          </div>
    </div>
  );
}

export default SplashUpcomingEventsItem;