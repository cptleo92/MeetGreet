import { AnyAction } from "redux";
import { RECEIVE_GROUP, RECEIVE_GROUPS, RECEIVE_GROUP_ERRORS } from "../../actions/groups_actions";

const _nullErrors: string[] = []

export default (state = _nullErrors, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_GROUP_ERRORS:
      return payload;
    case RECEIVE_GROUP:
    case RECEIVE_GROUPS:
      return _nullErrors;
    default: 
      return state;
  }
}