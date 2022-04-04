export const RECEIVE_GROUPS = "RECEIVE_GROUPS"
export const RECEIVE_GROUP_ERRORS = "RECEIVE_GROUP_ERRORS"
export const RECEIVE_GROUP = "RECEIVE_GROUP"
export const START_LOADING_GROUPS = "START_LOADING_GROUPS"

import { AnyAction } from "redux"
import * as EntitiesAPIUtil from "../util/entities_api_util"
import { Group, GroupEntity } from "../types/types"
import { AppDispatch } from "../store/store"
import { newGroupType } from "../components/groups/group_create"

export const receiveGroups = (groups: GroupEntity) => ({
  type: RECEIVE_GROUPS,
  payload: groups
})

// const receiveGroup = (group: Group) => ({
//   type: RECEIVE_GROUP,
//   payload: group
// })

const receiveGroupErrors = (errors: string[]): AnyAction => ({
  type: RECEIVE_GROUP_ERRORS,
  payload: errors
})

export const fetchGroups = (filter: number[]) => (dispatch: AppDispatch) => {

  return EntitiesAPIUtil.fetchGroups(filter)
    .then(
      (groups: GroupEntity) => dispatch(receiveGroups(groups))
    )
}

export const createGroup = (group: newGroupType) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.createGroup(group)
    .then(
      (group: Group) => dispatch(receiveGroups({[group.id]: group})),
      err => dispatch(receiveGroupErrors(err.responseJSON))
    )
}