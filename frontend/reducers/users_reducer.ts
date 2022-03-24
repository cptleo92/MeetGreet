import { AnyAction } from "redux";
import { RECEIVE_USER } from "../actions/session_actions";

const _nullUser = {}

export default (state = _nullUser, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { [payload.id]: payload })
    default: 
      return state;
  }
}