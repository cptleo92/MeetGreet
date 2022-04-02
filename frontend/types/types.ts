export interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  birthdate: string | null;
  location: string | null;
  description: string | null;
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
  city: string | null;
  state: string | null;
  country: string | null;
  start_time: string;
  end_time: string;
  public: boolean;
  capacity: number | null;
  attendees: number[];
  topics: string[];
  avatar: string;
}

export interface Group {
  id: number;
  title: string;
  description: string;
  location: string;
  city: string | null;
  state: string | null;
  country: string | null;
  public: boolean;
  members: number[];
  events: number[];
  topics: string[];
  organizers: number[];
  avatar: string;
}

export interface Topic {
  id: number;
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