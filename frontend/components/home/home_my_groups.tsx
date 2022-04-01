import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import HomeGroupsList from './home_groups_list';

function HomeMyGroups() {

  return (
    <div className="tab">
    <div className="tab-select">
      <NavLink to="" end>Member</NavLink>
      <NavLink to="organizer">Organizer</NavLink>
    </div>
    <div className="list">
      <Routes>
        <Route index element={<HomeGroupsList preview={false} organizerOnly={false}/>} />
        <Route path="organizer" element={<HomeGroupsList preview={false} organizerOnly={true}/>} />
      </Routes>
    </div>
  </div>
  );
}

export default HomeMyGroups;