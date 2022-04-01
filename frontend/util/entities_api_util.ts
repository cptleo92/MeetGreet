import { Event, Group, Membership, User } from "../types/types"

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

export const fetchUser = (id: number) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${id}`
  })
}