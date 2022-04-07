import { AnyAction } from "redux";
import { RECEIVE_EVENTS } from "../../actions/events_actions";
import { EventEntity } from "../../types/types";
import { LOGOUT_USER, RECEIVE_USER } from "../../actions/session_actions";

const _nullState: EventEntity = {}

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_EVENTS:
      return Object.assign({}, state, payload)
    case LOGOUT_USER:
    // case RECEIVE_USER:
      return _nullState;
    default:
      return state;
  }
}