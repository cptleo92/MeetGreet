import { AnyAction } from "redux";
import { LOGOUT_USER } from "../../actions/session_actions";
import { RECEIVE_MEMBERSHIPS } from "../../actions/ui_actions";
import { Membership } from "../../types/types";

const _nullState: Membership[] = []

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_MEMBERSHIPS:
      return payload
    case LOGOUT_USER:
      return _nullState
    default:
      return state;
  }
}