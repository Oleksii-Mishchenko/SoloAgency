import { EventTypes } from '../types/EventType';
import { client } from '../utils/axiosClient';

const eventTypesUrl = 'agency/event-types/';

export const loadEventTypes = (params: string): Promise<EventTypes> => {
  const url = eventTypesUrl + params;

  return client.get<EventTypes>(url);
};
