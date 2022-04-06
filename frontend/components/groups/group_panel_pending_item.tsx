import React from 'react';
import { updateMembership } from '../../util/entities_api_util';
import { Group, Membership } from '../../types/types';
import { useNavigate } from 'react-router-dom';

function GroupPanelPendingItem({ membership, group }: { membership: Membership, group: Group }) {
  const navigate = useNavigate();

  const changeMembership = (choice: string) => {
    const data = {
      id: membership.id,
      member_id: membership.member_id,
      group_id: group.id,
      organizer: false,
      status: choice
    }
    updateMembership(data)
      .then(() => navigate(0))
  }

  return (
    <li className="pending-item">
      <img className="avatar-round" src={membership.member_avatar} />
      <div className="pending-name">
        <p>{membership.member_name}</p>
        <div className="pending-buttons">
          <button onClick={() => changeMembership('APPROVED')} className="approve">Approve</button>
          <button onClick={() => changeMembership('REJECTED')} className="deny">Deny</button>
        </div>
      </div>
    </li>
  );
}

export default GroupPanelPendingItem;