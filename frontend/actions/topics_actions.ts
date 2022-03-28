export const RECEIVE_TOPICS = "RECEIVE_TOPICS"
export const RECEIVE_TOPIC_ERRORS = "RECEIVE_TOPIC_ERRORS"
export const START_LOADING_TOPICS = "START_LOADING_TOPICS"

import * as EntitiesAPIUtil from "../util/entities_api_util"
import { TopicEntity } from "../types/types"
import { AppDispatch } from "../store/store"

const receiveTopics = (topics: TopicEntity) => ({
  type: RECEIVE_TOPICS,
  payload: topics
})




// keeping this around just in case

// export const fetchTopics = (filter: number[]) => (dispatch: AppDispatch) => {
//   // dispatch(loadTopics())
//   return EntitiesAPIUtil.fetchTopics(filter)
//     .then(
//       (topics: TopicEntity) => dispatch(receiveTopics(topics))
//       ,
//       // (errors: string[]) => dispatch(receiveErrors(errors.responseJSON))
//     )
// }