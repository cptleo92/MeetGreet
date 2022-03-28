import { Event } from "../types/types";

// given an array of Events, sort from starting soonest to starting latest
export const sortByDate = (eventArray: Event[]): Event[] => {
  return eventArray.sort((a: Event, b: Event) => {
    const start1: any = new Date(a.start_time)
    const start2: any = new Date(b.start_time)
    return start1 - start2
  })
}

export const getSoonestEvent = (eventArray: Event[]): Event => {
  const sorted = sortByDate(eventArray);
  return sorted[0];
}



export const stringifyDate = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { weekday: 'long',month: 'long', day: 'numeric' });
}