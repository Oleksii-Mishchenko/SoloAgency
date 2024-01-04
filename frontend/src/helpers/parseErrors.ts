import { ServerErrorResponse } from '../types/ServerErrorResponse';

export const parseErrors = (jsonError?: string): ServerErrorResponse => {
  const commonErrors: ServerErrorResponse = {
    error: ['Something went wrong.'],
  };

  console.log(jsonError);
  const errors: ServerErrorResponse = jsonError
    ? JSON.parse(jsonError)
    : commonErrors;

  return errors;
};
