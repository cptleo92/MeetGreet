import { AppDispatch } from "../store/store";
import { AttendancePost, Membership } from "../types/types";
import * as EntitiesAPIUtil from "../util/entities_api_util"
import { receiveUser } from "./session_actions";

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