import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';
import { getGroup } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import { Group } from '../../types/types';
import GroupEventsList from './group_events_list';

function GroupEvents({ group }: {group: Group}) {

  return (
    <div className="tab">
      <div className="tab-select">
        <NavLink to="" end>Upcoming</NavLink>
        <NavLink to="past">Past</NavLink>
      </div> 
      <div className="list">
        <Routes>
          <Route index element={<GroupEventsList group={group} preview={false} pastOnly={false} />} />
          <Route path="past" element={<GroupEventsList group={group} preview={false} pastOnly={true}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default GroupEvents;