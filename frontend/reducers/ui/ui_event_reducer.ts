import { combineReducers } from "redux";
import uiEventAttendancesReducer from "./ui_event_attendances_reducer";
import uiEventAttendeesReducer from "./ui_event_attendees_reducer";
import uiPostsReducer from "./ui_post_reducer";

const uiEventReducer = combineReducers({
  attendees: uiEventAttendeesReducer,
  attendances: uiEventAttendancesReducer,
  posts: uiPostsReducer
})

export default uiEventReducer