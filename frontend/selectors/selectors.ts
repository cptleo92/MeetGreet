import { RootState } from "../store/store";
import { Event, Group } from "../types/types";

export const getCurrentUser = (state: RootState) => {
  const currentUserId: number = state.session.currentUserId
  return state.entities.users[currentUserId]
}

export const getCurrentUserId = (state: RootState) => {
  return state.session.currentUserId;
}

export const getEvents = (state: RootState): Event[] => {
  return Object.values(state.entities.events)
}

export const getGroups = (state: RootState): Group[] => {
  return Object.values(state.entities.groups)
}

export const getUserTopics = (state: RootState, id: number): string[] => {
  return state.entities.users[id].topics
}

export const getGroup = (state: RootState, id: string | undefined) => {
  return state.entities.groups[parseInt(id)];
}