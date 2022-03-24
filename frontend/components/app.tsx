import React from 'react';
import SessionForm from './user_forms/login_form';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/session_actions';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Splash from './splash/splash';

export default function App() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Splash />}/>
      </Routes>     
    </div>
  )
}