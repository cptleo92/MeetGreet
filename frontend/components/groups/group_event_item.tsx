import React, { useState } from 'react';
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom';
import { Event } from '../../types/types';
import { stringifyDateLong } from '../../util/event_util';

function GroupEventsItem({ event, upcoming }: {event: Event, upcoming: boolean}) {
  const className = () => {
    return upcoming ? "event-card upcoming" : "event-card past"
  }

  const style = {
    color: upcoming ? "" : "gray"
  }

  const navigate = useNavigate();

  const navigateToEvent = () => { 
    const path = generatePath("/groups/:group_id/events/:id", {
      group_id: event.group_id.toString(),
      id: event.id.toString()
    })
    navigate(path);
  }

  return (
    <div 
      className={className()}
      style={style}
      onClick={navigateToEvent}
    >
      <h4 
        className="title"
        style={style}
      >
        {stringifyDateLong(event.start_time)}
      </h4>
      
      <h2>{event.title}</h2>

      <p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc */}
      <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
      {event.location}</p>

      <p>{event.attendees.length} attendees</p>
    </div>
  );
}

export default GroupEventsItem;