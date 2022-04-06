import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Group, User } from '../../types/types';
import { useUser } from '../../util/hooks';

function GroupPanelMembers({ group }: { group: Group }) {
  const memberships = useSelector((state: RootState) => state.ui.group.memberships)
  const members = useSelector((state: RootState) => state.ui.group.members)
  const previewMembers = members.slice(0, 15).filter(member => memberships[member.id].status === "APPROVED")

  const user = useUser();

  const userNotMemberPrivateGroup = () => {
    if (!group.public) {
      return !user.groups.includes(group.id)
    }
    return false;
  }

  return (
    <div className="members">
      <div className="members-header">
        <h4>Members ({group.members.length})</h4>
        <NavLink to="members">See all</NavLink>
      </div>
      { userNotMemberPrivateGroup() ? 
      <div className="locked">This content is available only to members</div> : 
        <ul>
          {
            previewMembers.map((member: User) => <img key={member.id} className="avatar-round" src={member.avatar} />)
          }
        </ul>
      }
    </div>
  );
}

export default GroupPanelMembers;