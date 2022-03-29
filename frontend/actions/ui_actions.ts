export const RECEIVE_ORGANIZERS = "RECEIVE_ORGANIZERS"
export const RECEIVE_MEMBERS = "RECEIVE_MEMBERS"
import { AppDispatch } from "../store/store"
import { Group, UserName, UserNameEntity } from "../types/types"
import { fetchUsers } from "../util/entities_api_util"

const receiveOrganizers = (organizers: UserName[]) => ({
  type: RECEIVE_ORGANIZERS,
  payload: organizers
})
const receiveMembers = (members: UserName[]) => ({
  type: RECEIVE_MEMBERS,
  payload: members
})


export const fetchOrganizers = (group: Group) => (dispatch: AppDispatch) => {
  return fetchUsers(group.organizers)
    .then((organizers: UserNameEntity) => {            
      dispatch(receiveOrganizers(Object.values(organizers)))
    })
}

export const fetchMembers = (group: Group) => (dispatch: AppDispatch) => {
  return fetchUsers(group.members)
    .then((members: UserNameEntity) => {            
      dispatch(receiveMembers(Object.values(members)))
    })
}
