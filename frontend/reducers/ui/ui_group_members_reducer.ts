import { AnyAction } from "redux";
import { RECEIVE_MEMBERS } from "../../actions/ui_actions";
import { UserName } from "../../types/types";

const _nullState: UserName[] = []

export default (state = _nullState, {type, payload}: AnyAction ) => {
  Object.freeze(state)
  switch(type) {
    case RECEIVE_MEMBERS:
      return payload
    default:
      return state;
  }
}