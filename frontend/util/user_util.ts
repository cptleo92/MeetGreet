import { Event } from "../types/types";
import { useLoggedIn, useUser } from "./hooks";

export const userNotMemberPrivateGroup = (event: Event) => {
  const user = useUser();
  const loggedIn = useLoggedIn();

  if (!event.public && loggedIn) {
    return !user.groups.includes(event.group_id)
  }
  return false;
}