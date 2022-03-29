import { User } from "../types/types";
import { fetchEvents } from "./events_actions";
import { fetchGroups } from "./groups_actions";

export const fetchUserFeedItems = (currentUser: User) => (dispatch: any) => {
  return dispatch(fetchEvents(currentUser.events))
    .then( () => (
      dispatch(fetchGroups(currentUser.groups))
    )
  )
}