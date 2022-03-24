import React from 'react';
import SessionForm from './user_forms/login_form';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/session_actions';

export default function App() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div>
      <h1>This is the App component</h1>
      <SessionForm />
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}