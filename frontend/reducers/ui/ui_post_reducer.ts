import { AnyAction } from "redux";
import { LOGOUT_USER } from "../../actions/session_actions";
import { RECEIVE_POSTS } from "../../actions/ui_actions";
import { Post } from "../../types/types";

const _nullState: Post[] = []

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_POSTS:
      return payload
    case LOGOUT_USER:
      return _nullState
    default:
      return state;
  }
}