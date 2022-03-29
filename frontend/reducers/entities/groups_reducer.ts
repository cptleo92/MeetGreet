import { AnyAction } from "redux";
import { RECEIVE_GROUPS } from "../../actions/groups_actions";
import { GroupEntity } from "../../types/types";
import { LOGOUT_USER } from "../../actions/session_actions";

const _nullState: GroupEntity = {}

export default (state = _nullState, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_GROUPS:
      return Object.assign({}, state, payload)
    case LOGOUT_USER:
      return _nullState;
    default:
      return state;
  }
}
