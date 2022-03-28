export interface User {
  id: number;
  fname: string;
  email: string;
  birthdate: string | null;
  location: string | null;
  description: string | null;
  groups: number[];
  events: number[];
  topics: string[];
}

export interface Event {
  id: number;
  group_id: number;
  host_id: number;
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