import React from 'react';
import ReactDOM from 'react-dom'
import { configureStore } from './store/store'
import Root from './components/root'

//TESTING
import { signup, login, logout } from "./actions/session_actions"
import { getUpcomingEvents, getPastEvents } from "./util/event_util"

document.addEventListener("DOMContentLoaded", () => {  

  // bootstrapping current user to window so it remembers if a user is logged in
  // keeping this in in case redux-persist has issues!
  // ---------------------------
  // let store;
  // if (window.currentUser) {
  //   const preloadedState = {
  //     entities: {
  //       users: { [window.currentUser.id]: window.currentUser }       
  //     },
  //     session: { currentUserId: window.currentUser.id }
  //   }
  //   store = configureStore(preloadedState);
  //   delete window.currentUser;
  // } else {
  //   store = configureStore();
  // }

  let persistedStore;
  if (window.currentUser) {
    console.log("found current user!")
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }       
      },
      session: { currentUserId: window.currentUser.id }
    }
    persistedStore = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    persistedStore = configureStore();
  }

  const { store, persistor } = persistedStore;
  // //TESTING
  window.demo = {email: 'demo@fake.com', password: 'password'}
  window.dispatch = store.dispatch;
  // window.signup = signup;
  window.login = login;
  window.logout = logout;
  window.getUpcomingEvents = getUpcomingEvents;
  window.getPastEvents = getPastEvents;

  const rootEl = document.getElementById("root")
  ReactDOM.render(
    <Root store={store} persistor={persistor}/>,
    rootEl
  )
})

