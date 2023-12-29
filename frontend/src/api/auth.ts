// import { AuthData } from '../types/AuthData';
import { LoginData } from '../types/LoginData';
import { RegisterData } from '../types/RegisterData';
import { User } from '../types/User';
import { client } from '../utils/axiosClient';

export const loginUser = (loginData: LoginData) => {
  return client.post<string, LoginData>('/user/login/', loginData);
};

export const registerUser = (registerData: RegisterData) => {
  return client.post<User, RegisterData>('/user/register/', registerData);
};
