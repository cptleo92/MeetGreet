import { AnyAction } from "redux";
import { RECEIVE_USER_ERRORS, RECEIVE_USER } from "../actions/session_actions";

const _nullErrors: string[] = []

export default (state = _nullErrors, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_USER_ERRORS:
      return payload
    case RECEIVE_USER:
      return _nullErrors;
    default: 
      return state;
  }
}