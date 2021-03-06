import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import eventsReducer from "./events_reducer";
import groupsReducer from "./groups_reducer";
import topicsReducer from "./topics_reducer"

const entitiesReducer = combineReducers({
  users: usersReducer,
  groups: groupsReducer,
  events: eventsReducer,
  // posts: postsReducer,
  topics: topicsReducer
})

export default entitiesReducer