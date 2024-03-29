import { Event, Events, PreparedEventRequestData } from '../types/Event';
import { client } from '../utils/axiosClient';

const eventsUrl = 'agency/events/';

export const addEventRequest = (
  data: PreparedEventRequestData,
): Promise<Event> => {
  return client.post<Event, PreparedEventRequestData>(eventsUrl, data);
};

export const getEvents = (params: string): Promise<Events> => {
  return client.get<Events>(eventsUrl + params);
};

export const patchEvent = (
  data: Partial<Event>,
  eventId: number,
): Promise<Event> => {
  return client.patch<Event, Partial<Event>>(`${eventsUrl}${eventId}/`, data);
};
