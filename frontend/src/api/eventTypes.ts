import { EventType } from '../types/EventType';
import { client } from '../utils/axiosClient';

const eventTypesUrl = 'agency/event-types';

export const loadEventTypes = (): Promise<EventType[]> => {
  return client.get<EventType[]>(eventTypesUrl);
};
