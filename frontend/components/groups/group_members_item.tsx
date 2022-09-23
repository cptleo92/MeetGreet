import React from 'react';
import { useSelector } from 'react-redux';
import { updateMembership } from '../../util/entities_api_util';
import { RootState } from '../../store/store';
import { UserName } from '../../types/types';
import { stringifyDateMedium } from '../../util/event_util';
import { useUser, useLoggedIn } from '../../util/hooks';
import { useNavigate } from 'react-router-dom';

function GroupMembersItem({ member }: {member: UserName}) {
  const memberships = useSelector((state: RootState) => state.ui.group.memberships)
  const isOrganizer = memberships[member.id].organizer
  const navigate = useNavigate();
  const user = useUser();
  const loggedIn = useLoggedIn();
  const userId = loggedIn ? user.id : 0

  let userIsOrganizer = false;
  if (memberships[userId]) {
    userIsOrganizer = memberships[userId].organizer
  }

  const calcJoinedTime = () => {
    const joinDate = memberships[member.id].created_at
    return stringifyDateMedium(joinDate)
  }

  const makeOrganizer = () => {
    const membershipId = memberships[member.id].id
    const membershipData = {      
      id: membershipId,
      organizer: true
    }
    updateMembership(membershipData)
      .then(() => navigate(0))
  }

  return (
    <div className="member-card">
      <img className="avatar-round" src={member.avatar}/>
      <div className="info">
        <h4>{member.fname} {member.lname}</h4>
        {isOrganizer ? <p className="member-title">Organizer</p> : ""}      
        <p>Joined {calcJoinedTime()}</p>
        {
          (userIsOrganizer && !isOrganizer) &&
          <a onClick={makeOrganizer}>Make organizer!</a>
        }
      </div>
    </div>
  );
}

export default GroupMembersItem;