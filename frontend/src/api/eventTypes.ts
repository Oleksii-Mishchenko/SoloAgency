import { EventType, EventTypes } from '../types/EventType';
import { client } from '../utils/axiosClient';

const eventTypesUrl = 'agency/event-types/';

export const loadEventTypes = (params: string): Promise<EventTypes> => {
  return client.get<EventTypes>(eventTypesUrl + params);
};

export const addEventType = (data: FormData): Promise<EventType> => {
  return client.post<EventType, FormData>(eventTypesUrl, data);
};
