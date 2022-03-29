import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Group } from '../../types/types';
import GroupAbout from './group_about';
import GroupEvents from "./group_events"

function GroupMain({ group }: {group: Group}) {
  return (
    <div className="group-main">
      <nav className="group-nav body">
        <ul className="group-nav-links">
          <NavLink to="" end>About</NavLink>
          <NavLink to="events">Events</NavLink>
          <li><a>Members</a></li>
          <li><a>Photos</a></li>
          <li><a>Discussions</a></li>
          <li><a>More</a></li>
        </ul> 

        <button className="btn-red">Join this group</button>
      </nav>

      <div className="group-bg">
        <div className="body">
          <Routes>
            <Route index element={<GroupAbout group={group}/>} />
            <Route path="events/*" element={<GroupEvents group={group}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default GroupMain;