import { Event, PreparedEventRequestData } from '../types/Event';
import { client } from '../utils/axiosClient';

const eventsUrl = 'agency/events/';

export const addEventRequest = (
  data: PreparedEventRequestData,
): Promise<Event> => {
  return client.post<Event, PreparedEventRequestData>(eventsUrl, data);
};
