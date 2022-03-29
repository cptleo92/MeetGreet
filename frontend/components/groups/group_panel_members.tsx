import React, { useEffect, useState } from 'react';
import { Group, User } from '../../types/types';
import { fetchUsers } from '../../util/entities_api_util';

function GroupPanelMembers({ group }: {group: Group}) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchUsers(group.members)
      .then((data) => {
        setMembers(Object.values(data))
        setLoading(false)
      })
  }, [group])

  return (
    <div className="members">
      <h4>Members ({group.members.length})</h4>
        {loading ? <p>...</p> : 
          <ul>
            {
              members.map((member: User, idx) => <li key={idx}>{member.fname} {member.lname}</li>)
            }
          </ul>
        }
    </div>
  );
}

export default GroupPanelMembers;