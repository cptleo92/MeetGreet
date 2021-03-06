import { combineReducers } from "redux";
import SessionErrorsReducer from "./session_errors_reducer";
import UsersErrorsReducer from "./users_errors_reducer";
import GroupErrorsReducer from "./group_errors_reducer";
import EventErrorsReducer from "./event_errors_reducer";

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
  user: UsersErrorsReducer,
  group: GroupErrorsReducer,
  event: EventErrorsReducer
})

export default errorsReducer