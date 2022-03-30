import React from 'react';
import { Group } from '../../types/types';
import { NavLink, Routes, Route } from 'react-router-dom';
import GroupMembersList from './group_members_list';

function GroupMembers({ group }: {group: Group}) {
  return (
    <div className="tab">
    <div className="tab-select">
      <NavLink to="" end>All members</NavLink>
      <NavLink to="leadership">Leadership team</NavLink>
    </div> 
    <div className="list">
      <Routes>
        <Route index element={<GroupMembersList group={group} organizers={false}/>} />
        <Route path="leadership" element={<GroupMembersList group={group} organizers={true}/>} />
      </Routes>
    </div>
  </div>
  );
}

export default GroupMembers;