import { AxiosRequestConfig } from 'axios';
import { LoginData } from '../types/LoginData';
import { RegisterData } from '../types/RegisterData';
import { User } from '../types/User';
import { client } from '../utils/axiosClient';
import { AuthData } from '../types/AuthData';

export const loginUser = (loginData: LoginData): Promise<{ token: string }> => {
  return client.post<{ token: string }, LoginData>('/user/login/', loginData);
};

export const getUser = (token: string): Promise<User> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `token ${token}`,
    },
  };

  return client.get<User>('/user/me/', config);
};

export const registerUser = (registerData: RegisterData): Promise<AuthData> => {
  return client.post<AuthData, RegisterData>('/user/register/', registerData);
};
