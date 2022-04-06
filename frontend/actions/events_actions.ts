export const RECEIVE_EVENTS = "RECEIVE_EVENTS"
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS"
export const START_LOADING_EVENTS = "START_LOADING_EVENTS"

import * as EntitiesAPIUtil from "../util/entities_api_util"
import { EventEntity, Event } from "../types/types"
import { AppDispatch } from "../store/store"
import { newEventType } from "../components/events/event_form"

export const loadAllUserInfo = () => ({
  type: START_LOADING_EVENTS
})
export const receiveEvents = (events: EventEntity) => ({
  type: RECEIVE_EVENTS,
  payload: events
})

const receiveEventErrors = (errors: string[]) => ({
  type: RECEIVE_EVENT_ERRORS,
  payload: errors
})

export const fetchEvents = (filter: number[] | string) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.fetchEvents(filter)
    .then(
      (events: EventEntity) => dispatch(receiveEvents(events)),
      // (errors: string[]) => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const createEvent = (event: newEventType, topics: string[]) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.createEvent(event, topics)
    .then(
      (event: Event) => dispatch(receiveEvents({[event.id]: event})),
      err => dispatch(receiveEventErrors(err.responseJSON))
    )
}

export const updateEvent = (event: Event, topics: string[]) => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.updateEvent(event, topics)
    .then(
      (event: Event) => dispatch(receiveEvents({[event.id]: event})),
      err => dispatch(receiveEventErrors(err.responseJSON))
    )
}