import { EventTypesPage } from '../types/EventType';
import { client } from '../utils/axiosClient';

const eventTypesUrl = 'agency/event-types';

export const loadEventTypes = (): Promise<EventTypesPage> => {
  return client.get<EventTypesPage>(eventTypesUrl);
};
