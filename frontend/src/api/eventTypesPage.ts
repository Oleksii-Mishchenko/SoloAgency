import { EventTypesPage } from '../types/EventType';
import { client } from '../utils/axiosClient';

const eventTypesUrl = 'agency/event-types/';

export const loadEventTypesPage = (params: string): Promise<EventTypesPage> => {
  const url = eventTypesUrl + params;

  return client.get<EventTypesPage>(url);
};
