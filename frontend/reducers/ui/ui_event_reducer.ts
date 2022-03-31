import { combineReducers } from "redux";
import uiEventAttendanceseducer from "./ui_event_attendances_reducer";
import uiEventAttendeesReducer from "./ui_event_attendees_reducer";

const uiEventReducer = combineReducers({
  attendees: uiEventAttendeesReducer,
  attendances: uiEventAttendanceseducer
})

export default uiEventReducer