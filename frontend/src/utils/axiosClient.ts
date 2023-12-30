import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleErrorFromServer } from '../helpers/handleErrorFromServer';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const client = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await instance.get<T>(url, config);

      return response.data;
    } catch (error) {
      return handleErrorFromServer(error);
    }
  },

  post: async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    try {
      const response = await instance.post<T>(url, data, config);

      return response.data;
    } catch (error) {
      return handleErrorFromServer(error);
    }
  },

  async patch<T, D>(url: string, data: D) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
