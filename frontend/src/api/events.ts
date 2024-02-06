import { AxiosRequestConfig } from 'axios';
import { Event, PreparedEventRequestData } from '../types/Event';
import { client } from '../utils/axiosClient';

const eventsUrl = 'agency/events/';

export const addEventRequest = ({
  preparedData,
  token,
}: {
  preparedData: PreparedEventRequestData;
  token: string;
}): Promise<Event> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `token ${token}`,
    },
  };

  return client.post<Event, PreparedEventRequestData>(
    eventsUrl,
    preparedData,
    config,
  );
};
