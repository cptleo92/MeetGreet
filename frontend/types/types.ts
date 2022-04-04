export interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  location: string | null;
  groups: number[];
  events: number[];
  topics: string[];
  avatar: string;
}

export type Event = {
  id: number;
  group_id: number;
  group_title: string;
  host_id: number;
  host_name: string;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  attendees: number[];
  topics: string[];
  avatar: string;
  public: boolean;
}

export const _nullEvent: Event = {
  id: 0,
  group_id: 0,
  group_title: "",
  host_id: 0,
  host_name: "",
  title: "",
  description: "",
  location: "",
  start_time: "",
  end_time: "",
  capacity: 0,
  attendees: [],
  topics: [],
  avatar: "",
  public: true
}

export interface Group {
  id: number;
  title: string;
  description: string;
  location: string;
  public: boolean;
  members: number[];
  events: number[];
  topics: string[];
  organizers: number[];
  avatar: string;
}

export const _nullGroup: Group = {
  id: 0,
  title: "",
  description: "",
  location: "",
  public: true,
  members: [],
  events: [],
  topics: [],
  organizers: [],
  avatar: "",
}

export interface Topic {
  id?: number;
  name: string;
  topicable_id: number;
  topicable_type: string;
}

export interface TopicEntity {
  [id: number]: Topic;
}

export interface EventEntity {
  [id: number]: Event
}

export interface GroupEntity {
  [id: number]: Group
}

export interface Filter {
  [key: string]: number[];
}

export interface UserName {
  id: number;
  fname: string;
  lname: string;
  avatar: string;
}[]

export interface UserNameEntity {
  [id: number]: UserName;
}

export interface Membership {
  member_id: number;
  group_id: number;
  organizer: boolean;
  created_at?: string;
}

export interface Attendance {
  [id: string]: {
    event_id: number;
    created_at: string;
    id: number;
  }
}

// speciifcally the data of an AJAX POST request for creating attendances
export interface AttendancePost {
  attendee_id: number;
  event_id: number;
}