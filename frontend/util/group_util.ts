import { Group } from "../types/types";

export const generateGroupPath = (group: Group) => {
  return `/groups/${group.id}`
}