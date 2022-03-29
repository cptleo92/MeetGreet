export const RECEIVE_GROUPS = "RECEIVE_GROUPS"
export const RECEIVE_GROUP_ERRORS = "RECEIVE_GROUP_ERRORS"
export const START_LOADING_GROUPS = "START_LOADING_GROUPS"

import * as EntitiesAPIUtil from "../util/entities_api_util"
import { GroupEntity } from "../types/types"
import { AppDispatch } from "../store/store"

export const receiveGroups = (groups: GroupEntity) => ({
  type: RECEIVE_GROUPS,
  payload: groups
})

export const fetchGroups = (filter: number[]) => (dispatch: AppDispatch) => {
  // dispatch(loadGroups())
  return EntitiesAPIUtil.fetchGroups(filter)
    .then(
      (groups: GroupEntity) => dispatch(receiveGroups(groups))
      ,
      // (errors: string[]) => dispatch(receiveErrors(errors.responseJSON))
    )
}