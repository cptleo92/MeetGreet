import React from 'react';
import { Event } from '../../types/types';
import { userNotMemberPrivateGroup } from '../../util/user_util';

function EventMembersOnly({ event, component }: {event: Event, component: JSX.Element}) {

  return (
    userNotMemberPrivateGroup(event) ? 
    <div className="locked">This content is available only to members</div> : 
    component
  );
}

export default EventMembersOnly;