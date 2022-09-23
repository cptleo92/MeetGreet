import { AnyAction } from "redux";
import { CLOSE_MODAL } from "../../actions/modal_actions";
import { RECEIVE_SESSION_ERRORS, RECEIVE_USER, LOGOUT_USER } from "../../actions/session_actions";

const _nullErrors: string[] = []

export default (state = _nullErrors, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_SESSION_ERRORS:
      return payload
    case RECEIVE_USER:
    case LOGOUT_USER:
    case CLOSE_MODAL:
      return _nullErrors;
    default: 
      return state;
  }
}