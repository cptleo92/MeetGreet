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
  return sortByDate(getUpcomingEvents(eventArray))[0]
}

export const stringifyRSVPtime = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", {hour: "numeric", minute: "numeric"}) + ' , ' + date.toLocaleString("en-US", {month: 'long', day: 'numeric'})
}

export const stringifyTime = (time: string ): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", {hour: "numeric", minute: "numeric"});
}

export const stringifyTimeTZ = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", {hour: "numeric", minute: "numeric", timeZoneName: "short"});
}

export const stringifyDate = (time: string | number) : string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { weekday: 'long',month: 'long', day: 'numeric' });
}

export const stringifyDateMedium = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' });
}

export const stringifyDateLong = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { weekday: 'long',month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", timeZoneName: "short" });
}

export const stringifyDateLongAbrv = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { weekday: 'short',month: 'short', day: 'numeric', hour: "numeric", minute: "numeric", timeZoneName: "short" });
}

export const stringifyDateLongNoTZ = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { weekday: 'long',month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"});
}

export const stringifyEventTimes = (startTime: string, endTime: string) => {
  const startString = stringifyTime(startTime)
  let endString = stringifyTimeTZ(endTime)

  const startDay = stringifyDate(startTime)
  const endDay = stringifyDate(endTime)

  if (startDay !== endDay) {
    endString = stringifyTimeTZ(endTime) + ` (${stringifyDate(endTime)})`
  }

  return `${startString} to ${endString}`
}


export const getUpcomingEvents = (eventArray: Event[]): Event[] => {
  return eventArray.filter((event: Event) => {
    const currentTime: any = new Date(Date.now());
    const eventStart: any= new Date(event.start_time);
    return eventStart - currentTime > 0;
  })
}

export const getPastEvents = (eventArray: Event[]): Event[] => {
  return eventArray.filter((event: Event) => {
    const currentTime: any = new Date(Date.now());
    const eventStart: any= new Date(event.start_time);
    return eventStart - currentTime <= 0;
  })
}

