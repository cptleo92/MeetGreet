import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMembership } from '../../util/entities_api_util';
import { RootState } from '../../store/store';
import { UserName } from '../../types/types';
import { stringifyDateMedium } from '../../util/event_util';
import { useUser } from '../../util/hooks';

function GroupMembersItem({ member }: {member: UserName}) {
  const memberships = useSelector((state: RootState) => state.ui.group.memberships)
  const isOrganizer = memberships[member.id].organizer
  const dispatch = useDispatch();
  const user = useUser();

  let userIsOrganizer = false;
  if (memberships[user.id]) {
    userIsOrganizer = memberships[user.id].organizer
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
      .then(() => window.location.reload(false))
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