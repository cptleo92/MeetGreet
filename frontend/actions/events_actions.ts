export const RECEIVE_EVENTS = "RECEIVE_EVENTS"
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS"
import * as EntitiesAPIUtil from "../util/entities_api_util"
import { EventEntity, Filter } from "../types/types"
import { AppDispatch } from "../store/store"

const receiveEvents = (events: EventEntity) => ({
  type: RECEIVE_EVENTS,
  payload: events
})

// const receiveErrors = (errors: string[]) => ({
//   type: RECEIVE_EVENT_ERRORS,
//   payload: errors
// })

export const fetchEvents = () => (dispatch: AppDispatch) => {
  return EntitiesAPIUtil.fetchEvents()
    .then(
      (events: EventEntity) => dispatch(receiveEvents(events)),
      // (errors: string[]) => dispatch(receiveErrors(errors))
    )
}