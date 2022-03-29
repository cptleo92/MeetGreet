export const RECEIVE_EVENTS = "RECEIVE_EVENTS"
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS"
export const START_LOADING_EVENTS = "START_LOADING_EVENTS"

import * as EntitiesAPIUtil from "../util/entities_api_util"
import { EventEntity } from "../types/types"
import { AppDispatch } from "../store/store"

export const loadAllUserInfo = () => ({
  type: START_LOADING_EVENTS
})
const receiveEvents = (events: EventEntity) => ({
  type: RECEIVE_EVENTS,
  payload: events
})

// const receiveErrors = (errors: string[]) => ({
//   type: RECEIVE_EVENT_ERRORS,
//   payload: errors
// })

export const fetchEvents = (filter: number[]) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.fetchEvents(filter)
    .then(
      (events: EventEntity) => dispatch(receiveEvents(events)),
      // (errors: string[]) => dispatch(receiveErrors(errors.responseJSON))
    )
}