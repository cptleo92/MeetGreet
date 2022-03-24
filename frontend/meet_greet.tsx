import React from 'react';
import ReactDOM from 'react-dom'
import { configureStore } from './store/store'
import Root from './components/root'

//TESTING
// import { signup, login, logout } from "./actions/session_actions"

document.addEventListener("DOMContentLoaded", () => {  

  //bootstrapping current user to window so it remembers if a user is logged in
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }       
      },
      session: { currentUserId: window.currentUser.id }
    }
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // //TESTING
  // window.demo = {email: 'demo@fake.com', password: 'password'}
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;

  const rootEl = document.getElementById("root")
  ReactDOM.render(
    <Root store={store} />,
    rootEl
  )
})

