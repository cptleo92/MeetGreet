import React, { useEffect } from 'react';
import HomeFeed from './home_feed';
import { NavLink, Routes, Route } from 'react-router-dom';

function HomeMyEvents() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="tab">
      <div className="tab-select">
        <NavLink to="" end>Upcoming</NavLink>
        <NavLink to="past">Past</NavLink>
        <NavLink to="hosting">Hosting</NavLink>
      </div>
      <div className="list">
        <Routes>
          <Route index element={<HomeFeed attendingOnly={true} pastOnly={false} hosting={false}/>} />
          <Route path="past" element={<HomeFeed attendingOnly={true} pastOnly={true} hosting={false}/>} />
          <Route path="hosting" element={<HomeFeed attendingOnly={true} pastOnly={false} hosting={true} />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomeMyEvents;