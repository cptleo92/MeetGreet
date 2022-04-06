import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Group, Membership } from '../../types/types';
import GroupPanelPendingItem from './group_panel_pending_item';

function GroupPanelPending({ group }: {group: Group}) {
  const memberships: Membership[] = useSelector((state: RootState) => Object.values(state.ui.group.memberships))
  const pending = memberships.filter(membership => membership.status === "PENDING")

  return (
    <div className="pending">
      <h4>Pending</h4>
      <ul className="pending-list">
        {
          pending.map(membership => <GroupPanelPendingItem key={membership.id} membership={membership} group={group} />)
        }
      </ul>
    </div>
  );
}

export default GroupPanelPending;