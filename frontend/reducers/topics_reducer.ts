import { AnyAction } from "redux";
import { RECEIVE_TOPICS } from "../actions/topics_actions";
import { TopicEntity } from "../types/types";

const _nullState: TopicEntity = {}

export default (state = _nullState, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_TOPICS:
      return payload;
    default:
      return state;
  }
}
