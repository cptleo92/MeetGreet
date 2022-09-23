import { AnyAction } from "redux";
import { RECEIVE_EVENTS } from "../../actions/events_actions";
import { START_LOADING_EVENTS } from "../../actions/events_actions";

export default (state = false, action: AnyAction) => {
  Object.freeze(state);
  switch (action.type) {
    case START_LOADING_EVENTS:
      return true;
    case RECEIVE_EVENTS:
      return false;
    default: 
      return state;
  }
}