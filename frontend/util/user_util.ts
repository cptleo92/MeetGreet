import { Event } from "../types/types";
import { useUser } from "./hooks";

export const userNotMemberPrivateGroup = (event: Event) => {
  const user = useUser();

  if (!event.public) {
    return !user.groups.includes(event.group_id)
  }
  return false;
}