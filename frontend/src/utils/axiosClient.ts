import axios, { AxiosResponse, isAxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  // baseURL: 'https://mate.academy/students-api',
});

export const client = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await instance.get<T>(url);

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.code === 'ERR_NETWORK'
            ? 'No internet connection'
            : error.message;

        throw new Error(message);
      } else {
        throw new Error('Something went wrong');
      }
    }
  },

  post: async <T, D>(url: string, data: D): Promise<T> => {
    const response = await instance.post<T>(url, data);

    return response.data;
  },
  // async post<T, D>(url: string, data: D) {
  //   const response = await instance.post<T>(url, data);

  //   return response.data;
  // },

  async patch<T, D>(url: string, data: D) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
