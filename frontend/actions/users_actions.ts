import { newUserType } from "../components/home/user_profile_edit";
import { AppDispatch } from "../store/store";
import { AttendancePost, Membership, MembershipUpdate } from "../types/types";
import * as EntitiesAPIUtil from "../util/entities_api_util"
import { receiveUser,receiveUserErrors } from "./session_actions";

export const deleteMembership = (membershipId: number) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.deleteMembership(membershipId)
    .then((membership) => {
      const memberId = membership.member_id
      EntitiesAPIUtil.fetchUser(memberId)
        .then((user) => dispatch(receiveUser(user)))        
    })
}

export const createMembership = (data: Membership) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.createMembership(data)
    .then((membership) => {
      const memberId = membership.member_id
      EntitiesAPIUtil.fetchUser(memberId)
        .then((user) => dispatch(receiveUser(user)))  
    })
}

// export const updateMembership = (data: MembershipUpdate) => (dispatch: AppDispatch) => {
//   return EntitiesAPIUtil.updateMembership(data)
//     .then((membership) => {
//       dispatch(receiveMembership(membership))
//     })
// } 

export const deleteAttendance = (attendanceId: number) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.deleteAttendance(attendanceId)
    .then((attendance) => {
      const attendeeId = attendance.attendee_id
      EntitiesAPIUtil.fetchUser(attendeeId)
        .then((user) => dispatch(receiveUser(user)))        
    })
}

export const createAttendance = (data: AttendancePost) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.createAttendance(data)
    .then((attendance) => {
      const attendeeId = attendance.attendee_id
      EntitiesAPIUtil.fetchUser(attendeeId)
        .then((user) => dispatch(receiveUser(user)))        
    })
}

export const updateUser = (userData: newUserType) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.updateUser(userData)
    .then(user => dispatch(receiveUser(user)),
      err => dispatch(receiveUserErrors(err.responseJSON)))
}