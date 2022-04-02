import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserName } from '../../types/types';
import { stringifyDateMedium } from '../../util/event_util';

function GroupMembersItem({ member }: {member: UserName}) {
  const memberships = useSelector((state: RootState) => state.ui.group.memberships)
  const isOrganizer = memberships[member.id].organizer

  const calcJoinedTime = () => {
    const joinDate = memberships[member.id].created_at
    return stringifyDateMedium(joinDate)
  }

  return (
    <div className="member-card">
      <img className="avatar-round" src={member.avatar}/>
      <div className="info">
        <h4>{member.fname} {member.lname}</h4>
        {isOrganizer ? <p className="member-title">Organizer</p> : ""}      
        <p>Joined {calcJoinedTime()}</p>
      </div>
    </div>
  );
}

export default GroupMembersItem;