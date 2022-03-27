import { AnyAction } from "redux";
import { RECEIVE_USER } from "../actions/session_actions";
import { User } from "../types/types";

interface UserEntity {
  [id: number]: User
}

const _nullState: UserEntity = {}

export default (state = _nullState, {type, payload}: AnyAction) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { [payload.id]: payload })
    default: 
      return state;
  }
}