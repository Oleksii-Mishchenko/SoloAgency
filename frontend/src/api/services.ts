import { Service } from '../types/Service';
import { client } from '../utils/axiosClient';

const servicesUrl = 'agency/services/';

export const loadServices = (): Promise<Service[]> => {
  return client.get<Service[]>(servicesUrl);
};
