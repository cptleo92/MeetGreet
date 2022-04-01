import { AppDispatch } from "../store/store";
import { Membership } from "../types/types";
import * as EntitiesAPIUtil from "../util/entities_api_util"
import { receiveUser } from "./session_actions";

export const deleteMembership = (membershipId: number) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.deleteMembership(membershipId)
    .then((membership) => {
      const memberId = membership.member_id
      console.log(memberId)
      EntitiesAPIUtil.fetchUser(memberId)
        .then((user) => dispatch(receiveUser(user)))        
    })
}

export const createMembership = (data: Membership) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.createMembership(data)
    .then((membership) => {
      const memberId = membership.member_id
      console.log(memberId)
      EntitiesAPIUtil.fetchUser(memberId)
        .then((user) => dispatch(receiveUser(user)))  
    })
}