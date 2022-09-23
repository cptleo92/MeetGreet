import { AnyAction } from "redux";
import { LOGOUT_USER } from "../../actions/session_actions";
import { RECEIVE_ORGANIZERS } from "../../actions/ui_actions";
import { UserName } from "../../types/types";

const _nullState: UserName[] = []

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_ORGANIZERS:
      return payload
    case LOGOUT_USER:
      return _nullState;
    default:
      return state;
  }
}