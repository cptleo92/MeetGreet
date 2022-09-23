import { AnyAction } from "redux";
import { LOGOUT_USER } from "../../actions/session_actions";
import { RECEIVE_ATTENDANCES } from "../../actions/ui_actions";
import { Attendance } from "../../types/types";

const _nullState: Attendance[] = []

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_ATTENDANCES:
      return payload
    case LOGOUT_USER:
      return _nullState
    default:
      return state;
  }
}