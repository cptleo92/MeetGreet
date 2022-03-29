import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes, ProtectedRoutes} from '../util/route_utils';
import Splash from './splash/splash';
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import Home from './home/home';
import Missing from './misc/missing';
import Group from './groups/group';
import Layout from './layout';

export default function App() {
  const currentUser = useSelector((state: RootState) => state.session.currentUserId )
  const loggedIn = Boolean(currentUser)

  return (
    <div>
      <Routes> 
        <Route element={<AuthRoutes loggedIn={loggedIn} />}>    
          <Route path="/" element={<Splash />}/>
        </Route>

      <Route element={<Layout />}>
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/groups/:id/*" element={<Group />}/>
        {/* <Route path="/groups/new" element={<GroupCreate />}/> */}
        <Route path="/groups/new" element={<Missing />}/>

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
 