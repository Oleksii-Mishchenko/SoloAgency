import { Event, PreparedEventRequestData } from '../types/Event';
import { client } from '../utils/axiosClient';

const eventsUrl = 'agency/events/?page=3';

export const addEventRequest = (
  data: PreparedEventRequestData,
): Promise<Event> => {
  return client.post<Event, PreparedEventRequestData>(eventsUrl, data);
};

export const getEvents = (): Promise<Event[]> => {
  return client.get<Event[]>(eventsUrl);
};
