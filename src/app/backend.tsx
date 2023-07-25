export interface ICalendar {
  id: number;
  name: string;
  color: string;
}
export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}
export function getCalendarsEndpoint(): Promise<ICalendar[]> {
  return fetch("http://localhost:8080/calendars").then((resp) => {
    return resp.json();
  });
}
export function getEventsEndpoint(from: string): Promise<IEvent[]> {
  return fetch(`http://localhost:8080/events?date_gte=${from}&`).then(
    (resp) => {
      return resp.json();
    }
  );
}