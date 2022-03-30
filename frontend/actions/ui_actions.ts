export const RECEIVE_ORGANIZERS = "RECEIVE_ORGANIZERS"
export const RECEIVE_MEMBERS = "RECEIVE_MEMBERS"
export const RECEIVE_MEMBERSHIPS = "RECEIVE_MEMBERSHIPS"

import { AppDispatch } from "../store/store"
import { Group, Membership, UserName, UserNameEntity } from "../types/types"
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
