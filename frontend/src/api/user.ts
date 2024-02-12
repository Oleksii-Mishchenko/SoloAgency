import { AxiosRequestConfig } from 'axios';
import { client } from '../utils/axiosClient';
import { User } from '../types/User';

export const getUser = (token: string): Promise<User> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `token ${token}`,
    },
  };

  return client.get<User>('/user/me/', config);
};
