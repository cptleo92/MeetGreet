import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes, ProtectedRoutes} from '../util/route_utils';
import Splash from './splash/splash';
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import Home from './home/home';
import Missing from './misc/missing';
import Group from './groups/group';

export default function App() {
  const currentUser = useSelector((state: RootState) => state.session.currentUserId )
  const loggedIn = Boolean(currentUser)

  return (
    <div>
      <Routes> 
        <Route element={<AuthRoutes loggedIn={loggedIn} />}>    
          <Route path="/" element={<Splash />}/>
        </Route>
        
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/groups/:id" element={<Group />}/>

        <Route path="*" element={<Missing />} />

      </Routes>     
    </div>
  )
}