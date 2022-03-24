import { AnyAction } from "redux";
import { RECEIVE_USER, LOGOUT_USER } from "../actions/session_actions";

const _nullState = {
  currentUserId: null
}

export default (state = _nullState, action: AnyAction) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return { currentUserId: action.payload.id }
    case LOGOUT_USER: 
      return _nullState
    default: 
      return state;
  }
}