import { isAxiosError } from 'axios';

export const handleErrorFromServer = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response?.status === 500) {
      throw new Error(
        JSON.stringify({ 'Статус 500': ['Внутрішня помилка на сервері'] }),
      );
    }

    throw new Error(JSON.stringify(error.response?.data));
  } else {
    throw new Error(JSON.stringify({ commonError: ['Something went wrong'] }));
  }
};
