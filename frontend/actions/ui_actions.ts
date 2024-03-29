export const RECEIVE_ORGANIZERS = "RECEIVE_ORGANIZERS"
export const RECEIVE_MEMBERS = "RECEIVE_MEMBERS"
export const RECEIVE_MEMBERSHIPS = "RECEIVE_MEMBERSHIPS"
export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP"
export const RECEIVE_ATTENDEES = "RECEIVE_ATTENDEES"
export const RECEIVE_ATTENDANCES = "RECEIVE_ATTENDANCES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"

import { AppDispatch } from "../store/store"
import { Event, Group, Membership, UserName, UserNameEntity, Attendance, Post } from "../types/types"
import * as APIUtil from "../util/entities_api_util"


const receiveOrganizers = (organizers: UserName[]) => ({
  type: RECEIVE_ORGANIZERS,
  payload: organizers
})
const receiveMembers = (members: UserName[]) => ({
  type: RECEIVE_MEMBERS,
  payload: members
})

const receiveMemberships = (memberships: Membership[]) => ({
  type: RECEIVE_MEMBERSHIPS,
  payload: memberships
})

export const receiveMembership = (membership: Membership) => ({
  type: RECEIVE_MEMBERSHIPS,
  payload: membership
})

const receiveAttendees = (attendees: UserName[]) => ({
  type: RECEIVE_ATTENDEES,
  payload: attendees
})

const receiveAttendances = (attendances: Attendance[]) => ({
  type: RECEIVE_ATTENDANCES,
  payload: attendances
})

const receivePosts = (posts: Post[]) => ({
  type: RECEIVE_POSTS,
  payload: posts
})


export const fetchOrganizers = (group: Group) => (dispatch: AppDispatch) => {
  return APIUtil.fetchUsers(group.organizers)
    .then((organizers: UserNameEntity) => {            
      dispatch(receiveOrganizers(Object.values(organizers)))
    })
}

export const fetchMembers = (group: Group) => (dispatch: AppDispatch) => {
  return APIUtil.fetchUsers(group.members)
    .then((members: UserNameEntity) => {            
      dispatch(receiveMembers(Object.values(members)))
    })
}

export const fetchMemberships = (group: Group) => (dispatch: AppDispatch) => {
  return APIUtil.fetchMemberships(group)
    .then((memberships: Membership[]) => {
      dispatch(receiveMemberships(memberships))
    })
}

export const fetchAttendees = (event: Event) => (dispatch: AppDispatch) => {
  return APIUtil.fetchUsers(event.attendees)
    .then((attendees: UserName[]) => {
      dispatch(receiveAttendees(attendees))
    })
    
}

export const fetchAttendances = (event: Event) => (dispatch: AppDispatch) => {
  return APIUtil.fetchAttendances(event)
    .then((attendances: Attendance[]) => {
      dispatch(receiveAttendances(attendances))
    })
}

export const fetchPosts = (entityId: number, entityType: string) => (dispatch: AppDispatch) => {
  return APIUtil.fetchPosts(entityId, entityType)
    .then((posts: Post[]) => {
      dispatch(receivePosts(posts))
    })
}