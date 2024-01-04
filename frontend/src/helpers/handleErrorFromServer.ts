import { isAxiosError } from 'axios';

export const handleErrorFromServer = (error: unknown) => {
  if (isAxiosError(error)) {
    throw new Error(JSON.stringify(error.response?.data));
  } else {
    throw new Error(JSON.stringify({ commonError: ['Something went wrong'] }));
  }
};
