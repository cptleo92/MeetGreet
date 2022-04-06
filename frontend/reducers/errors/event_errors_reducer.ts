import { AnyAction } from "redux";
import { RECEIVE_EVENTS, RECEIVE_EVENT_ERRORS } from "../../actions/events_actions";

const _nullErrors: string[] = []

export default (state = _nullErrors, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_EVENT_ERRORS:
      return payload;
    case RECEIVE_EVENTS:
      return _nullErrors;
    default: 
      return state;
  }
}