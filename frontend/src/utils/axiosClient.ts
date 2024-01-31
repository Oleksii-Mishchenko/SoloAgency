import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleErrorFromServer } from '../helpers/handleErrorFromServer';

const instance = axios.create({
  baseURL: 'http://0.0.0.0:8080/api',
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
      const response: AxiosResponse<T> = await instance.post<T>(
        url,
        data,
        config,
      );

      return response.data;
    } catch (error) {
      return handleErrorFromServer(error);
    }
  },

  patch: async <T, D>(url: string, data: D): Promise<T> => {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  delete: async (url: string) => {
    try {
      return await instance.delete(url);
    } catch (error) {
      return handleErrorFromServer(error);
    }
  },
};
