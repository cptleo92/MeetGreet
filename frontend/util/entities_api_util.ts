import { newGroupType } from "../components/groups/group_form"
import { newEventType } from "../components/events/event_form"
import { AttendancePost, Event, Group, Membership, Topic, MembershipUpdate, SearchParams } from "../types/types"

export const fetchGroups = (filter: number[] = [0]) => {
  return $.ajax({
    method: "GET",
    url: "api/groups",
    data: {filter: filter}
  })
}

export const fetchEvents = (filter: number[] | string = [0]) => (
  $.ajax({
    method: "GET",
    url: "api/events",
    data: {filter: filter}
  })
)

export const fetchTopics = (filter: number[] = [0]) => (
  $.ajax({
    method: "GET",
    url: "api/topics",
    data: {filter: filter}
  })
)

export const fetchUsers = (filter: number[] = [0]) => (
  $.ajax({
    method: "GET",
    url: "api/users",
    data: {filter: filter}
  })
)

export const fetchMemberships = (group: Group) => {
  return $.ajax({
    method: "GET",
    url: "api/memberships",
    data: {id: group.id}
  })
}

export const fetchAttendances = (event: Event) => {
  return $.ajax({
    method: "GET",
    url: "api/attendances",
    data: {id: event.id}
  })
}

export const deleteMembership = (id: number) => {
  return $.ajax({
    method: "DELETE",
    url: `api/memberships/${id}`
  })
}

export const createMembership = (data: Membership) => {
  return $.ajax({
    method: "POST",
    url: "api/memberships/",
    data: {membership: data}
  })
}

export const updateMembership = (data: MembershipUpdate) => {
  return $.ajax({
    method: "PATCH",
    url: `api/memberships/${data.id}`,
    data: {membership: data}
  })
}

export const fetchUser = (id: number) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${id}`
  })
}

export const deleteAttendance = (id: number) => {
  return $.ajax({
    method: "DELETE",
    url: `api/attendances/${id}`
  })
}

export const createAttendance = (data: AttendancePost) => {
  return $.ajax({
    method: "POST",
    url: "api/attendances/",
    data: {attendance: data}
  })
}

export const createGroup = (group: newGroupType, topics: string[]) => {
  return $.ajax({
    method: "POST",
    url: "api/groups",
    data: {group: group, topics: topics}
  })
}

export const updateGroup = (group: Group, topics: string[]) => {
  return $.ajax({
    method: "PATCH",
    url: `api/groups/${group.id}`,
    data: {group: group, topics: topics}
  })
}

export const createEvent = (event: newEventType, topics: string[]) => {
  return $.ajax({
    method: "POST",
    url: "api/events",
    data: {event: event, topics: topics}
  })
}

export const updateEvent = (event: Event, topics: string[]) => {
  return $.ajax({
    method: "PATCH",
    url: `api/events/${event.id}`,
    data: {event: event, topics: topics}
  })
}


export const createTopic = (topic: Topic) => {
  return $.ajax({
    method: "POST",
    url: "api/topics",
    data: {topic}
  })
}

export const search = (entity: string, search: SearchParams) => {
  return $.ajax({
    method: "GET",
    url: `api/${entity}`,
    data: {search}
  })
}