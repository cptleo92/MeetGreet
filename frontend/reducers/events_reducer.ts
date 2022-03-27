import { AnyAction } from "redux";
import { RECEIVE_EVENTS } from "../actions/events_actions";
import { EventEntity } from "../types/types";

const _nullState: EventEntity = {}

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_EVENTS:
      return payload;
    default:
      return state;
  }
}