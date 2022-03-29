import { combineReducers } from "redux";
import uiGroupMembersReducer from "./ui_group_members_reducer";
import uiGroupOrganizersReducer from "./ui_group_organizers_reducer";

const uiGroupReducer = combineReducers({
  organizers: uiGroupOrganizersReducer,
  members: uiGroupMembersReducer
})

export default uiGroupReducer