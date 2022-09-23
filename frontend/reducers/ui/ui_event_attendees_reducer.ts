import { AnyAction } from "redux";
import { LOGOUT_USER } from "../../actions/session_actions";
import { RECEIVE_ATTENDEES } from "../../actions/ui_actions";

const _nullState: number[] = []

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_ATTENDEES:
      return payload
    case LOGOUT_USER:
      return _nullState;
    default:
      return state;
  }
}