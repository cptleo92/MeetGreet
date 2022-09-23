import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
import loadingReducer from "./loading_reducer";
import uiGroupReducer from "./ui_group_reducer";
import uiEventReducer from "./ui_event_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  loading: loadingReducer,
  group: uiGroupReducer,
  event: uiEventReducer
})

export default uiReducer