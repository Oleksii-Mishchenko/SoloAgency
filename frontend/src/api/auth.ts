import { LoginData } from '../types/LoginData';
import { RegisterData } from '../types/RegisterData';
import { client } from '../utils/axiosClient';
import { AuthData } from '../types/AuthData';

export const loginUser = (loginData: LoginData): Promise<{ token: string }> => {
  return client.post<{ token: string }, LoginData>('/user/login/', loginData);
};

export const registerUser = (registerData: RegisterData): Promise<AuthData> => {
  return client.post<AuthData, RegisterData>('/user/register/', registerData);
};
