import React from 'react';
import ReactDOM from 'react-dom'
import { configureStore } from './store/store'
import Root from './components/root'

//TESTING
import { signup, login, logout } from "./actions/session_actions"
import { fetchGroups } from "./actions/groups_actions"
import { fetchUserFeedItems } from "./actions/users_actions"
// import { fetchTopics } from "./actions/topics_actions"

document.addEventListener("DOMContentLoaded", () => {  

  // bootstrapping current user to window so it remembers if a user is logged in
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

  // this bit belongs in root.html.erb for bootstrapping
  // -----------------------------
  //   <% if logged_in? %>
  //   <script type="text/javascript">
  //     window.currentUser = <%= render("api/users/user_full.json.jbuilder", user: current_user).html_safe %>
  //   </script>
  // <% end %>

  // //TESTING
  // window.demo = {email: 'demo@fake.com', password: 'password'}
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  // window.fetchUserFeedItems = fetchUserFeedItems
  // window.fetchTopics = fetchTopics;

  const rootEl = document.getElementById("root")
  ReactDOM.render(
    <Root />,
    rootEl
  )
})

