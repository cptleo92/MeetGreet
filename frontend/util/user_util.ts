import { Event } from "../types/types";
import { useLoggedIn, useUser } from "./hooks";

export const userNotMemberPrivateGroup = (event: Event) => {
  const loggedIn = useLoggedIn();
  if (!loggedIn) {
    return true;
  }

  const user = useUser();

  if (!event.public) {
    return !user.groups.includes(event.group_id)
  }
  return false;
}