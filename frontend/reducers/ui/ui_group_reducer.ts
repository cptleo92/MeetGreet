import { combineReducers } from "redux";
import uiGroupMembershipsReducer from "./ui_group_memberships_reducer";
import uiGroupMembersReducer from "./ui_group_members_reducer";
import uiGroupOrganizersReducer from "./ui_group_organizers_reducer";
import uiPostsReducer from "./ui_post_reducer";

const uiGroupReducer = combineReducers({
  organizers: uiGroupOrganizersReducer,
  members: uiGroupMembersReducer,
  memberships: uiGroupMembershipsReducer,
  posts: uiPostsReducer
})

export default uiGroupReducer