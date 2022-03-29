import { combineReducers } from "redux";
import modalReducer from "./modal_reducer";
import loadingReducer from "./loading_reducer";
import uiGroupReducer from "./ui_group_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  loading: loadingReducer,
  group: uiGroupReducer
})

export default uiReducer