import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes, ProtectedRoutes } from '../util/route_utils';
import Splash from './splash/splash';
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import Home from './home/home';
import Missing from './misc/missing';
import GroupContainer from './groups/group_container';
import Layout from './layout';
import EventsContainer from './events/events_container';
import GroupForm from './groups/group_form';
import EventForm from './events/event_form';
import Search from './misc/search';
import HomeEditInterests from './home/home_edit_interests';
import UserForm from './user_forms/user_form';
import UserProfile from './home/user_profile';
import UserProfileEdit from './home/user_profile_edit';


export default function App() {
  const currentUser = useSelector((state: RootState) => state.session.currentUserId)
  const loggedIn = Boolean(currentUser)

  return (
    <div>
      
      <Routes>
        <Route element={<AuthRoutes loggedIn={loggedIn} />}>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<UserForm type="page" formType="login" />} />
          <Route path="/signup" element={<UserForm type="page" formType="signup" />} />
        </Route>

        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
            <Route path="/home/*" element={<Home />} />
            <Route path="/home/interests/edit" element={<HomeEditInterests />} />
            <Route path="/groups/new" element={<GroupForm type="new" />} />
            <Route path="/groups/:id/edit" element={<GroupForm type="edit" />} />
            <Route path="/groups/:group_id/events/new" element={<EventForm type="new" />} />
            <Route path="/groups/:group_id/events/:event_id/edit" element={<EventForm type="edit" />} />
            <Route path="/myprofile" element={<UserProfile />} />
            <Route path="/myprofile/edit" element={<UserProfileEdit />} />
          </Route>

          <Route path="/search/*" element={<Search />} />
          <Route path="/groups/:id/*" element={<GroupContainer />} />
          <Route path="/groups/:group_id/events/:id/*" element={<EventsContainer />} />

          <Route path="*" element={<Missing />} />

        </Route>
      </Routes>

    </div>
  )
}

// Route info: 
// - User can only access splash page if logged out

// - Layout will apply to all below: 
//  - User can only acccess home page if logged in
//  - Any user can access these routes: 
//   - Search, groups/:id, events/:id, user/:id
