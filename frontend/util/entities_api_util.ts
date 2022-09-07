import { newGroupType } from "../components/groups/group_form"
import { newEventType } from "../components/events/event_form"
import { AttendancePost, Event, Group, Membership, Topic, MembershipUpdate, SearchParams, User, Post } from "../types/types"
import { newUserType } from "../components/home/user_profile_edit"
import ax from "./axiosCSRF"
const qs = require('qs');

export const fetchGroups = (filter: number[] = [0]) => (
  ax({
    method: "GET",
    url: "api/groups",
    params: {filter: filter} // data key does not work, only "params" can be used by rails controller
  }).then(res => res.data) // returning this way because code used to be jQuery which returned data directly
)

export const fetchEvents = (filter: number[] | string = [0]) => (
  ax({
    method: "GET",
    url: "api/events",
    params: {filter: filter}
  }).then(res => res.data)
)

export const fetchTopics = (filter: number[] = [0]) => (
  ax({
    method: "GET",
    url: "api/topics",
    params: {filter: filter}
  }).then(res => res.data)
)

export const fetchUsers = (filter: number[] = [0]) => (
  ax({
    method: "GET",
    url: "api/users",
    params: {filter: filter}
  }).then(res => res.data)
)

export const fetchPosts = (entity: Group | Event) => (
  ax({
    method: "GET",
    url: "api/posts",
    params: {
      postable_type: "Event",
      postable_id: entity.id
    }
  }).then(res => res.data)
)

export const fetchMemberships = (group: Group) => (
  ax({
    method: "GET",
    url: "api/memberships",
    params: {id: group.id}
  }).then(res => res.data)
)

export const fetchAttendances = (event: Event) => (
  ax({
    method: "GET",
    url: "api/attendances",
    params: {id: event.id}
  }).then(res => res.data)
)

export const deleteMembership = (id: number) => (
  ax({
    method: "DELETE",
    url: `api/memberships/${id}`
  }).then(res => res.data)
)

export const createMembership = (data: Membership) => (
  ax({
    method: "POST",
    url: "api/memberships/",
    data: {membership: data}
  }).then(res => res.data)
)

export const updateMembership = (data: MembershipUpdate) => (
  ax({
    method: "PATCH",
    url: `api/memberships/${data.id}`,
    data: {membership: data}
  }).then(res => res.data)
)

export const fetchUser = (id: number) => (
  ax({
    method: "GET",
    url: `api/users/${id}`
  }).then(res => res.data)
)

export const deleteAttendance = (id: number) => (
  ax({
    method: "DELETE",
    url: `api/attendances/${id}`
  }).then(res => res.data)
)

export const createAttendance = (data: AttendancePost) => (
  ax({
    method: "POST",
    url: "api/attendances/",
    data: {attendance: data}
  }).then(res => res.data)
)

export const createGroup = (group: newGroupType, topics: string[]) => (
  ax({
    method: "POST",
    url: "api/groups",
    data: {group: group, topics: topics}
  }).then(res => res.data)
)

export const updateGroup = (group: Group, topics: string[]) => (
  ax({
    method: "PATCH",
    url: `api/groups/${group.id}`,
    data: {group: group, topics: topics}
  }).then(res => res.data)
)

export const createEvent = (event: newEventType, topics: string[]) => (
  ax({
    method: "POST",
    url: "api/events",
    data: {event: event, topics: topics}
  }).then(res => res.data)
)

export const updateEvent = (event: Event, topics: string[]) => (
  ax({
    method: "PATCH",
    url: `api/events/${event.id}`,
    data: {event: event, topics: topics}
  }).then(res => res.data)
)

export const updateUser = (user: newUserType) => (
  ax({
    method: "PATCH",
    url: `api/users/${user.id}`,
    data: {user}
  }).then(res => res.data)
)

export const updateUserTopics = (user: User, topics: string[] = []) => (
  ax({
    method: "PATCH",
    url: `api/users/${user.id}`,
    data: {topics: topics}
  }).then(res => res.data)
)


export const createTopic = (topic: Topic) => (
  ax({
    method: "POST",
    url: "api/topics",
    data: {topic}
  }).then(res => res.data)
)

export const createPost = (post: Post) => (
  ax({
    method: "POST",
    url: "api/posts",
    data: {post}
  }).then(res => res.data)
)

export const search = (entity: string, search: SearchParams) => (
  ax({
    method: "GET",
    url: `api/${entity}`,
    params: {search},
    paramsSerializer: params => {
      return qs.stringify(params)
    }
  }).then(res => res.data)
)