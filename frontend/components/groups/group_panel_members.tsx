import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Group, User } from '../../types/types';
import { fetchUsers } from '../../util/entities_api_util';

function GroupPanelMembers({ group }: {group: Group}) {
  // const [loading, setLoading] = useState(true);
  // const [members, setMembers] = useState([]);

  // useEffect(() => {
  //   fetchUsers(group.members)
  //     .then((data) => {
  //       setMembers(Object.values(data))
  //       setLoading(false)
  //     })
  // }, [group])

  const members = useSelector((state: RootState) => state.ui.group.members)
  const previewMembers = members.slice(0,15)

  return (
    <div className="members">
      <div className="members-header">
        <h4>Members ({group.members.length})</h4>     
        <NavLink to="members">See all</NavLink>
      </div>
        <ul>
          {
            previewMembers.map((member: User, idx: number) => <li key={idx}>{member.fname} {member.lname}</li>)
          }
        </ul>        
    </div>
  );
}

export default GroupPanelMembers;