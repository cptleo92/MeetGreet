import Root from "../components/root";
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

export const getEventsFromGroup = (state: RootState, group: Group): Event[] => {
  const events: Event[] = [];
  group.events.forEach(eventId => {
    events.push(state.entities.events[eventId])
  })
  return events
}

export const getGroups = (state: RootState): Group[] => {
  return Object.values(state.entities.groups)
}

export const getUserGroups = (state: RootState): Group[] => {
  const currentUserId = getCurrentUserId(state);
  const userGroupsIds = state.entities.users[currentUserId].groups
  const userGroups: Group[] = [];
  userGroupsIds.forEach(groupId => userGroups.push(state.entities.groups[groupId]))
  return userGroups;
}

export const getUserEvents = (state: RootState): Event[] => {
  const currentUserId = getCurrentUserId(state);
  const userEventsIds = state.entities.users[currentUserId].events
  const userEvents: Event[] = [];
  userEventsIds.forEach(eventId => userEvents.push(state.entities.events[eventId]))
  return userEvents;
}


export const getUserTopics = (state: RootState, id: number): string[] => {
  return state.entities.users[id].topics
}

export const getGroupTopics = (state: RootState, id: number): string[] => {
  return state.entities.groups[id].topics
}

export const getEventTopics = (state: RootState, id: number): string[] => {
  return state.entities.events[id].topics
}

// export const getGroup = (state: RootState, id: string | undefined): Group => {
//   return state.entities.groups[parseInt(id)];
// }

export const getMemberships = (state: RootState) => {
  return state.ui.group.memberships;
}