import React from 'react';
import { UserName } from '../../types/types';

function GroupMembersItem({ member }: {member: UserName}) {
  return (
    <div className="member-card">
      <h4>{member.fname} {member.lname}</h4>
      <p>Joined...?</p>
    </div>
  );
}

export default GroupMembersItem;