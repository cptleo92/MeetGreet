import { Filter } from "../types/types"
// import { User } from "./session_api_util"

export const fetchGroups = (filter: number[] = [0]) => {
  return $.ajax({
    method: "GET",
    url: "api/groups",
    data: {filter: filter}
  })
}

export const fetchEvents = (filter: number[] = [0]) => (
  $.ajax({
    method: "GET",
    url: "api/events",
    data: {filter: filter}
  })
)


