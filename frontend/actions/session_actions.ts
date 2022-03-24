// import { User } from "../types/interfaces"
import { AppDispatch } from "../store/store"
import * as SessionAPIUtil from "../util/session_api_util"
import { AnyAction } from "redux"

export const RECEIVE_USER = "RECEIVE_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS"
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"

interface UserLogin {
  email: string;
  password: string;
}

interface UserSignup {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const receiveUser = (user: UserLogin | UserSignup): AnyAction => ({
  type: RECEIVE_USER,
  payload: user
})

const logoutUser = (): AnyAction => ({
  type: LOGOUT_USER  
})

const receiveUserErrors = (errors: string[]): AnyAction => ({
  type: RECEIVE_USER_ERRORS,
  payload: errors
})

const receiveSessionErrors = (errors: string[]): AnyAction => ({
  type: RECEIVE_SESSION_ERRORS,
  payload: errors
})

export const signup = (user: UserSignup) => (dispatch: AppDispatch) => {
  return SessionAPIUtil.signup(user).then(
    user => dispatch(receiveUser(user)),
    err => dispatch(receiveUserErrors(err.responseJSON)))
}

export const login = (user: UserLogin) => (dispatch: AppDispatch) => {
  return SessionAPIUtil.login(user).then(
    user => dispatch(receiveUser(user)),
    err => dispatch(receiveSessionErrors(err.responseJSON)))
}

export const logout = () => (dispatch: AppDispatch) => {
  return SessionAPIUtil.logout().then(
    () => dispatch(logoutUser()),
    err => dispatch(receiveSessionErrors(err.responseJSON)))
}