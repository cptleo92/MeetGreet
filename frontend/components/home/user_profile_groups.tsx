import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Group } from '../../types/types';
import { useUser } from '../../util/hooks';
import HomeSidebarGroupItem from "./home_sidebar_group_item"

function UserProfileGroups() {
  const user = useUser();
  const groupsFromStore: Group[] = useSelector((state: RootState) => Object.values(state.entities.groups))
  const userGroups = groupsFromStore.filter((group: Group) => user.groups.includes(group.id))


  return (
    <div className="profile-groups">
      <h2>Groups</h2>
      <ul className="profile-groups-list">
        {
          userGroups.map(group => <HomeSidebarGroupItem key={group.id} group={group} />)
        }
      </ul>
    </div>
  );
}

export default UserProfileGroups;