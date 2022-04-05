import React from 'react';
import { Event } from '../../types/types';
import { stringifyDateMedium, stringifyEventTimes } from '../../util/event_util';
import { userNotMemberPrivateGroup } from '../../util/user_util';

function EventsPageDetails({ event }: {event: Event}) {
  return (
    <div className="details">
      <ul>
        <li className="times">
          <svg className="clock line-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>
          <div>
            <p>{stringifyDateMedium(event.start_time)}</p>
            <p>{stringifyEventTimes(event.start_time, event.end_time)}</p>
          </div>
        </li>
        <li className="location line-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc */}
            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
          {
            userNotMemberPrivateGroup(event) ? 
            "Location visible to members" :
            event.location
          }
        </li>
      </ul>
    </div>
  );
}

export default EventsPageDetails;