import { combineReducers } from "redux";
import usersReducer from "./users_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  // groups: groupsReducer,
  // events: eventsReducer,
  // posts: postsReducer,
  // topics: topicsReducer
})

export default entitiesReducer