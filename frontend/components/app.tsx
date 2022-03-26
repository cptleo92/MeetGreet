import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes, ProtectedRoutes} from '../util/route_utils';
import Splash from './splash/splash';
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import SplashFooter from './splash/splash_footer';

export default function App() {
  const currentUser = useSelector((state: RootState) => state.session.currentUserId )
  const loggedIn = Boolean(currentUser)

  return (
    <div>
      <Routes>     
        <Route path="/" element={<Splash />}/>

        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route path="/home" element={<SplashFooter />}>
        </Route>

        </Route>

      </Routes>     
    </div>
  )
}