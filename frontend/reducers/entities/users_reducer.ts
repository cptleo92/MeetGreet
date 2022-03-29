import { AnyAction } from "redux";
import { RECEIVE_USER } from "../../actions/session_actions";
import { User } from "../../types/types";
import { LOGOUT_USER } from "../../actions/session_actions"

interface UserEntity {
  [id: number]: User
}

const _nullState: UserEntity = {}

export default (state = _nullState, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { [payload.id]: payload })
    case LOGOUT_USER:
      return _nullState;
    default: 
      return state;
  }
}