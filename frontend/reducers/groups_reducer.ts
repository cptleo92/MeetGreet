import { AnyAction } from "redux";
import { RECEIVE_GROUPS } from "../actions/groups_actions";
import { GroupEntity } from "../types/types";

const _nullState: GroupEntity = {}

export default (state = _nullState, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_GROUPS:
      return payload;
    default:
      return state;
  }
}
