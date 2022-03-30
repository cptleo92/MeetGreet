// import { Event, EventEntity, User } from "../types/types";
// import { fetchEvents } from "./events_actions";
// import { fetchGroups } from "./groups_actions";

// const fetchGroupsOfEvents = (events: EventEntity) => (dispatch: any) => {
//   const eventGroups: number[] = [];
//   const eventArray = Object.values(events)
//   for (let i = 0; i < eventArray.length; i++) {
//     eventGroups.push(eventArray[i].group_id)
//   }
//   console.log('fetching event groups')
//   return dispatch(fetchGroups(eventGroups))
// }

// export const fetchUserFeedItems = (currentUser: User) => (dispatch: any) => {
//   return dispatch(fetchEvents(currentUser.events))
//     .then(({ payload }: { payload: EventEntity }) =>
//       dispatch(fetchGroupsOfEvents(payload)))
//       .then(() => {
//         console.log('fetching user groups')
//         dispatch(fetchGroups(currentUser.groups))
//       })
// }

// ended up doing all the user item fetching on the home.tsx component