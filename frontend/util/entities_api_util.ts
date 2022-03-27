import { Filter } from "../types/types"
// import { User } from "./session_api_util"

export const fetchGroups = () => (
  $.ajax({
    method: "GET",
    url: "api/groups"
  })
)

export const fetchEvents = () => (
  $.ajax({
    method: "GET",
    url: "api/events",
    // data: {filter: filter} -- need to implement a filter 
  })
)
