import { combineReducers } from "redux";
import SessionErrorsReducer from "./session_errors_reducer";
import UsersErrorsReducer from "./users_errors_reducer";

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
  user: UsersErrorsReducer
})

export default errorsReducer